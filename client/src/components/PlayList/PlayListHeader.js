import React from 'react';
import PropTypes from 'prop-types';
import './PlayListHeader.css';
import {playTracks} from '../../api/spotifyWebAPi';

const PlayListHeader = props => {
    const {name, images, owner:{display_name}, tracks:{total}, type} = props.playListInfo;
    const hasImg = images && images[0] && images[0].url;
    const {tracks:{items}, deviceId} = props;

    const uris = items.map(item => item.track.uri);

    const play = (uris) => {
        playTracks(deviceId, uris)
            .then(() => console.log('play a track'))
            .catch(err => console.log(err));
    }

    return (
        <div className='PlayListHeader'>
            {
                hasImg &&
                <div className='playList_icon'>
                    <img alt='icon' src={images[0].url}/>
                </div>
            }
            <div className='playList_info'>
                <p>{type}</p>
                <section>
                    <h1>{name}</h1>
                    <p>Created by:{display_name} - {total} songs</p>
                </section>
                <button onClick={evt => {play(uris)}}>Play</button>
            </div>
        </div>
    );
};

PlayListHeader.propTypes = {
    playListInfo: PropTypes.object.isRequired,
    tracks: PropTypes.object.isRequired,
    deviceId: PropTypes.string.isRequired
};

export default PlayListHeader;