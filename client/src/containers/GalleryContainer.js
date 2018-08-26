import {connect} from 'react-redux';
import Gallery from '../components/Library/Gallery';
import {getAlbums, getArtists, getPlayer, getDeviceId} from '../reducers';
import {TAB_ALBUMS, TAB_ARTISTS} from '../constants';
import toJS from '../util/toJS';

const mapStateToProps = (state, ownProps) => {
    const {path} = ownProps.match;
    let selector;

    switch(path){
        case TAB_ALBUMS:
            selector = getAlbums;
            break;
        case TAB_ARTISTS:
            selector = getArtists;
            break;
        default:
            break;
    }

    return {
        items: selector(state),
        player: getPlayer(state),
        deviceId: getDeviceId(state),
        path,  
    };
}

export default connect(mapStateToProps)(toJS(Gallery));