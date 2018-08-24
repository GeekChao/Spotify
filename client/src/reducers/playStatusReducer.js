import {UPDATE_PLAYER_STATE} from '../constants';
import {Map} from 'immutable';

export default function playStatusReducer(state = Map({
    playing: false,
    playTrackUri: ''
}), action){
    switch(action.type){
        case UPDATE_PLAYER_STATE:
            return state.merge(action.payload.playStatus);
        default:
            return state;
    }   
}

export const getPlayStatus = state => state;