import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideBar.css';

const SideBar = props => {
    const {playListsInfo} = props;
    return (
        <aside className='SideBar'>
            <ul>
                <li><Link to='/browse'>Browse</Link></li>
                <li><Link to='/radio'>Radio</Link></li>
            </ul>
            <section>
                <h3>YOUR LIBRARY</h3>
                <ul>
                    <li><Link to='/recently_played'>Recently Played</Link></li>
                    <li><Link to='/tracks'>Songs</Link></li>
                    <li><Link to='/albums'>Albums</Link></li>
                    <li><Link to='/artists'>Artists</Link></li>
                </ul>
            </section>
            <section>
                <h3>PLAYLISTS</h3>
                <ul>
                    {
                        Object.entries(playListsInfo)
                              .map(([id, {name}]) => 
                                <li key={id}><Link to={`/playList/${id}`}>{name}</Link></li>
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