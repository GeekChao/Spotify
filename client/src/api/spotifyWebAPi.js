import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
import Client from '../Client';
import {REFRESH_TOKEN_URL} from '../constants';

const spotify = new SpotifyWebApi();

function _setToken(){
    const access_token = Client.getAccessToken();
    const pre_access_token = spotify.getAccessToken();

    if(!pre_access_token || pre_access_token !== access_token){
        spotify.setAccessToken(access_token);
    }
} 

function _refreshToken(){
    const refresh_token = Client.getRefreshToken();
    return axios.get(`${REFRESH_TOKEN_URL}`, {
        params:{refresh_token}
    })
    .then(res => {
        const {access_token} = res.data;
        access_token && Client.setToken(access_token);
        return access_token;
    })
    .catch(err => console.error(err));
}

function wrapSpotifyWebAPi(api){
     _setToken();
    api()
        .then(res => console.log(res))
        .catch(err => {
            if(err.status === 401){
                _refreshToken().then(access_token => { //refresh token if the access token expires
                    if(access_token){
                        _setToken();
                        api()
                            .then(res => console.log(res))
                            .catch(err => console.log(err));
                    }
                });
            }else{
                console.error(err);
            }
        });
}


export function getUserPlaylists(userid){
    wrapSpotifyWebAPi(() => spotify.getUserPlaylists(userid));
}

export function getCurrentUser(){
    wrapSpotifyWebAPi(() => spotify.getMe());
}