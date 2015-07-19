import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from '../reducers';

function isFunction(obj) {
  return typeof obj === 'function';
}
function isPromise(obj) {
  return obj && obj.payload && isFunction(obj.payload.then);
}

function promiseMiddleware(api, { getState }) {
  return next => function _r(action) {
    if (isPromise(action)) {
      const { payload, type, ...rest } = action;

      next({ ...rest, type: type.begin });
      return payload.then(
        result => next({ ...rest, type: type.end, payload: result }),
        error  => next({ ...rest, type: type.end, payload: error, error: true })
      );
    }
    if (isFunction(action)) {
      return _r(action(api, getState));
    }

    return next(action);
  };
}

export default function (api, initialState) {
  const createStoreWithMiddleware = applyMiddleware(promiseMiddleware.bind(null, api))(createStore);
  const reducer = combineReducers(reducers);

  return createStoreWithMiddleware(reducer, initialState);
}
