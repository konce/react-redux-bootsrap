import { createStore, combineReducers, applyMiddleware } from 'redux';
import { loggerMiddleware, promiseMiddleware, thunkMiddleware} from './middleware';
import * as reducers from './reducers';

const middleware = [thunkMiddleware, promiseMiddleware, loggerMiddleware];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const reducer = combineReducers(reducers);

export default createStoreWithMiddleware(reducer);
