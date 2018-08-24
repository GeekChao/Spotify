import React from 'react';
import PropTypes from 'prop-types';
import TracksTable from '../Tracks/TracksTable';
import {fetchRecentlyPlayTracks} from '../../actions';
import {FETCH_RECENTLY_PLAY_FAIL} from '../../constants';
import '../UI/load.css';

class RecentlyPlayTracks extends React.Component{
    static propTypes = {
        deviceId: PropTypes.string.isRequired,
        tracks: PropTypes.object.isRequired,
        curState: PropTypes.object.isRequired,
        player: PropTypes.object.isRequired    
    };

    state = {
        loading: true,
    };

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetchRecentlyPlayTracks())
            .then(() => this.setState({loading: false}))
            .catch(err => dispatch({
                type: FETCH_RECENTLY_PLAY_FAIL,
            }));
    }

    render(){
        const {tracks, deviceId, curState, player} = this.props;

        if(this.state.loading && tracks.items.length === 0) return <p className="loading">Loading…</p>;

        return (
            <div>
                {
                    tracks &&
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

export default RecentlyPlayTracks;