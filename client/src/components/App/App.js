import React from 'react';
import Client from '../../Client';
import {AUTH_URL} from '../../constants';
import {getHashParams} from '../../util/token';
import {fetchUser, fetchUserPlaylists} from '../../actions';
import async from 'async';
import SideBarContainer from '../../containers/SideBarContainer';
import Main from '../Main/Main';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './App.css';

class App extends React.Component{

    state = {
        loading: true,
    };

    componentWillMount(){
        const {access_token, refresh_token, error} = getHashParams();

        if(error){
            alert('There was an error during the authentication'); //replace with redux action
        }

        if(access_token){
            Client.setToken(access_token, refresh_token);
        }

        if(!Client.isLoggedin()){
            window.location.href = AUTH_URL;
        }
    }

    componentDidMount(){
        const {dispatch} = this.props;
        async.series([
            cb => {
                dispatch(fetchUser())
                    .then(() => {
                        cb(null);
                    });
            },
            cb => {
                dispatch(fetchUserPlaylists())
                    .then(() => {
                        cb(null);
                    });
            }
        ], (err) => {
            if(err){

            }
            this.setState({loading: false});
        });
    }

    render(){
        if(this.state.loading) return <p>Loading....</p>;

        return(
            <div className='App'>
                <SideBarContainer />
                <Main />
            </div>
        );
    }
}

export default withRouter(connect()(App));