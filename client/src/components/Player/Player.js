import React from 'react';
import PropTypes from 'prop-types';
import PlayerTrackController from './PlayerTrackController';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerVolumeController from './PlayerVolumeController';
import './Player.css';

const Player = props => {
    const {player, track, progress} = props;
    return (
        <div className='player'>
            <PlayerTrackInfo track={track}/>
            <PlayerTrackController player={player} progress={progress}/>
            <PlayerVolumeController player={player}/>
        </div>
    );
};

Player.propTypes = {
    player: PropTypes.object.isRequired,
    track: PropTypes.object,
    progress: PropTypes.object
};

export default Player;