import React from 'react';
import PropTyeps from 'prop-types';
import './Error.css'

const Error = props => {
    const {error} = props;
        
    return (
        <div className='error'>
            {error}
        </div>
    );
}

Error.propTypes = {
    error: PropTyeps.string.isRequired
};

export default Error;