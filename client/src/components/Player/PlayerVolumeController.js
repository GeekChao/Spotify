import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import './PlayerVolumeController.css';
import volumeImg from '../../../public/images/volume.png';
import {VOLUME_CONTROLLER} from '../../constants';

const PlayerVolumeController = props => {
    const {player} = props;
    return (
        <div className='playerVolumeController'>
            <img alt='volume' src={volumeImg}/>
            <ProgressBar player={player} type={VOLUME_CONTROLLER}/>
        </div>
    );
};

PlayerVolumeController.propTypes = {
    player: PropTypes.object.isRequired
};

export default PlayerVolumeController;