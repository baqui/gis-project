import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './root-reducer';

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducers, undefined, enhancer);

export default store;
