import React from 'react';
import PlayListHeader from './PlayListHeader';
import TracksTable from '../Tracks/TracksTable';
import PropTypes from 'prop-types';
import '../UI/shared.css';

const PlayList = props => {
    const {playListInfo, playListTracks, deviceId, curState, player, dispatch} = props;

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
                curState={curState} 
                player={player}
                dispatch={dispatch}
            />
        </div>
    );
};

PlayList.propTypes = {
    playListInfo: PropTypes.object.isRequired,
    playListTracks: PropTypes.object.isRequired,
    deviceId: PropTypes.string.isRequired,
    curState: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired
};

export default PlayList;