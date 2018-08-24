import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import './PlayerVolumeController.css';
import volumeImg from '../../../public/images/volume.png';

const PlayerVolumeController = props => {
    return (
        <div className='playerVolumeController'>
            <img alt='volume' src={volumeImg}/>
            <ProgressBar />
        </div>
    );
};

export default PlayerVolumeController;