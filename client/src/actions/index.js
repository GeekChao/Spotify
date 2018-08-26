import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';

export const fetchUser = () => {
    return api.fetchCurrentUser()
        .then(data => {
            const {display_name, id, images} = data;
            return {
                type: action.FETCH_USER_SUCCESS,
                payload:{
                    id,
                    display_name,
                    avatar_url: images && images[0] && images[0].url
                }
            };
        })
        .catch(err => ({
            type: action.FETCH_USER_FAIL,
            payload: {
                error: err.responseText
            }
        }));
};

export const addToMySavedTracks = ids => {
    return api.addToMySavedTracks(ids)
        .then(() => {
            return {
                type: action.ADD_TO_MY_SAVED_TRACKS_SUCCESS,
            };
        })
        .catch(err => ({
            type: action.ADD_TO_MY_SAVED_TRACKS_FAIL,
            payload: {
                error: err.responseText
            }
        }));
}

export const removeFromMySavedTracks = ids => {
    return api.removeFromMySavedTracks(ids)
        .then(() => {
            return {
                type: action.REMOVE_FROM_SAVED_TRACKS_SUCCESS,
            };
        })
        .catch(err => ({
            type: action.REMOVE_FROM_SAVED_TRACKS_FAIL,
            payload: {
                error: err.responseText
            }
        }));
}

export const containsMySavedTracks = ids => {
    return api.containsMySavedTracks(ids)
        .then(data => {
            let savedTrackIds = {};
            ids.forEach((id, i) => savedTrackIds[id] = data[i]);

            return {
                type: action.CONTAINS_MY_SAVED_TRACKS_SUCCESS,
                savedTrackIds
            };
        })
        .catch(err => ({
            type: action.CONTAINS_MY_SAVED_TRACKS_FAIL,
            payload: {
                error: err.responseText
            }
        }));
}