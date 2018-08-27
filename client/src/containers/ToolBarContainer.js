import {connect} from 'react-redux';
import ToolBar from '../components/ToolBar/ToolBar';
import toJS from '../util/toJS';
import {getCurUser} from '../reducers'

const mapStateToProps = (state, {handleSearch}) => ({
    user: getCurUser(state),
    handleSearch,
});

const ToolBarContainer = connect(mapStateToProps)(toJS(ToolBar));

export default ToolBarContainer;