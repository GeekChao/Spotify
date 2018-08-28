import {connect} from 'react-redux';
import Error from '../components/ToolBar/Error';
import toJS from '../util/toJS';
import {getErrorMsg} from '../reducers';

const mapStateToProps = state => ({
    error: getErrorMsg(state)
});

export default connect(mapStateToProps)(toJS(Error));