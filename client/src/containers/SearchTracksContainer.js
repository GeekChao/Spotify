import {connect} from 'react-redux';
import {getSearchTracks, getDidSearch, getDeviceId, getPlayer, getCurState} from '../reducers';
import toJS from '../util/toJS';
import SearchTracks from '../components/ToolBar/SearchTracks';

const mapStateToProps = (state) => ({
    tracks: getSearchTracks(state),
    didSearch: getDidSearch(state),
    deviceId: getDeviceId(state),
    curState: getCurState(state),
    player: getPlayer(state)
}); 

export default connect(mapStateToProps)(toJS(SearchTracks));