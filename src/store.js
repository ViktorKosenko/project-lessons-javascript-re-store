import { createStore, applyMiddleware } from 'redux'; //  2) compose
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';
 
//                     store  dispatch
const logMiddleware = (store) => (next) => (action) => {
    console.log(action.type, store.getState());
    return next(action);
};

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string'){
        return next({
            type: action
        });
    }   
    return next(action);
};

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware, stringMiddleware, logMiddleware));

const delayedActionCreatore = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), timeout)
}

store.dispatch(delayedActionCreatore(1500));

//  ====================== 2 =========
// const stringEnhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string'){
//             return originalDispatch({
//                 type: action
//             });
//         }   

//         return originalDispatch(action);
//     };

//     return store;
// };

// const logEnhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         console.log(action.type);
//         return originalDispatch(action);
//     };

//     return store;
// };

// const store = createStore(reducer, compose(stringEnhancer, logEnhancer));

store.dispatch('HELLO_WORLD');

export default store;