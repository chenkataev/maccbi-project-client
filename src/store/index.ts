import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers';
import saga from './middleware/sagas';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    sagaMiddleware
  )),
)

sagaMiddleware.run(saga)
export default store;