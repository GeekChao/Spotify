import {connect} from 'react-redux';
import Browse from '../components/Browse/Browse';
import toJS from '../util/toJS';
import {getCategories, getFeaturedPlayLists, getNewReleases} from '../reducers';

const mapStateToProps = (state) => ({
    categories: getCategories(state),
    newReleases: getNewReleases(state),
    featuredPlayLists: getFeaturedPlayLists(state)
});

const BrowseContainer = connect(mapStateToProps)(toJS(Browse));

export default BrowseContainer;