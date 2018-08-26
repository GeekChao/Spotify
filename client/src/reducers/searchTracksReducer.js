import {FETCH_SEARCH_TRACKS_SUCCESS} from '../constants';
import {fromJS} from 'immutable';

export default function searchTracksReducer(state = fromJS({
    items: []
}), action){
    switch(action.type){
        case FETCH_SEARCH_TRACKS_SUCCESS:
            return state.mergeDeep(action.payload.tracks);
        default:
            return state;
    }
}

export const getSearchTracks = state => state;