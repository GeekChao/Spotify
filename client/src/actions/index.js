import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';
import async from 'async';
import {getCurUser} from '../reducers';

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

/**
 * fetch a list of playlists from the current user first, then fetch tracks from each playlist
 */
export const fetchUserPlaylists = () => (dispatch, getState) => {
    const userId = getCurUser(getState()).get('id');
    const playListsInfo = {}, playListsTracks = {};

    if(!userId){
        return dispatch({
            type: action.NO_USER_EXIST,
            payload: {
                error: 'NO_USER_EXIST'
            }
        });
    }

    async.waterfall([
        cb => {
            api.fetchUserPlaylists(userId)
                .then(data => {
                    const {items} = data;
                    items.forEach(item => {
                        playListsInfo[item.id] = item;
                    });
                    cb(null, Object.keys(playListsInfo));
                })
                .catch(err => cb(err));
        },
        (playListsIds, cb) => {
            const fns = playListsIds.map(id => {
                return callback => {
                    api.fetchTracksFromPlayList(userId, id)
                        .then(data => {
                            playListsTracks[id] = data;
                            callback(null);
                        })
                        .catch(err => callback(err));
                };
            });
            async.parallel(fns, (err) => {
                if(err){
                    cb(err);
                }
                cb(null);
            });
        }
    ], (err) => {
        if(err){
            return dispatch({
                type: action.FETCH_PLAYLISTS_FAIL,
                payload: {
                    error: err.responseText
                }
            });
        }

        dispatch({
            type: action.FETCH_PLAYLISTS_SUCCESS,
            payload: {
                playListsInfo,
                playListsTracks
            }
        });
    });
};