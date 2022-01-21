import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/indexReducer'

var store= createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
//composeWithDevTools(applyMiddleware(thunk)
export default store;