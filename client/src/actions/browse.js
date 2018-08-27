import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';

export const fetchCategories = () => {
    return api.fetchCategories()
        .then(({categories:{items}}) => {
            const categories = items.map(({id, icons, name}) => ({
                id,
                name,
                icon: icons && icons[0] && icons[0].url
            }));
            return {
                type: action.FETCH_CATEGORIES_SUCCESS,
                payload:{
                    categories
                }
            };
        })
        .catch(err => ({
            type: action.FETCH_CATEGORIES_FAIL,
            payload: {
                error: err.message
            }
        }));
};

export const fetchFeaturedPlayLists = () => {
    return api.fetchFeaturedPlayLists()
        .then(({playlists:{items}}) => {
            const featuredPlayLists = items.map(({images, name, id}) => ({
                id,
                name,
                icon: images && images[0] && images[0].url
            }));
            return {
                type: action.FETCH_FEATURED_PLAYLISTS_SUCCESS,
                payload:{
                    featuredPlayLists
                }
            };
        })
        .catch(err => ({
            type: action.FETCH_FEATURED_PLAYLISTS_FAIL,
            payload: {
                error: err.message
            }
        }));
};

export const fetchNewReleases = () => {
    return api.fetchNewReleases()
        .then(({albums:{items}}) => {
            const newReleases = items.map(({name, id, images}) => ({
                name,
                id,
                icon: images && images[1] && images[1].url
            }));
            return {
                type: action.FETCH_NEW_RELEASES_SUCCESS,
                payload:{
                    newReleases
                }
            };
        })
        .catch(err => ({
            type: action.FETCH_NEW_RELEASES_FAIL,
            payload: {
                error: err.message
            }
        }));
};