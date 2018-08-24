import React from 'react';
import {clearDidSearch} from '../../actions';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import TracksTable from '../Tracks/TracksTable';

class SearchTracks extends React.Component{
    static propTypes = {
        didSearch: PropTypes.bool.isRequired,
        deviceId: PropTypes.string.isRequired,
        tracks: PropTypes.object.isRequired,
        curState: PropTypes.object.isRequired,
        player: PropTypes.object.isRequired
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
        const {tracks, deviceId, curState, player} = this.props;
        return (
            <div>
                {
                    tracks == undefined ? 
                        <Redirect to={'/'}/> :
                        <TracksTable 
                            tracks={tracks} 
                            deviceId={deviceId} 
                            curState={curState} 
                            player={player}
                        />
                }
            </div>
        );
    }
}

export default SearchTracks;