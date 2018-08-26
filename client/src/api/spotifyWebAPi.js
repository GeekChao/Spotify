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

export function refreshToken(){
    console.log('refresh_token');

    const refresh_token = Client.getRefreshToken();
    return axios.get(`${REFRESH_TOKEN_URL}`, {
        params:{refresh_token}
    })
    .then(res => {
        const {access_token} = res.data;
        access_token && Client.setToken(access_token);
        return access_token;
    })
    .catch(err => {throw err});
}

function wrapSpotifyWebAPi(api){
    _setToken();
    return api()
            .catch(err => {
                if(err.status === 401){
                    return refreshToken()
                            .then(access_token => { //refresh token if the access token expires
                                if(access_token){
                                    _setToken();
                                    return api();
                                }
                            });
                }else{
                    throw err;
                }
            });
}

export function fetchUserPlaylists(userId){
    return wrapSpotifyWebAPi(() => spotify.getUserPlaylists(userId));
}

export function fetchCurrentUser(){
    return wrapSpotifyWebAPi(() => spotify.getMe());
}

export function fetchTracksFromPlayList(userId, playListId){
    return wrapSpotifyWebAPi(() => spotify.getPlaylistTracks(userId, playListId));
}

export function fetchSearchTracks(query){
    return wrapSpotifyWebAPi((() => spotify.searchTracks(query)));
} 

export function playTracks(deviceId, uris, uri){
    const access_token = Client.getAccessToken();
    return axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, 
    {
        uris,
        offset: uri ? {uri} : {position: 0}
    }, 
    {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
}

export function fetchRecentlyPlayTracks(){
    return wrapSpotifyWebAPi(() => spotify.getMyRecentlyPlayedTracks());
}

export function fetchSavedTracks(){
    return wrapSpotifyWebAPi(() => spotify.getMySavedTracks({limit: 30}));
}

export function fetchArtists(ids){
    return wrapSpotifyWebAPi(() => spotify.getArtists(ids));
} 

export function fetchTracksFromArtist(id, market = 'US'){
    return wrapSpotifyWebAPi(() => spotify.getArtistTopTracks(id, market));
} 

export function addToMySavedTracks(ids){
    return wrapSpotifyWebAPi(() => spotify.addToMySavedTracks(ids));
} 

export function containsMySavedTracks(ids){
    return wrapSpotifyWebAPi(() => spotify.containsMySavedTracks(ids));
}

export function removeFromMySavedTracks(ids){
    return wrapSpotifyWebAPi(() => spotify.removeFromMySavedTracks(ids));
}