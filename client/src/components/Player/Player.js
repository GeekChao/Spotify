import React from 'react';
import PropTypes from 'prop-types';
import PlayerTrackController from './PlayerTrackController';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerVolumeController from './PlayerVolumeController';

const Player = props => {
    return (
        <div>
            <PlayerTrackInfo />
            <PlayerTrackController />
            <PlayerVolumeController />
        </div>
    );
};

Player.propTypes = {
    
};

export default Player;