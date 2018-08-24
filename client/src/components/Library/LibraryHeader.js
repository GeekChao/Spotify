import React from 'react';
import PropTypes from 'prop-types';
import {playTracks} from '../../api/spotifyWebAPi';
import './libraryHeader.css';

const LibraryHeader = props => {
    const {tracks:{items}, deviceId, path} = props;

    const uris = items.map(item => item.track.uri);

    const play = (uris) => {
        playTracks(deviceId, uris)
            .then(() => console.log('play a track'))
            .catch(err => console.log(err));
    }

    return (
        <div className='libraryHeader'>
            <section>
                <h1>{path.substr(1).toUpperCase()}</h1>
                <button onClick={evt => {play(uris)}} disabled={!uris.length}>PLAY</button>
            </section>
        </div>
    );
};

LibraryHeader.propTypes = {
    tracks: PropTypes.object.isRequired,
    deviceId: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

export default LibraryHeader;