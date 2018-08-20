import { Provider } from 'react-redux';
import App from './App/App';
import React from 'react';
import configureStore from '../store/configureStore';
import { BrowserRouter as Router} from 'react-router-dom';

const store = configureStore();

const Root = () => {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
};

export default Root;