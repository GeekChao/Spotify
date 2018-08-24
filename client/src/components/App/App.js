import React from 'react';
import Client from '../../Client';
import {AUTH_URL, AUTH_ERROR, INIT_APP_ERROR} from '../../constants';
import {getHashParams} from '../../util/token';
import {fetchUser, fetchUserPlaylists, setUpPlayer, removePlayer} from '../../actions';
import async from 'async';
import SideBarContainer from '../../containers/SideBarContainer';
import Main from '../Main/Main';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PlayerContainer from '../../containers/PlayerContainer';
import './App.css';
import './load.css';

class App extends React.Component{
    state = {
        loading: true,
    };

    componentWillMount(){
        const {access_token, refresh_token, error} = getHashParams();

        if(error){
            this.props.dispatch({
                type: AUTH_ERROR,
                payload: {
                    error
                }
            });
        }

        if(access_token){
            Client.setToken(access_token, refresh_token);
        }

        if(!Client.isLoggedin()){
            window.location.href = AUTH_URL;
        }
    }

    checkWindowSpotify = cb => {
        const {dispatch} = this.props;
        const timerId = setInterval(() => {
            if(window.Spotify != null){
                clearInterval(timerId);
                dispatch(setUpPlayer())
                    .then(() => {
                        cb(null);
                    })
                    .catch(err => cb(err));
            }
        }, 1000);
    };

    componentDidMount(){
        const {dispatch} = this.props;
        async.series([
            cb => {
                dispatch(fetchUser())
                    .then(() => {
                        cb(null);
                    })
                    .catch(err => cb(err));
            },
            cb => {
                dispatch(fetchUserPlaylists())
                    .then(() => {
                        cb(null);
                    })
                    .catch(err => cb(err));
            },
            cb => {
                this.checkWindowSpotify(cb);
            }
        ], (err) => {
            if(err){
                dispatch({
                    type: INIT_APP_ERROR,
                    payload: {
                        error: err
                    }
                });
            }
            this.setState({loading: false});
        });
    }

    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(removePlayer());
    }

    render(){
        if(this.state.loading) return <p className="loading">Loading…</p>;

        return(
            <div className='App'>
                <SideBarContainer />
                <Main />
                <PlayerContainer />
            </div>
        );
    }
}

export default withRouter(connect()(App));