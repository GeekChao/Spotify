import {FETCH_USER_SUCCESS} from '../constants';
import {Map} from 'immutable';

export default function userReducer(state = Map({
    id: -1,
    display_name: '',
    avatar_url: ''
}), action){
    switch(action.type){
        case FETCH_USER_SUCCESS: 
            return state.merge(action.payload);
        default:
            return state;
    }
}

export const getCurUser = (state) => state;