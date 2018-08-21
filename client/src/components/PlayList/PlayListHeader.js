import React from 'react';
import PropTypes from 'prop-types';
import './PlayListHeader.css';

const PlayListHeader = props => {
    const {name, images, owner:{display_name}, tracks:{total}, type} = props.playListInfo;
    const hasImg = images && images[0] && images[0].url;
    return (
        <div className='PlayListHeader'>
            {
                hasImg &&
                <div className='playList_icon'>
                    <img alt='icon' src={images[0].url}/>
                </div>
            }
            <div className='playList_info'>
                <p>{type}</p>
                <section>
                    <h1>{name}</h1>
                    <p>Created by:{display_name} - {total} songs</p>
                </section>
                <button>PLAY</button>
            </div>
        </div>
    );
};

PlayListHeader.propTypes = {
    playListInfo: PropTypes.object.isRequired
};

export default PlayListHeader;