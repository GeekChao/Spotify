import React from 'react';
import {fetchCategories, fetchFeaturedPlayLists, fetchNewReleases} from '../../actions/browse';
import {INIT_BROWSE_ERROR, TAB_BROWSE_CATEGORIES, TAB_BROWSE_FEATURED_PLAYLISTS, TAB_BROWSE_NEW_RELEASES} from '../../constants'
import async from 'async';
import PropTypes from 'prop-types';
import '../UI/load.css';
import {Switch, Route} from 'react-router-dom';
import BrowseGallery from './BrowseGallery';
import BrowseHeader from './BrowseHeader';

class Browse extends React.Component{
    static propTypes = {
        categories: PropTypes.array.isRequired,
        newReleases: PropTypes.array.isRequired,
        featuredPlayLists: PropTypes.array.isRequired
    }

    state = {
        loading: true,
    };

    fetchApi = api => cb => {
        const {dispatch} = this.props;
        dispatch(api())
            .then(() => {
                cb(null);
            })
            .catch(err => cb(err));
    }

    componentDidMount(){
        const {dispatch} = this.props;

        this.setState({loading: true});
        async.parallel([
            cb => this.fetchApi(fetchCategories)(cb),
            cb => this.fetchApi(fetchFeaturedPlayLists)(cb),
            cb => this.fetchApi(fetchNewReleases)(cb)
        ], err => {
            if(err){
                dispatch({
                    type: INIT_BROWSE_ERROR,
                    error: err
                });
            }
            this.setState({loading: false});
        });
    }
    
    render(){
        const {categories, featuredPlayLists, newReleases} = this.props;
        if(this.state.loading) return <p className="loading">Loading…</p>;

        return (
            <div>
                <BrowseHeader />
                <Switch>
                    <Route path={TAB_BROWSE_CATEGORIES} render={() => <BrowseGallery items={categories}/>}/>
                    <Route path={TAB_BROWSE_NEW_RELEASES} render={() => <BrowseGallery items={newReleases}/>}/>
                    <Route render={() => <BrowseGallery items={featuredPlayLists}/>}/>
                </Switch>
            </div>
        );
    }
}

export default Browse;