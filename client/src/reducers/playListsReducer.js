import {FETCH_PLAYLISTS_SUCCESS} from '../constants';
import {fromJS} from 'immutable';

export default function playListsReducer(state = fromJS({
    playListsInfo: {},
    playListsTracks: {}
}), action){
    switch(action.type){
        case FETCH_PLAYLISTS_SUCCESS:
            return state.mergeDeep(fromJS(action.payload));
        default:
            return state;
    };
};
