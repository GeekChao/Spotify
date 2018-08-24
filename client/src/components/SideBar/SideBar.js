import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideBar.css';
import * as tab from '../../constants';

const SideBar = props => {
    const {playListsInfo} = props;
    return (
        <aside className='SideBar'>
            <ul>
                <li><Link to={tab.TAB_BROWSER}>Browse</Link></li>
                <li><Link to={tab.TAB_RADIO}>Radio</Link></li>
            </ul>
            <section>
                <h3>YOUR LIBRARY</h3>
                <ul>
                    <li><Link to={tab.TAB_RECENTLY_PLAY}>Recently Played</Link></li>
                    <li><Link to={tab.TAB_SONGS}>Songs</Link></li>
                    <li><Link to={tab.TAB_ALBUMS}>Albums</Link></li>
                    <li><Link to={tab.TAB_ARTISTS}>Artists</Link></li>
                </ul>
            </section>
            <section>
                <h3>PLAYLISTS</h3>
                <ul>
                    {
                        Object.entries(playListsInfo)
                              .map(([id, {name}]) => 
                                <li key={id}>
                                    <Link to={{
                                        pathname: tab.TAB_PLAYLIST,
                                        state: {'playListId': id}
                                    }}
                                    >{name}</Link>
                                </li>
                            )        
                    }
                </ul>
            </section>
        </aside>
    );
};

SideBar.propTypes = {
    playListsInfo: PropTypes.object.isRequired,
};

export default SideBar;