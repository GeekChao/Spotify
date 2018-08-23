import {INIT_MUSIC_PLAYER, MUSIC_PLAYER_READY} from '../constants';
import curStateReducer, * as fromCurState from './curStateReducer';
import {combineReducers} from 'redux-immutable';

function deviceIdReducer(state = 0, action){
    switch(action.type){
        case MUSIC_PLAYER_READY:
            return state = action.payload.deviceId;
        default: 
            return state;
    }
}

function playerReducer(state = null, action){
    switch(action.type){
        case INIT_MUSIC_PLAYER:
            return state = action.payload.player;
        default: 
            return state;
    }
}

export default combineReducers({
    deviceId: deviceIdReducer,
    player: playerReducer,
    curState: curStateReducer
});

export const getPlayer = state => state.get('player');

export const getDeviceId = state => state.get('deviceId');

export const getPlayerCurTrack = state => fromCurState.getPlayerCurTrack(state.get('curState'));

export const getPlayerProgress = state => fromCurState.getPlayerProgress(state.get('curState'));