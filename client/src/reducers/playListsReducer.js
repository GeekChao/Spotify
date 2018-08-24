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

export const getPlayListInfo = (state, playListId) => state.get('playListsInfo').get(`${playListId}`);

export const getPlayListTracks = (state, playListId) => state.get('playListsTracks').get(`${playListId}`);

export const getPlayLists = (state) => state.get('playListsInfo');           