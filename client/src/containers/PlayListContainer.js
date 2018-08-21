import {connect} from 'react-redux';
import {getPlayListInfo, getPlayListTracks} from '../reducers';
import PlayList from '../components/PlayList/PlayList';
import toJS from '../util/toJS';

const mapStateToProps = (state, {location:{state:{playListId}}}) => ({
    playListInfo: getPlayListInfo(state, playListId),
    playListTracks: getPlayListTracks(state, playListId)
});

export default connect(mapStateToProps)(toJS(PlayList));