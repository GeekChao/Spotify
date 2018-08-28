import React from 'react';
import PropTypes from 'prop-types';
import PlayerTrackController from './PlayerTrackController';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerVolumeController from './PlayerVolumeController';
import './Player.css';

const Player = props => {
    const {curState, player} = props;
    return (
        <div className='player'>
            <PlayerTrackInfo curState={curState}/>
            <PlayerTrackController {...props}/>
            <PlayerVolumeController player={player}/>
        </div>
    );
};

Player.propTypes = {
    player: PropTypes.object.isRequired,
    curState: PropTypes.object.isRequired
};

export default Player;