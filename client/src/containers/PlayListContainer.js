import {connect} from 'react-redux';
import {getPlayListInfo, getPlayListTracks, getDeviceId, getCurState, getPlayer} from '../reducers';
import PlayList from '../components/PlayList/PlayList';
import toJS from '../util/toJS';

const mapStateToProps = (state, {location:{state:{playListId}}}) => ({
    playListInfo: getPlayListInfo(state, playListId),
    playListTracks: getPlayListTracks(state, playListId),
    deviceId: getDeviceId(state),
    player: getPlayer(state),
    curState: getCurState(state)
});

export default connect(mapStateToProps)(toJS(PlayList));