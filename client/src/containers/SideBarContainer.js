import {connect} from 'react-redux';
import SideBar from '../components/SideBar/SideBar';
import {getPlayLists} from '../reducers';
import toJS from '../util/toJS';

const mapStateToProps = (state) => ({
    playListsInfo: getPlayLists(state),
}); 

export default connect(mapStateToProps)(toJS(SideBar));