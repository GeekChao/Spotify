import React from 'react';
import ToolBarContainer from '../../containers/ToolBarContainer';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import PlayListContainer from '../../containers/PlayListContainer';
import SearchTracksContainer from '../../containers/SearchTracksContainer';
import {fetchSearchTracks} from '../../actions';
import {connect} from 'react-redux';
import {getDidSearch} from '../../reducers';
import './Main.css';
import PropTypes from 'prop-types';

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
                {didSearch && pathname !== '/search' && <Redirect to={'/search'}/>}
                <Switch>
                    <Route exact path='/' render={() => <p>Welcome</p>}/>
                    <Route path='/playlist' component={PlayListContainer} />
                    <Route path='/search' component={SearchTracksContainer} />
                </Switch>
            </main>
        );
    }
}

const mapStateToProps = (state) => ({
    didSearch: getDidSearch(state),
});

export default withRouter(connect(mapStateToProps)(Main));