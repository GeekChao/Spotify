import {combineReducers} from 'redux-immutable';
import userReducer, * as fromUser from './userReducer';
import playListsReducer from './playListsReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    user: userReducer,
    playLists: playListsReducer,
    error: errorReducer,
});

export default rootReducer;

export const getCurUser = (state) => fromUser.getCurUser(state.get('user'));