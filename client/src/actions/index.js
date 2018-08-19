import * as action from '../constants';
import * as api from '../api/spotifyWebAPi';

export const getUser = () => {
    return api.getCurrentUser()
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
            error: err.responseText
        }));
};