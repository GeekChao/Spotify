import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const PlayerController = props => {
    return (
        <div>
            <div>
                <img alt='forward' src={}/>
                <img alt='play' src={}/>
                <img alt='backward' src={}/>
            </div>
            <ProgressBar />
        </div>
    );
};

PlayerController.propTypes = {

};

export default PlayerController;