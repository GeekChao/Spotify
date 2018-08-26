import React from 'react';
import PropTypes from 'prop-types';
import TracksTable from '../Tracks/TracksTable';
import {FETCH_SAVED_TRACKS_FAIL, FETCH_RECENTLY_PLAY_FAIL, TAB_RECENTLY_PLAY, TAB_SONGS} from '../../constants';
import '../UI/load.css';
import {fetchSavedTracks, fetchRecentlyPlayTracks} from '../../actions/library';
import LibraryHeader from './LibraryHeader';

class LibraryTracks extends React.Component{
    static propTypes = {
        deviceId: PropTypes.string.isRequired,
        tracks: PropTypes.object.isRequired,
        curState: PropTypes.object.isRequired,
        player: PropTypes.object.isRequired,
        path: PropTypes.string.isRequired    
    };

    state = {
        loading: true,
    };

    fetchData = (path) => {
        const {dispatch} = this.props;
        let fetchFn, errType;

        switch(path){
            case TAB_RECENTLY_PLAY:
                fetchFn = fetchRecentlyPlayTracks;
                errType = FETCH_RECENTLY_PLAY_FAIL;
                break;
            case TAB_SONGS:
                fetchFn = fetchSavedTracks;
                errType = FETCH_SAVED_TRACKS_FAIL;
                break;
            default:
                break;
        }

        this.setState({loading: true});

        dispatch(fetchFn())
            .then(() => this.setState({loading: false}))
            .catch(err => dispatch({
                type: errType,
            }));
    };

    componentDidMount(){
        this.fetchData(this.props.path);
    }

    componentWillReceiveProps(newProps){
        if(newProps.path !== this.props.path){
            this.fetchData(newProps.path);
        }
    }

    render(){
        const {tracks, deviceId, curState, player, path, dispatch} = this.props;
        const uris = tracks.items.map(item => item.track.uri);

        if(this.state.loading && tracks.items.length === 0) return <p className="loading">Loading…</p>;

        return (
            <div className='libraryTracks'>
                <LibraryHeader
                    uris={uris}
                    deviceId={deviceId}
                    path={path}
                />
                {
                    tracks &&
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

export default LibraryTracks;