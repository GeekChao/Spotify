import React from 'react';
import Client from '../Client';
import {AUTH_URL} from '../constants';
import {getHashParams} from '../util/token';
import * as SpotifyWebApi from '../api/spotifyWebAPi';
import PropTypes from 'prop-types';
import {getUser} from '../actions'

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
            SpotifyWebApi.getCurrentUser();
        }

        if(!Client.isLoggedin()){
            window.location.href = AUTH_URL;
        }
    }

    componentDidMount(){
        this.context.store.dispatch(getUser());
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