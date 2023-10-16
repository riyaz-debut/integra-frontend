import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./../reducers";
import rootSaga from "./../sagas/root-sagas";
//import { configureStore } from '@reduxjs/toolkit'

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
// const Store = createStore(rootReducer, applyMiddleware(...middleware))

sagaMiddleware.run(rootSaga);

export default Store;
