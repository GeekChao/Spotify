import {connect} from 'react-redux';
import TracksTable from '../components/Tracks/TracksTable';
import {getSearchTracks} from '../reducers';
import toJS from '../util/toJS';
import React from 'react';
import {clearDidSearch} from '../actions';
import {getDidSearch} from '../reducers';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

class SearchTracks extends React.Component{
    static propTypes = {
        didSearch: PropTypes.bool.isRequired
    };

    componentDidMount(){
        const {didSearch, dispatch} = this.props;
        if(didSearch) dispatch(clearDidSearch());
    }

    componentDidUpdate(){
        const {didSearch, dispatch} = this.props;
        if(didSearch) dispatch(clearDidSearch());
    }

    render(){
        const {tracks} = this.props;
        return (
            <div>
                {
                    tracks == undefined ? 
                        <Redirect to={'/'}/> :
                        <TracksTable tracks={tracks} />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tracks: getSearchTracks(state),
    didSearch: getDidSearch(state),
}); 

export default connect(mapStateToProps)(toJS(SearchTracks));