import React from 'react';
import Client from '../Client';
import {AUTH_URL} from '../constants';
import {getHashParams} from '../util/token';
import PropTypes from 'prop-types';
import {fetchUser, fetchUserPlaylists} from '../actions';
import async from 'async';

class App extends React.Component{
    static contextTypes = {
        store: PropTypes.object,
    };

    componentWillMount(){
        const {access_token, refresh_token, error} = getHashParams();

        if(error){
            alert('There was an error during the authentication'); //replace with redux action
        }

        if(access_token){
            Client.setToken(access_token, refresh_token);
        }

        if(!Client.isLoggedin()){
            window.location.href = AUTH_URL;
        }
    }

    componentDidMount(){
        const {dispatch} = this.context.store;
        async.series([
            cb => {
                dispatch(fetchUser());
                cb(null);
            },
            cb => {
                dispatch(fetchUserPlaylists());
                cb(null);
            }
        ]);
    }

    render(){
        return(
            <div>
                Hello world
            </div>
        );
    }
}

export default App;