import React from 'react';
import PropTypes from 'prop-types';
import './TracksTable.css';
import {truncateDate, truncateName} from '../../util/truncate';
import {convertMSToMin} from '../../util/convertDate';
import {playTracks} from '../../api/spotifyWebAPi';

const TracksTable = props => {
    const {tracks:{items}, deviceId} = props;

    const play = (uris, uri) => {
        playTracks(deviceId, uris, uri)
            .then(() => console.log('play a track'))
            .catch(err => console.log(err));
    }

    const uris = items.map(item => item.track.uri);

    return(
        <table className='TracksTable'>
            <thead>
                <tr>
                    <th></th>
                    <th>TITLE</th>
                    <th>ARTIST</th>
                    <th>ALBUM</th>
                    <th>DATE</th>
                    <th>DUARTAION</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map(({added_at, track:{id, name, artists, album, type, uri, duration_ms}}) => {
                        return (
                            <tr key={id} type={type}>
                                <td>
                                    <button onClick={evt => {play(uris, uri)}}>Play</button>
                                    <button>Add</button>
                                </td>
                                <td>{truncateName(name, 33)}</td>
                                <td>{artists[0].name}</td>
                                <td>{truncateName(album.name, 33)}</td>
                                <td>{truncateDate(added_at)}</td>
                                <td>{convertMSToMin(duration_ms)}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};

TracksTable.propTypes = {
    tracks: PropTypes.object.isRequired,
};

export default TracksTable;