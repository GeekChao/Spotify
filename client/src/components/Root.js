import { Provider } from 'react-redux';
import App from './App';
import React from 'react';
import { Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import configureStore from '../store/configureStore';

//const store = configureStore();

const Root = () => {
    return (
        <Provider>
           <Router>
               <Switch>
                    <Route path='/' component={App}/>
               </Switch>
           </Router>
        </Provider>
    );
};

export default Root;