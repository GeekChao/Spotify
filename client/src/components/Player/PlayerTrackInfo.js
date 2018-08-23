import React from 'react';
import PropTypes from 'prop-types';
import './PlayerTrackInfo.css';

const PlayerTrackInfo = props => {
    const {trackName, artistsName, albumImg} = props.track;

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
                <h4>{trackName}</h4>
                <h5>{artistsName}</h5>
            </section>
        </div>
    );
};

PlayerTrackInfo.propTypes = {
    track: PropTypes.object
};

export default PlayerTrackInfo;