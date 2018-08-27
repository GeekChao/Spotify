import React from 'react';
import ToolBarContainer from '../../containers/ToolBarContainer';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import PlayListContainer from '../../containers/PlayListContainer';
import SearchTracksContainer from '../../containers/SearchTracksContainer';
import LibraryContainer from '../../containers/LibraryContainer';
import LibraryGalleryContainer from '../../containers/LibraryGalleryContainer';
import BrowseContainer from '../../containers/BrowseContainer'
import LibraryArtistTopTracksContainer from '../../containers/LibraryArtistTopTracksContainer';
import {fetchSearchTracks} from '../../actions/search';
import {connect} from 'react-redux';
import {getDidSearch} from '../../reducers';
import './Main.css';
import PropTypes from 'prop-types';
import * as tab from '../../constants';

class Main extends React.Component{
    static propTypes = {
        didSearch: PropTypes.bool.isRequired,
    };

    handleSearch = (value) => {
        const {dispatch} = this.props;
        dispatch(fetchSearchTracks(value));
    }

    render(){
        const {didSearch, location:{pathname}} = this.props;
        return (
            <main className='Main'>
                <ToolBarContainer handleSearch={this.handleSearch} />
                {didSearch && pathname !== tab.TAB_SEARCH && <Redirect to={tab.TAB_SEARCH}/>}
                <Switch>
                    <Route path={`${tab.TAB_PLAYLIST}/:playListId`} component={PlayListContainer} />
                    <Route path={tab.TAB_SEARCH} component={SearchTracksContainer} />
                    <Route path={tab.TAB_RECENTLY_PLAY} component={LibraryContainer} />
                    <Route path={tab.TAB_SONGS} component={LibraryContainer} />                                  
                    <Route path={tab.TAB_ALBUMS} component={LibraryGalleryContainer} />       
                    <Route path={tab.TAB_ARTISTS_TOP_TRACKS} component={LibraryArtistTopTracksContainer} />                                                             
                    <Route path={tab.TAB_ARTISTS} component={LibraryGalleryContainer} />     
                    <Route path={tab.TAB_BROWSE} component={BrowseContainer} />    
                    <Route exact path={tab.TAB_RADIO} render={() => <Redirect to={tab.TAB_BROWSE}/>}/>                             
                    <Route exact path={tab.TAB_HOME} render={() => <Redirect to={tab.TAB_SONGS}/>}/>                             
                </Switch>
            </main>
        );
    }
}

const mapStateToProps = (state) => ({
    didSearch: getDidSearch(state),
});

export default withRouter(connect(mapStateToProps)(Main));