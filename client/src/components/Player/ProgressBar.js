import React from 'react';
import initCanvas from './canvas';
import PropTypes from 'prop-types';
import {VOLUME_CANVAS_WIDTH, VOLUME_CONTROLLER, PROGRESS_CANVAS_WIDTH, PROGRESS_CONTROLLER} from '../../constants';

class ProgressBar extends React.Component {
    static propTypes = {
        player: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired
    };

    componentDidMount(){
        const {player} = this.props;
        initCanvas(player);
    }

    render(){
        const {type} = this.props;
        let width;
        if(type === VOLUME_CONTROLLER){
            width = VOLUME_CANVAS_WIDTH;
        }else if(type === PROGRESS_CONTROLLER){
            width = PROGRESS_CANVAS_WIDTH;
        }

        return (
            <canvas id='canvas' type={type} width={width} height='32px'></canvas>
        );
    }
};

export default ProgressBar;