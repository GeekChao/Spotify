import {FETCH_USER_FAIL, FETCH_PLAYLISTS_FAIL} from '../constants';

export default function errorReducer(state = '', action){
    switch(action.type){
        case FETCH_USER_FAIL:
        case FETCH_PLAYLISTS_FAIL:
            return action.payload.error;
        default:
            return state;
    };
};