import React from 'react';
import ToolBar from '../ToolBar/ToolBar';
import {Switch, Route} from 'react-router-dom';
import PlayListContainer from '../../containers/PlayListContainer';
import './Main.css';

class Main extends React.Component{

    render(){
        return (
            <main className='Main'>
                <ToolBar />
                <Switch>
                    <Route exact path='/' render={() => <p>Welcome</p>}/>
                    <Route path='/playlist/:playListId' component={PlayListContainer} />
                </Switch>
            </main>
        );
    }
}

export default Main;