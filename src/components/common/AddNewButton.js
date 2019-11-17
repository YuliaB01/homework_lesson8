import React from 'react';
import Icon from './Icon';
import T from 'prop-types';

export const AddNewButton = ({text, color, onClick}) => {
    return (
        <button className="button is-link is-inverted" onClick={onClick}
                style={{backgroundColor: 'transparent'}}>
            <div className="icon">
                <Icon name='plus' size='24px' color={color}/>
            </div>
            <span>{text}</span>
        </button>
    );
};

AddNewButton.propTypes = {
    text: T.string,
    color: T.string,
    onClick: T.func.isRequired
};

AddNewButton.defaultProps = {
    text: 'Add new',
    color: '#3079cf'
};