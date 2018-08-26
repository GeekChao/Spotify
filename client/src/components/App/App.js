import React from 'react';
import Client from '../../Client';
import {AUTH_URL, AUTH_ERROR, INIT_APP_ERROR} from '../../constants';
import {getHashParams} from '../../util/token';
import {fetchUserPlaylists} from '../../actions/playList';
import {fetchUser} from '../../actions';
import {setUpPlayer, removePlayer} from '../../actions/player';
import async from 'async';
import SideBarContainer from '../../containers/SideBarContainer';
import Main from '../Main/Main';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PlayerContainer from '../../containers/PlayerContainer';
import './App.css';
import '../UI/load.css';

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
        const timerId = setInterval(() => {
            if(window.Spotify != null){
                clearInterval(timerId);
                this.fetchApi(setUpPlayer)(cb);
            }
        }, 1000);
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
        async.series([
            cb => {
                this.fetchApi(fetchUser)(cb);
            },
            cb => {
                this.fetchApi(fetchUserPlaylists)(cb);
            },
            cb => {
                this.checkWindowSpotify(cb);
            },
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