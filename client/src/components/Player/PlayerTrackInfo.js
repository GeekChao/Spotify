import React from 'react';
import PropTypes from 'prop-types';
import './PlayerTrackInfo.css';
import {truncateName} from '../../util/truncate';

const PlayerTrackInfo = props => {
    const {trackName, artistsName, albumImg} = props.curState.curTrack;

    if(!trackName){
        return (
            <div className='playerTrackInfo'></div>
        );
    }

    return(
        <div className='playerTrackInfo'>
            <div className='icon'>
                <img alt='icon' src={albumImg && albumImg[1] && albumImg[1].url}/>
            </div>   
            <section className='info'>
                <h4>{truncateName(trackName, 25)}</h4>
                <h5>{truncateName(artistsName, 25)}</h5>
            </section>
        </div>
    );
};

PlayerTrackInfo.propTypes = {
    curState: PropTypes.object.isRequired
};

export default PlayerTrackInfo;