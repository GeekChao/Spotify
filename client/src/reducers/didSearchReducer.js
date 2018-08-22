import {FETCH_SEARCH_TRACKS_SUCCESS, CLEAR_DID_SEARCH} from '../constants';

export default function(state = false, action){
    switch(action.type){
        case FETCH_SEARCH_TRACKS_SUCCESS:
            return state = true;
        case CLEAR_DID_SEARCH:
            return state = false;
        default:
            return state;
    }
}

export const getDidSearch = state => state;