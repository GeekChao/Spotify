import React from 'react';
import PlayListHeader from './PlayListHeader';
import TracksTable from '../Tracks/TracksTable';
import PropTypes from 'prop-types';
import './PlayList.css';

const PlayList = props => {
    const {playListInfo, playListTracks, deviceId} = props;
    return (
        <div className='PlayList'>
            <PlayListHeader playListInfo={playListInfo}/>
            <TracksTable tracks={playListTracks} deviceId={deviceId}/>
        </div>
    );
};

PlayList.propTypes = {
    playListInfo: PropTypes.object.isRequired,
    playListTracks: PropTypes.object.isRequired,
    deviceId: PropTypes.string.isRequired
};

export default PlayList;