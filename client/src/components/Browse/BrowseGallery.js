import React from 'react';
import PropTypes from 'prop-types';
import '../UI/gallery.css';

const BrowseGallery = props => {
    const {items} = props;
    return(
        <div className='browseGallery'>
            {
                items.map(({icon}, i) => (
                    <div key={i}>
                        <img alt='icon' src={icon}/>
                    </div>
                ))
            }
        </div>
    );
};

BrowseGallery.propTypes = {
    items: PropTypes.array.isRequired
};

export default BrowseGallery;