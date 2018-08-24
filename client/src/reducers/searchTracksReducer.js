import {FETCH_SEARCH_TRACKS_SUCCESS} from '../constants';
import {fromJS} from 'immutable';

export default function searchTracksReducer(state = fromJS({
    tracks: {items: []}
}), action){
    switch(action.type){
        case FETCH_SEARCH_TRACKS_SUCCESS:
            return state.mergeDeep(action.payload);
        default:
            return state;
    }
}

export const getSearchTracks = (state) => state.get('tracks');