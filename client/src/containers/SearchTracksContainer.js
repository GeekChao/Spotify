import {connect} from 'react-redux';
import TracksTable from '../components/Tracks/TracksTable';
import {getSearchTracks, getDidSearch, getDeviceId, getPlayer, getPlayStatus} from '../reducers';
import toJS from '../util/toJS';
import React from 'react';
import {clearDidSearch} from '../actions';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

class SearchTracks extends React.Component{
    static propTypes = {
        didSearch: PropTypes.bool.isRequired,
        deviceId: PropTypes.string.isRequired
    };

    componentDidMount(){
        const {didSearch, dispatch} = this.props;
        if(didSearch) dispatch(clearDidSearch());
    }

    componentDidUpdate(){
        const {didSearch, dispatch} = this.props;
        if(didSearch) dispatch(clearDidSearch());
    }

    render(){
        const {tracks, deviceId, playStatus, player} = this.props;
        return (
            <div>
                {
                    tracks == undefined ? 
                        <Redirect to={'/'}/> :
                        <TracksTable 
                            tracks={tracks} 
                            deviceId={deviceId} 
                            playStatus={playStatus} 
                            player={player}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tracks: getSearchTracks(state),
    didSearch: getDidSearch(state),
    deviceId: getDeviceId(state),
    playStatus: getPlayStatus(state),
    player: getPlayer(state)
}); 

export default connect(mapStateToProps)(toJS(SearchTracks));