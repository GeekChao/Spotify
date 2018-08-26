import {connect} from 'react-redux';
import LibraryArtistTopTracks from '../components/Library/LibraryArtistTopTracks';
import {getArtistTopTracks, getDeviceId, getPlayer, getCurState} from '../reducers';
import toJS from '../util/toJS';

const mapStateToProps = (state, ownProps) => { 
    const {icon, artistName, id} = ownProps.location.state;

    return{
        tracks: getArtistTopTracks(state),
        deviceId: getDeviceId(state),
        curState: getCurState(state),
        player: getPlayer(state),
        icon,
        artistName,
        id
    };
}

export default connect(mapStateToProps)(toJS(LibraryArtistTopTracks));

