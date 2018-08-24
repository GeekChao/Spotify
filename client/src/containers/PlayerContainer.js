import {connect} from 'react-redux';
import Player from '../components/Player/Player';
import toJS from '../util/toJS';
import {getPlayer, getCurState} from '../reducers'

const mapStateToProps = (state) => ({
    player: getPlayer(state),
    curState: getCurState(state)
});


export default connect(mapStateToProps)(toJS(Player));