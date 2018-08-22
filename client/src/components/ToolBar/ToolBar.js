import React from 'react';
import PropTypes from 'prop-types';
import './ToolBar.css';

class ToolBar extends React.Component{
    state = {
        value: ''
    };

    handleChange = evt => this.setState({[`${evt.target.name}`]: evt.target.value});

    handleSearch = () => {
        const {value} = this.state;
        if(this.validate()) this.props.handleSearch(value);
        this.setState({value: ''});
    };

    validate = () => {
        if(!this.state.value) return false;
        return true;
    };

    render(){
        const {display_name, avatar_url} = this.props.user;
        const {value} = this.state;
        return(
            <div className='ToolBar'>
                <div className='search'>
                    <input type='text' name='value' value={value} placeholder='  search...' onChange={this.handleChange} />
                    <button onClick={this.handleSearch} disabled={!this.validate()}>search</button>
                </div>
                <div className='avatar'>
                    <img alt='avatar' src={avatar_url}/>
                    <span>{display_name}</span>
                </div>
            </div>
        );
    }
}

ToolBar.propTypes = {
    user: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired,
};

export default ToolBar;