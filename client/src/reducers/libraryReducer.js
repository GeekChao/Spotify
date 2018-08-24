import {Map, fromJS} from 'immutable';
import {FETCH_RECENTLY_PLAY_SUCCESS} from '../constants';
import {combineReducers} from 'redux-immutable';

const songsReducer = (state = Map(), action) => {
    switch(action.type){

        default:
            return state;
    } 
}

const albumsReducer = (state = Map(), action) => {
    switch(action.type){

        default:
            return state;
    } 
}

const artistisReducer = (state = Map(), action) => {
    switch(action.type){

        default:
            return state;
    } 
}

const recentlyPlayTracksReducer = (state = fromJS({
    tracks: {items: []}
}), action) => {
    switch(action.type){
        case FETCH_RECENTLY_PLAY_SUCCESS:
            return state.mergeDeep(action.payload);
        default:
            return state;
    }    
}

export default combineReducers({
    recentlyPlayTracks: recentlyPlayTracksReducer,
    songs: songsReducer,
    albums: albumsReducer,
    artistis: artistisReducer
});

export const getRecentlyPlayTracks = state => state.get('recentlyPlayTracks').get('tracks');