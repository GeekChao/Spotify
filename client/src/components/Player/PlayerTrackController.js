import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import './PlayerTrackController.css';

const PlayerTrackController = props => {
    const {player} = props;

    const play = () => {
        player.togglePlay().then(() => {
            console.log('Toggled playback!');
          });
    };

    const forward = () => {
        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
          });
    };

    const backward = () => {
        player.previousTrack().then(() => {
            console.log('Set to previous track!');
          });
    };

    return (
        <div className='playerTrackController'>
            <div className='controller'>
                <img onClick={backward} alt='backward'/>
                <img onClick={play} alt='play'/>
                <img onClick={forward} alt='forward'/>
            </div>
            <ProgressBar />
        </div>
    );
};

PlayerTrackController.propTypes = {
    player: PropTypes.object.isRequired
};

export default PlayerTrackController;