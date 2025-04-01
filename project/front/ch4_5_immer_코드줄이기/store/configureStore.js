import { createWrapper } from 'next-redux-wrapper';
import reducer from '../reducers/index.js';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'; //##
import rootSaga from '../sagas/index.js'; //##

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
   console.log('Dispatching:', action); // 액션 로그 출력
   return next(action); // 다음 미들웨어 또는 리듀서로 액션 전달
};

const configurestore = () => {
   const sagaMiddleware = createSagaMiddleware();  //##
   const middlewares = [sagaMiddleware, loggerMiddleware]; //##
   const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware([...middlewares]))
      : composeWithDevTools(applyMiddleware(...middlewares))
   const store = createStore(reducer, enhancer);
   store.sagaTask = sagaMiddleware.run(rootSaga); //##
   return store;
};

const wrapper = createWrapper(configurestore, {
   debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
