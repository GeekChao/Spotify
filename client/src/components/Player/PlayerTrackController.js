import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import './PlayerTrackController.css';
import playImg from '../../../public/images/play.png';
import forwardImg from '../../../public/images/forward.png';
import backwardImg from '../../../public/images/backward.png';
import pauseImg from '../../../public/images/pause.png';
import {PROGRESS_CONTROLLER} from '../../constants'

const PlayerTrackController = props => {
    const {player, curState:{playing, progress}} = props;

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
                <img onClick={backward} alt='backward' src={backwardImg}/>
                <img onClick={play} alt='play' src={playing ? pauseImg : playImg}/>
                <img onClick={forward} alt='forward' src={forwardImg}/>
            </div>
            <ProgressBar player={player} type={PROGRESS_CONTROLLER}/>
        </div>
    );
};

PlayerTrackController.propTypes = {
    player: PropTypes.object.isRequired,
    curState: PropTypes.object.isRequired
};

export default PlayerTrackController;