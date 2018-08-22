import {FETCH_SEARCH_TRACKS_SUCCESS} from '../constants';
import {Map} from 'immutable';

export default function searchTracksReducer(state = Map(), action){
    switch(action.type){
        case FETCH_SEARCH_TRACKS_SUCCESS:
            return state.mergeDeep(action.payload);
        default:
            return state;
    }
}

export const getSearchTracks = (state) => state.get('tracks');