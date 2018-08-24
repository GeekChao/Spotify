import {connect} from 'react-redux';
import {getPlayListInfo, getPlayListTracks, getDeviceId, getPlayStatus, getPlayer} from '../reducers';
import PlayList from '../components/PlayList/PlayList';
import toJS from '../util/toJS';

const mapStateToProps = (state, {location:{state:{playListId}}}) => ({
    playListInfo: getPlayListInfo(state, playListId),
    playListTracks: getPlayListTracks(state, playListId),
    deviceId: getDeviceId(state),
    playStatus: getPlayStatus(state),
    player: getPlayer(state),
});

export default connect(mapStateToProps)(toJS(PlayList));