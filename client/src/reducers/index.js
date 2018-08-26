import { combineReducers } from 'redux-immutable';
import userReducer, * as fromUser from './userReducer';
import playListsReducer, * as fromPlayLists from './playListsReducer';
import errorReducer from './errorReducer';
import searchTracksReducer, * as fromSearchTracks from './searchTracksReducer';
import didSearchReducer, * as fromSearch from './didSearchReducer';
import musicPlayerReducer, * as fromPlayer from './musicPlayerReducer';
import libraryReducer, * as fromLibrary from './libraryReducer';

const rootReducer = combineReducers({
    user: userReducer,
    playLists: playListsReducer,
    error: errorReducer,
    searchTracks: searchTracksReducer,
    didSearch: didSearchReducer,
    musicPlayer: musicPlayerReducer,
    library: libraryReducer
});

export default rootReducer;

export const getCurUser = (state) => fromUser.getCurUser(state.get('user'));

export const getPlayListInfo = (state, playListId) => fromPlayLists.getPlayListInfo(state.get('playLists'), playListId);

export const getPlayListTracks = (state, playListId) => fromPlayLists.getPlayListTracks(state.get('playLists'), playListId);

export const getPlayLists = (state) => fromPlayLists.getPlayLists(state.get('playLists'));

export const getSearchTracks = (state) => fromSearchTracks.getSearchTracks(state.get('searchTracks'));

export const getDidSearch = (state) => fromSearch.getDidSearch(state.get('didSearch'));

export const getPlayer = (state) => fromPlayer.getPlayer(state.get('musicPlayer'));

export const getDeviceId = (state) => fromPlayer.getDeviceId(state.get('musicPlayer'));

export const getCurState = (state) => fromPlayer.getCurState(state.get('musicPlayer'));

export const getRecentlyPlayTracks = (state) => fromLibrary.getRecentlyPlayTracks(state.get('library'));

export const getSavedTracks = (state) => fromLibrary.getSavedTracks(state.get('library'));

export const getAlbums = state => fromLibrary.getAlbums(state.get('library'));

export const getArtists = state => fromLibrary.getArtists(state.get('library'));

export const getArtistTopTracks = state => fromLibrary.getArtistTopTracks(state.get('library'));