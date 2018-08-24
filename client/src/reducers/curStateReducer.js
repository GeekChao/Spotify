import {UPDATE_PLAYER_STATE} from '../constants';
import {fromJS} from 'immutable';

export default function curStateReducer(state = fromJS({
    curTrack: {
        trackName: '',
        albumImg: '',
        artistsName: ''
    },
    progress: {
        position: 0,
        duration: 0
    },
    playing: false,
}), action){
    switch(action.type){
        case UPDATE_PLAYER_STATE:
            return state.mergeDeep(action.payload);
        default:
            return state;
    }        
}
