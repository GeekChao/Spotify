import React from 'react';
import PropTypes from 'prop-types';
import {playTracks} from '../../api/spotifyWebAPi';
import '../UI/header.css';
import '../UI/playBtn.css';
import { TAB_ARTISTS } from '../../constants';

const LibraryHeader = props => {
    const {uris, deviceId, path} = props;

    const play = (uris) => {
        playTracks(deviceId, uris)
            .then(() => console.log('play a track'))
            .catch(err => console.log(err));
    }

    const showPlayBtn = path === TAB_ARTISTS ? false : true;

    return (
        <div className='libraryHeader'>
            <section>
                <h1>{path.substr(1).toUpperCase()}</h1>
                {showPlayBtn && <button onClick={evt => {play(uris)}} disabled={!uris.length}>PLAY</button>}
            </section>
        </div>
    );
};

LibraryHeader.propTypes = {
    uris: PropTypes.array.isRequired,
    deviceId: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

export default LibraryHeader;