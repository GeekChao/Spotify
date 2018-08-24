import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';
import async from 'async';
import {getCurUser, getPlayer} from '../reducers';
import {truncateName} from '../util/truncate';

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

export const fetchSearchTracks = query => {
    return api.fetchSearchTracks(query)
        .then(data => {
            //convert track obj to 'fake' playList obj
            const items = data.tracks.items.map(item => ({
                added_at: new Date().toISOString(),
                track: item
            }));
            return {
                type: action.FETCH_SEARCH_TRACKS_SUCCESS,
                payload:{
                    tracks: {items}
                }
            };
        })
        .catch(err => ({
            type: action.FETCH_SEARCH_TRACKS_FAIL,
            payload: {
                error: err.responseText
            }
        }));   
}

export const clearDidSearch = () => ({
    type: action.CLEAR_DID_SEARCH
});

export const removePlayer = () => (dispatch, getState) => {
    const player = getPlayer(getState());
    if(player){
        player.disconnect();
    }

    dispatch({
        type: action.DISCONNECT_MUSIC_PLAYER
    });
};


export const setUpPlayer = () => dispatch => new Promise((resolve, reject) => {
    const player = new window.Spotify.Player({
        name: 'music player',
        getOAuthToken: cb => { 
            api.refreshToken()
                .then(access_token => cb(access_token))
                .catch(err => console.error(err));
        }
    });

    dispatch({
        type: action.INIT_MUSIC_PLAYER,
        payload: {
            player
        }
    });
    
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { 
        console.log(state);
        const {position, duration, paused} = state;
        const {current_track:{name:trackName, album:{images:albumImg}, artists, uri}} = state.track_window;
        const artistsName = truncateName(artists.map(({name}) => name).join(', '), 30);
        dispatch({
            type: action.UPDATE_PLAYER_STATE,
            payload: {
                curTrack: {
                    trackName,
                    albumImg,
                    artistsName
                },
                progress:{
                    position,
                    duration
                },
                playStatus: {
                    playing: !paused,
                    playTrackUri: uri
                }
            }
        });
        });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        dispatch({
            type: action.MUSIC_PLAYER_READY,
            payload: {
                deviceId: device_id
            }
        });
        resolve('ready');
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        reject('not ready');
    });

    // Connect to the player!
    player.connect();
});