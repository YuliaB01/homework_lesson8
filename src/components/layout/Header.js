import React from 'react';
import Icon from '../common/Icon';

export const Header = () => {
    return (
        <div className='header'>
            <div className='img-wrap'>
                <Icon name='apps' size='24px' color='#fff'/>
            </div>
            <span>To Do</span>
        </div>
    );
};