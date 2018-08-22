import { combineReducers } from 'redux-immutable';
import userReducer, * as fromUser from './userReducer';
import playListsReducer, * as fromPlayLists from './playListsReducer';
import errorReducer from './errorReducer';
import searchTracksReducer, * as fromSearchTracks from './searchTracksReducer';
import didSearchReducer, * as fromSearch from './didSearchReducer';

const rootReducer = combineReducers({
    user: userReducer,
    playLists: playListsReducer,
    error: errorReducer,
    searchTracks: searchTracksReducer,
    didSearch: didSearchReducer,
});

export default rootReducer;

export const getCurUser = (state) => fromUser.getCurUser(state.get('user'));

export const getPlayListInfo = (state, playListId) => fromPlayLists.getPlayListInfo(state.get('playLists'), playListId);

export const getPlayListTracks = (state, playListId) => fromPlayLists.getPlayListTracks(state.get('playLists'), playListId);

export const getPlayLists = (state) => fromPlayLists.getPlayLists(state.get('playLists'));

export const getSearchTracks = (state) => fromSearchTracks.getSearchTracks(state.get('searchTracks'));

export const getDidSearch = (state) => fromSearch.getDidSearch(state.get('didSearch'));