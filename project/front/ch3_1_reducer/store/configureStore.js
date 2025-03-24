import { createWrapper } from 'next-redux-wrapper';
import { createStore}    from 'redux';
import  reducer  from '../reducers/index.js';

const configurestore = () => {
   const store = createStore(reducer);
   return store;
};

const wrapper = createWrapper(configurestore , {
   debug:process.env.NODE_ENV === 'development',
});

export default  wrapper;