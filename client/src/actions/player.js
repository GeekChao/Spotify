import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';
import {truncateName} from '../util/truncate';

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
        const {current_track:{name:trackName, album:{images:albumImg}, artists}} = state.track_window;
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
                playing: !paused,
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

export const removePlayer = () => (dispatch, getState) => {
    const player = getPlayer(getState());
    if(player){
        player.disconnect();
    }

    dispatch({
        type: action.DISCONNECT_MUSIC_PLAYER
    });
};
