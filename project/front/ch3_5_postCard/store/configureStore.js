import { createWrapper } from 'next-redux-wrapper';
import  reducer  from '../reducers/index.js';
import { applyMiddleware, createStore , compose }    from 'redux'; //##
import { composeWithDevTools }    from 'redux-devtools-extension'; //##


const configurestore= () => {
   const middlewares = []; //##
   const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware([...middlewares]))
      : composeWithDevTools(applyMiddleware(...middlewares)) //##
   const store = createStore(reducer , enhancer); //##
   return store;
};

const wrapper = createWrapper(configurestore , {
   debug:process.env.NODE_ENV === 'development',
});

export default  wrapper;