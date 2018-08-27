import {fromJS} from 'immutable';
import {FETCH_CATEGORIES_SUCCESS, FETCH_NEW_RELEASES_SUCCESS, FETCH_FEATURED_PLAYLISTS_SUCCESS} from '../constants';

export default function(state = fromJS({
    categories: [],
    newReleases: [],
    featuredPlayLists: []
}), action){
    switch(action.type){
        case FETCH_CATEGORIES_SUCCESS:
        case FETCH_FEATURED_PLAYLISTS_SUCCESS:
        case FETCH_NEW_RELEASES_SUCCESS:
            return state.mergeDeep(action.payload);
        default:
            return state;
    }
}

export const getCategories = state => state.get('categories');

export const getNewReleases = state => state.get('newReleases');

export const getFeaturedPlayLists = state => state.get('featuredPlayLists');