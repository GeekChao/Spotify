import React from 'react';
import {Iterable} from 'immutable';

const toJS = WrappedComponent => wrappedComponentProps => {
    const props = Object.entries(wrappedComponentProps)
                        .reduce((newProps, [key, value]) => {
                            newProps[key] = Iterable.isIterable(value) ? value.toJS() : value;
                            return newProps;
                        }, {});
    return <WrappedComponent {...props}/>;
};

export default toJS;