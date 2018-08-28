import React from 'react';
import {NavLink} from 'react-router-dom';
import {TAB_BROWSE_CATEGORIES, TAB_BROWSE_FEATURED_PLAYLISTS, TAB_BROWSE_NEW_RELEASES, TAB_BROWSE} from '../../constants';
import './browseHeader.css';
import '../UI/header.css';

const BrowseHeader = props => {
    const active = (match, {pathname}) => {
        if(pathname === TAB_BROWSE) return true;
        if(match && match.url === TAB_BROWSE_FEATURED_PLAYLISTS) return true;

        return false;
    }
    return(
        <section className='browseHeader'>
            <h1>Browse</h1>
            <ul>
                <li><NavLink to={TAB_BROWSE_CATEGORIES}>GENRES</NavLink></li>
                <li><NavLink to={TAB_BROWSE_NEW_RELEASES}>NEW RELEASES</NavLink></li>
                <li><NavLink to={TAB_BROWSE_FEATURED_PLAYLISTS} isActive={active}>FEATURED</NavLink></li>
            </ul>
        </section>
    );
};

export default BrowseHeader;