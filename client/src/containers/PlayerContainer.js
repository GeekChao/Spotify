import {connect} from 'react-redux';
import Player from '../components/Player/Player';
import toJS from '../util/toJS';
import {getPlayer, getPlayerCurTrack, getPlayerProgress} from '../reducers'

const mapStateToProps = (state) => ({
    player: getPlayer(state),
    track: getPlayerCurTrack(state),
    progress: getPlayerProgress(state)
});


export default connect(mapStateToProps)(toJS(Player));