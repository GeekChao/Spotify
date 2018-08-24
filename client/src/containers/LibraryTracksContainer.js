import {connect} from 'react-redux';
import LibraryTracks from '../components/Library/LibraryTracks';
import {getSavedTracks, getRecentlyPlayTracks, getDeviceId, getPlayer, getCurState} from '../reducers';
import toJS from '../util/toJS';
import {TAB_RECENTLY_PLAY, TAB_SONGS} from '../constants';

const mapStateToProps = (state, ownProps) => {
    const {path} = ownProps.match;
    let selectorTracks;
    
    switch(path){
        case TAB_RECENTLY_PLAY:
            selectorTracks = getSavedTracks;
            break;
        case TAB_SONGS:
            selectorTracks = getRecentlyPlayTracks;
            break;
        default:
            break;
    }

    return {
        tracks: selectorTracks(state),
        deviceId: getDeviceId(state),
        curState: getCurState(state),
        player: getPlayer(state),
        path
    };
} 


export default connect(mapStateToProps)(toJS(LibraryTracks));