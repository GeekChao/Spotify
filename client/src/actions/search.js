import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';

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