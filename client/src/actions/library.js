import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';
import {truncateDate} from '../util/truncate';
import async from 'async';

export const fetchRecentlyPlayTracks = () => {
    return api.fetchRecentlyPlayTracks()
        .then(data => {
            //convert play history obj to 'fake' playList obj
            const items = data.items.map(({played_at, track}) => ({
                added_at: truncateDate(played_at),
                track
            }));
            return {
                type: action.FETCH_RECENTLY_PLAY_SUCCESS,
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

export const fetchTracksFromArtist = id => {
    return api.fetchTracksFromArtist(id)
        .then(data => {
            console.log(data);
            //convert track obj to 'fake' playList obj
            const items = data.tracks.map(track => ({
                added_at: truncateDate(new Date().toISOString()),
                track
            }));
            return {
                type: action.FETCH_ARTISTS_TOP_TRACKS_SUCCESS,
                payload:{
                    tracks: {items}
                }
            };
        })
        .catch(err => ({
            type: action.FETCH_ARTISTS_TOP_TRACKS_FAIL,
            payload: {
                error: err.responseText
            }
        })); 
}

export const fetchSavedTracks = () => (dispatch) => new Promise((resolve, reject) => {
    async.waterfall([
        cb => {
            api.fetchSavedTracks()
                .then(data => {
                    let albumsArr = [], ids = [];
                    const items = data.items.map(({added_at, track, track:{album, artists, uri}}) => {
                        albumsArr.push({
                            albumName: album.name,
                            icon: album.images[1].url,
                            uri,
                            artistName: artists[0].name
                        });
                        ids.push(artists[0].id);
        
                        return {
                            added_at,
                            track
                        };
                    });
        
                    dispatch({
                        type: action.FETCH_SAVED_TRACKS_SUCCESS,
                        payload:{
                            tracks: {items},
                            albums: albumsArr,
                        }
                    });

                    cb(null, ids);
                })
                .catch(err => {
                    dispatch({
                        type: action.FETCH_SAVED_TRACKS_FAIL,
                        payload: {
                            error: err.responseText
                        }
                    });
                    cb(err);
                });
        },
        (ids, cb) => {
            api.fetchArtists(ids)
                .then(data => {
                    const artists = data.artists.map(({images, name:artistName, uri, id}) => {
                        return {
                            icon: images[1].url,
                            uri,
                            artistName,
                            id
                        };
                    });

                    dispatch({
                        type: action.FETCH_ARTISTS_SUCCESS,
                        payload:{
                            artists
                        }
                    });
                    
                    cb(null);
                })
                .catch(err => {
                    dispatch({
                        type: action.FETCH_ARTISTS_FAIL,
                        payload: {
                            error: err.responseText
                        }
                    });
                    cb(err);
                }); 
        }
    ], err => {
        if(err){
            reject(err);
        }
        resolve('Success');
    });
})