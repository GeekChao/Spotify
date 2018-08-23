import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import './PlayerVolumeController.css';

const PlayerVolumeController = props => {
    return (
        <div className='playerVolumeController'>
            <img alt='volume'/>
            <ProgressBar />
        </div>
    );
};

export default PlayerVolumeController;