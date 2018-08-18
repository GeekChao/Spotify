import {SPOTIFY_ACCESS_TOKEN, SPOTIFY_REFRESH_TOKEN} from './constants';

function isLoggedin(){
    return localStorage.getItem(SPOTIFY_ACCESS_TOKEN) !== null;
}

function setToken(access_token, refresh_token){
    access_token && localStorage.setItem(SPOTIFY_ACCESS_TOKEN, access_token);
    refresh_token && localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refresh_token);
}

function removeToken(){
    localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);
    localStorage.removeItem(SPOTIFY_REFRESH_TOKEN);
}

function getAccessToken(){
    return localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
}

function getRefreshToken(){
    return localStorage.getItem(SPOTIFY_REFRESH_TOKEN);
}

export default {
    isLoggedin,
    setToken,
    getAccessToken,
    getRefreshToken,
    removeToken,
};