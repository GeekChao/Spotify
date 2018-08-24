import {connect} from 'react-redux';
import RecentlyPlayTracks from '../components/Library/RecentlyPlayTracks';
import {getRecentlyPlayTracks, getDeviceId, getPlayer, getCurState} from '../reducers';
import toJS from '../util/toJS';

const mapStateToProps = (state) => ({
    tracks: getRecentlyPlayTracks(state),
    deviceId: getDeviceId(state),
    curState: getCurState(state),
    player: getPlayer(state)
}); 

export default connect(mapStateToProps)(toJS(RecentlyPlayTracks));