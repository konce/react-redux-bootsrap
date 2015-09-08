import identFactory from '../lib/identFactory';

const isFunction = (obj) => typeof obj === 'function';
const isPromise = (obj) => obj && isFunction(obj.then);

export default function promiseMiddleware() {
  const identCreator = identFactory('async');

  return next => function step(action) {
    if (isPromise(action.payload)) {
      const { payload, type, meta = {}, ...rest } = action;
      const [ PENDING, FULFILLED, REJECTED ] = type;

      meta.promiseIdent = identCreator.next();

      next({ ...rest, meta, type: PENDING });
      return payload
        .then(
          result => step({ ...rest, meta, type: FULFILLED, payload: result }),
          error  => step({ ...rest, meta, type: REJECTED,  payload: error, error: true })
        )
        .catch(
          error => step({ ...rest, meta, type: REJECTED, payload: error, error: true })
        );
    }

    return next(action);
  };
}
