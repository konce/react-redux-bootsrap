const timeTracker = {};

export default function loggerMiddleware() {
  return next => action => {
    const { meta = {}, type } = action;

    if (!meta.silent) {
      let descrip = type;

      if (meta.promiseIdent) {
        const [_, TYPE, STATE] = type.match(/(.*?)_(PENDING|FULFILLED|REJECTED)$/);
        const hasProperty = Object.prototype.hasOwnProperty.call(timeTracker, meta.promiseIdent);

        descrip += ` (${meta.promiseIdent})`;

        if (STATE === 'PENDING' && !hasProperty) {
          timeTracker[meta.promiseIdent] = +(new Date);
        } else if (STATE && hasProperty) {
          const timeTaken = (+(new Date) - timeTracker[meta.promiseIdent]) / 1000;
          descrip += ` (took ${timeTaken} seconds)`;
          delete timeTracker[meta.promiseIdent];
        }
      }

      console.groupCollapsed(descrip);
      console.dir(action);
      console.groupEnd(descrip);
    }

    next(action);
  };
}
