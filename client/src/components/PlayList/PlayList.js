import React from 'react';
import PlayListHeader from './PlayListHeader';
import TracksTable from '../Tracks/TracksTable';
import PropTypes from 'prop-types';
import './PlayList.css';

const PlayList = props => {
    const {playListInfo, playListTracks, deviceId, playStatus, player} = props;
    return (
        <div className='PlayList'>
            <PlayListHeader 
                playListInfo={playListInfo} 
                tracks={playListTracks} 
                deviceId={deviceId}
            />
            <TracksTable 
                tracks={playListTracks} 
                deviceId={deviceId} 
                playStatus={playStatus} 
                player={player}
            />
        </div>
    );
};

PlayList.propTypes = {
    playListInfo: PropTypes.object.isRequired,
    playListTracks: PropTypes.object.isRequired,
    deviceId: PropTypes.string.isRequired,
    playStatus: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired
};

export default PlayList;