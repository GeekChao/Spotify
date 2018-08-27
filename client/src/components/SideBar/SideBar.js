import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideBar.css';
import * as tab from '../../constants';

const SideBar = props => {
    const {playListsInfo} = props;
    return (
        <aside className='SideBar'>
            <ul>
                <li><NavLink to={tab.TAB_BROWSE}>Browse</NavLink></li>
                <li><NavLink to={tab.TAB_RADIO}>Radio</NavLink></li>
            </ul>
            <section>
                <h5>YOUR LIBRARY</h5>
                <ul>
                    <li><NavLink to={tab.TAB_RECENTLY_PLAY}>Recently Played</NavLink></li>
                    <li><NavLink to={tab.TAB_SONGS}>Songs</NavLink></li>
                    <li><NavLink to={tab.TAB_ALBUMS}>Albums</NavLink></li>
                    <li><NavLink to={tab.TAB_ARTISTS}>Artists</NavLink></li>
                </ul>
            </section>
            <section>
                <h5>PLAYLISTS</h5>
                <ul>
                    {
                        Object.entries(playListsInfo)
                              .map(([id, {name}]) => 
                                <li key={id}>
                                    <NavLink to={`${tab.TAB_PLAYLIST}/${id}`}>
                                        {name}
                                    </NavLink>
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