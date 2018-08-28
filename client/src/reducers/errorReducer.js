import * as error from '../constants';

export default function errorReducer(state = '', action){
    switch(action.type){
        case error.INIT_APP_ERROR:
            return 'Safari does not support player, please use other browsers instead!';
        default:
            return state;
    };
};

export const getErrorMsg = state => state;