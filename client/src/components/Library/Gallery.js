import React from 'react';
import {fetchSavedTracks} from '../../actions/library';
import PropTypes from 'prop-types';
import {TAB_ALBUMS, NAME_LIMIT_LENGTH, TAB_ARTISTS_TOP_TRACKS} from '../../constants';
import {truncateName} from '../../util/truncate';
import './gallery.css';
import {playTracks} from '../../api/spotifyWebAPi';
import LibraryHeader from './LibraryHeader';
import {Redirect} from 'react-router-dom';
import '../UI/load.css';

class Gallery extends React.Component{
    static propTypes = {
        items: PropTypes.array.isRequired,
        deviceId: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    };

    state = {
        redirect: false,
        data: {},
        loading: true
    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetchSavedTracks())
            .then(() => {
                this.setState({loading: false});
            });
    }

    componentWillReceiveProps(newProps){
        const {dispatch, path} = this.props;
        if(newProps.path !== path){
            dispatch(fetchSavedTracks())
            .then(() => {
                this.setState({loading: false});
            });
        }
    }

    play = (uris) => {
        const {deviceId} = this.props;
        playTracks(deviceId, [uris])
            .then(() => console.log('play a track'))
            .catch(err => console.log(err));
    }

    redirect = (data) => {
        this.setState({redirect: true, data});
    }

    render(){
        const {redirect, data, loading} = this.state;
        const {items, path, deviceId} = this.props;

        if(loading && items.length === 0) return <p className="loading">Loading…</p>;

        if(redirect){
            return  <Redirect to={{
                pathname: TAB_ARTISTS_TOP_TRACKS,
                state: data
            }}/>
        }

        const isAlbumTab = path === TAB_ALBUMS ? true : false;
        let classes = path === TAB_ALBUMS ? 'albums' : 'artists';
        const uris = items.map(item => item.uri);
        classes += ' media';

        return(
            <div>
                <LibraryHeader
                    uris={uris}
                    deviceId={deviceId}
                    path={path}
                />
                <div className='gallery'>
                    {
                        items.map(({albumName, icon, uri, artistName, id}, i) => (
                            <section className={classes} key={i}>
                                <header className='media-info'>
                                    {isAlbumTab && <h5>{truncateName(albumName, NAME_LIMIT_LENGTH)}</h5>}
                                    <h5>{truncateName(artistName, NAME_LIMIT_LENGTH)}</h5>
                                </header>
                                <div className='media-icon' onClick={evt => {
                                    isAlbumTab ?
                                        this.play(uri):
                                        this.redirect({icon, artistName, id})
                                }}>
                                    <img alt='icon' src={icon}/>
                                </div>
                            </section>
                        ))
                    }               
                </div>
            </div>
        );
    }
}

export default Gallery;