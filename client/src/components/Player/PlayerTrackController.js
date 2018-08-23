import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const PlayerController = props => {
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
        <div>
            <div>
                <button onClick={backward}>backward</button>
                <button onClick={play}>play</button>
                <button onClick={forward}>forward</button>
            </div>
            <ProgressBar />
        </div>
    );
};

PlayerController.propTypes = {
    player: PropTypes.object.isRequired
};

export default PlayerController;