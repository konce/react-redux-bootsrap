const isFunction = (obj) => typeof obj === 'function';

export default function thunkMiddleware({ getState }) {
  return next => function step(action) {
    if (isFunction(action)) {
      return next(action(getState));
    }

    return next(action);
  };
}
