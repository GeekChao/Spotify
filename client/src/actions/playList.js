import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';
import async from 'async';
import {getCurUser} from '../reducers';

/**
 * fetch a list of playlists from the current user first, then fetch tracks from each playlist
 */
export const fetchUserPlaylists = () => (dispatch, getState) => new Promise((resolve, reject) => {
    const userId = getCurUser(getState()).get('id');
    const playListsInfo = {}, playListsTracks = {};

    if(!userId){
        reject('NO_USER_EXIST');
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
            reject(err.responseText);
        }

        dispatch({
            type: action.FETCH_PLAYLISTS_SUCCESS,
            payload: {
                playListsInfo,
                playListsTracks
            }
        });

        resolve('Fetch playLists successfully');
    });
});