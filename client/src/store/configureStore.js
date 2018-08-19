import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const configureStore = () => {
    return createStore(reducers, applyMiddleware(thunk, promise, logger));
}

export default configureStore;