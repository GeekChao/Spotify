import React from 'react';
import PropTypes from 'prop-types';
import {fetchTracksFromArtist} from '../../actions/library';
import './LibraryArtistTopTracks.css';
import TracksTable from '../Tracks/TracksTable';
import '../UI/load.css';
import '../UI/shared.css';
import '../UI/playBtn.css';
import {playTracks} from '../../api/spotifyWebAPi';

class LibraryArtistTopTracks extends React.Component{
    static propTypes = {
        deviceId: PropTypes.string.isRequired,
        tracks: PropTypes.object.isRequired,
        curState: PropTypes.object.isRequired,
        player: PropTypes.object.isRequired,
        icon: PropTypes.string.isRequired,
        artistName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    };

    state = {
        loading: true,
    };

    componentDidMount(){
        const {dispatch, id} = this.props;
        dispatch(fetchTracksFromArtist(id))
            .then(() => {
                this.setState({loading: false});
            });
    }

    play = (uris, deviceId) => {
        playTracks(deviceId, uris)
            .then(() => console.log('play a track'))
            .catch(err => console.log(err));
    }

    render(){
        if(this.state.loading) return <p className="loading">Loading…</p>;

        const {tracks, deviceId, curState, player, icon, artistName, dispatch} = this.props;
        const uris = tracks.items.map(item => item.track.uri);

        return(
            <div className='libraryArtistTopTracks'>
                <div className='header'>
                    <div className='icon'>
                        <img alt='icon' src={icon}/>
                    </div>
                    <div className='info'>
                        <section>
                            <h5>TOP TRACKS FROM YOUR LIBRARY ARTIST</h5>
                            <h1>{artistName}</h1>
                        </section>
                        <button onClick={evt => {this.play(uris, deviceId)}}>PLAY</button>
                    </div>
                </div>
                <TracksTable 
                    tracks={tracks} 
                    deviceId={deviceId} 
                    curState={curState} 
                    player={player}
                    dispatch={dispatch}
                />
            </div>
        );
    }
}

export default LibraryArtistTopTracks;