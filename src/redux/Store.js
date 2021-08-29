import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import UtilReducer from './ducks/reducers/UtilReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  util: UtilReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(sagaMiddleware));
};

export {sagaMiddleware};
export default configureStore;
