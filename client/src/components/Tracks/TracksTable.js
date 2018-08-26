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
import {addToMySavedTracks, containsMySavedTracks, removeFromMySavedTracks} from '../../actions';

class TracksTable extends React.Component{
    static propTypes = {
        tracks: PropTypes.object.isRequired,
        deviceId: PropTypes.string.isRequired,
        curState: PropTypes.object.isRequired,
        player: PropTypes.object.isRequired,
    };

    state = {
        savedTrackIds: {},
    }

    componentDidMount(){
        const {tracks:{items}} = this.props;
        const ids = items.map(item => item.track.id);

        this.checkSavedTracks(ids);
    }

    componentWillReceiveProps(newProps){
        const {tracks:{items}} = newProps;

        if(newProps.tracks !== this.props.tracks){
            const ids = items.map(item => item.track.id);
            this.checkSavedTracks(ids);
        }
    }

    togglePlay = (uris, uri, name, trackName) => {
        const {deviceId, player} = this.props;
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
    hoverRow = id => visibility => {
        const selector = "tr[id='" + id + "'] " + ".playTrack";
        const playBtns = document.querySelectorAll(selector);
        playBtns.forEach(btn => btn.style.visibility = visibility);
    }

    toggleTrack = id => {
        const {dispatch} = this.props;
        const {savedTrackIds} = this.state;
        const fn = savedTrackIds[id] ? removeFromMySavedTracks : addToMySavedTracks;

        dispatch(fn([id]))
            .then(() => {
                this.setState(({savedTrackIds}) => ({
                    savedTrackIds: {...savedTrackIds, [`${id}`]: !savedTrackIds[id]}
                }));
            });
    };

    checkSavedTracks = ids => {
        const {dispatch} = this.props;
        ids.length && dispatch(containsMySavedTracks(ids))
            .then(({savedTrackIds}) => {
                this.setState({savedTrackIds});
            });
    }

    render(){
        const {savedTrackIds} = this.state;
        const {tracks:{items}, curState:{playing, curTrack:{trackName}}} = this.props;
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
                                    onMouseOver={evt => this.hoverRow(id)('visible')} 
                                    onMouseOut={evt => this.hoverRow(id)('hidden')}
                                >
                                    <td>
                                        <img 
                                            className='playTrack' 
                                            alt='play' 
                                            src={trackName === name && playing ? pauseImg: playImg} 
                                            onClick={evt => {this.togglePlay(uris, uri, name, trackName)}}
                                        />                   
                                        <img 
                                            className='addTrack' 
                                            alt='add' 
                                            src={savedTrackIds[id] ? checkImg : addImg}
                                            onClick={evt => this.toggleTrack(id)}
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
        
}

export default TracksTable;