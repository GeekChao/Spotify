import React from 'react';
import {clearDidSearch} from '../../actions/search';
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
        const {tracks, deviceId, curState, player, dispatch} = this.props;
        return (
            <div>
                {
                    tracks.items.length === 0 ? 
                        <Redirect to={'/'}/> :
                        <TracksTable 
                            tracks={tracks} 
                            deviceId={deviceId} 
                            curState={curState} 
                            player={player}
                            dispatch={dispatch}
                        />
                }
            </div>
        );
    }
}

export default SearchTracks;