import React from 'react';
import PropTypes from 'prop-types';
import './TracksTable.css';

const truncateName = (name, len) => {
    if(name.length < len){
        return name;
    }

    return name.substr(0, len - 3).concat('...');
}

const truncateDate = date => date.substr(0, 10);

const convertMSToMin = time => {
    const sec = Math.floor(time / 1000) % 60
    const min = Math.floor(time / 1000 / 60);

    const fillZero = num => {
        if(num < 10){
            return `0${num}`;
        }

        return num;
    }

    return `${fillZero(min)}:${fillZero(sec)}`;
}

const TracksTable = props => {
    const {items} = props.tracks;
    return(
        <table className='TracksTable'>
            <thead>
                <tr>
                    <th></th>
                    <th>TITLE</th>
                    <th>ARTIST</th>
                    <th>ALBUM</th>
                    <th>DATE</th>
                    <th>DUARTAION</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map(({added_at, track:{id, name, artists, album, type, uri, duration_ms}}) => {
                        return (
                            <tr key={id} uri={uri} type={type}>
                                <td>
                                    <button>Play</button>
                                    <button>Add</button>
                                </td>
                                <td>{truncateName(name, 33)}</td>
                                <td>{artists[0].name}</td>
                                <td>{truncateName(album.name, 33)}</td>
                                <td>{truncateDate(added_at)}</td>
                                <td>{convertMSToMin(duration_ms)}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};

TracksTable.propTypes = {
    tracks: PropTypes.object.isRequired,
};

export default TracksTable;