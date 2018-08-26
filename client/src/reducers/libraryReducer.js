import {fromJS, List} from 'immutable';
import {FETCH_RECENTLY_PLAY_SUCCESS, FETCH_SAVED_TRACKS_SUCCESS, FETCH_ARTISTS_SUCCESS, FETCH_ARTISTS_TOP_TRACKS_SUCCESS} from '../constants';
import {combineReducers} from 'redux-immutable';

const savedTracksReducer = (state = fromJS({
    items: []
}), action) => {
    switch(action.type){
        case FETCH_SAVED_TRACKS_SUCCESS:
            return state.mergeDeep(action.payload.tracks);
        default:
            return state;
    }
};

const albumsReducer = (state = List(), action) => {
    switch(action.type){
        case FETCH_SAVED_TRACKS_SUCCESS:
            return state = fromJS(action.payload.albums);
        default:
            return state;
    } 
};

const artistsReducer = (state = List(), action) => {
    switch(action.type){
        case FETCH_ARTISTS_SUCCESS:
            return state = fromJS(action.payload.artists);
        default:
            return state;
    } 
};

const recentlyPlayTracksReducer = (state = fromJS({
    items: []
}), action) => {
    switch(action.type){
        case FETCH_RECENTLY_PLAY_SUCCESS:
            return state.mergeDeep(action.payload.tracks);
        default:
            return state;
    }    
};

const artistTopTracksReducer = (state = fromJS({
    items: []
}), action) => {
    switch(action.type){
        case FETCH_ARTISTS_TOP_TRACKS_SUCCESS:
            return state.mergeDeep(action.payload.tracks);
        default:
            return state;
    }   
}

export default combineReducers({
    recentlyPlayTracks: recentlyPlayTracksReducer,
    saveTracks: savedTracksReducer,
    albums: albumsReducer,
    artists: artistsReducer,
    artistTopTracks: artistTopTracksReducer
});

export const getRecentlyPlayTracks = state => state.get('recentlyPlayTracks');

export const getSavedTracks = state => state.get('saveTracks');

export const getAlbums = state => state.get('albums');

export const getArtists = state => state.get('artists');

export const getArtistTopTracks = state => state.get('artistTopTracks');

