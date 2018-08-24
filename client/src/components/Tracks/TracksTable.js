import React from 'react';
import PropTypes from 'prop-types';
import './TracksTable.css';
import {truncateDate, truncateName} from '../../util/truncate';
import {convertMSToMin} from '../../util/convertDate';
import {playTracks} from '../../api/spotifyWebAPi';
import durationImg from '../../../public/images/duration.png';
import dateImg from '../../../public/images/date.png';
import addImg from '../../../public/images/add.png';
import checkImg from '../../../public/images/check.png';
import playImg from '../../../public/images/play.png';
import pauseImg from '../../../public/images/pause.png';

const TracksTable = props => {
    const {tracks:{items}, deviceId, curState:{playing, curTrack:{trackName}}, player} = props;

    const togglePlay = (uris, uri, name) => {
        trackName === name && playing  ? ( 
            player.pause()
            .then(() => console.log('pause a track'))
        ) : (
            playTracks(deviceId, uris, uri)
            .then(() => console.log('play a track'))
            .catch(err => console.log(err))
        );
    }
    
    /**
     * IDs beginning with a number are indeed valid in HTML 5, 
     * but #57acafcbdb4bc607922b834f is not a valid CSS selector, and document.querySelector() uses CSS selectors.
     * use attribute selector as a workaround solution
     */
    const hoverRow = id => visibility => {
        const selector = "tr[id='" + id + "'] " + ".playTrack";
        const playBtns = document.querySelectorAll(selector);
        playBtns.forEach(btn => btn.style.visibility = visibility);
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
                    <th><img alt='DATE' src={dateImg}/></th>
                    <th><img alt='DUARTAION' src={durationImg}/></th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map(({added_at, track:{id, name, artists, album, type, uri, duration_ms}}, i) => {
                        return (
                            <tr 
                                key={i} 
                                type={type} 
                                id={id} 
                                onMouseOver={evt => hoverRow(id)('visible')} 
                                onMouseOut={evt => hoverRow(id)('hidden')}
                            >
                                <td>
                                    <img 
                                        className='playTrack' 
                                        alt='play' 
                                        src={trackName === name && playing ? pauseImg: playImg} 
                                        onClick={evt => {togglePlay(uris, uri, name)}}
                                    />
                                    <img 
                                        className='addTrack' 
                                        alt='add' 
                                        src={addImg}
                                    />
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
    deviceId: PropTypes.string.isRequired,
    curState: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
};

export default TracksTable;