import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import {Map} from 'immutable';

const initialState = Map();

const configureStore = () => {
    if(process.env.PRODUCTION){
        return createStore(reducer, initialState, applyMiddleware(thunk, promise));
    }else{
        return createStore(reducer, initialState, applyMiddleware(thunk, promise, logger));
    }
}

export default configureStore;