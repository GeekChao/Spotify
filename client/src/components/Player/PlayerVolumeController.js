import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const PlayerVolumeController = props => {
    return (
        <div>
            <img alt='volume' />
            <ProgressBar />
        </div>
    );
};

export default PlayerVolumeController;