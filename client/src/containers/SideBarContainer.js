import {connect} from 'react-redux';
import SideBar from '../components/SideBar/SideBar';
import {getPlayLists} from '../reducers';
import toJS from '../util/toJS';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => ({
    playListsInfo: getPlayLists(state),
}); 

const SideBarContainer = connect(mapStateToProps)(toJS(SideBar));

export default withRouter(SideBarContainer);
