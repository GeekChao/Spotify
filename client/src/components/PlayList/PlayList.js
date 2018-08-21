import React from 'react';
import PlayListHeader from './PlayListHeader';
import PlayListBody from './PlayListBody';
import PropTypes from 'prop-types';
import './PlayList.css';

const PlayList = props => {
    const {playListInfo, playListTracks } = props;
    return (
        <div className='PlayList'>
            <PlayListHeader playListInfo={playListInfo}/>
            <PlayListBody playListTracks={playListTracks}/>
        </div>
    );
};

PlayList.propTypes = {
    playListInfo: PropTypes.object.isRequired,
    playListTracks: PropTypes.object.isRequired
};

export default PlayList;