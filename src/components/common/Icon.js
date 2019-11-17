import React from 'react';
import {iconsConfig} from '../../configs/iconsConfig';
import T from 'prop-types';

const Icon = ({name, ...props}) => {
    const IconComponent = iconsConfig[name];
    return <IconComponent {...props}/>
};

Icon.propTypes = {
    name: T.string.isRequired,
    size: T.string.isRequired,
    color: T.string
};

Icon.defaultProps = {
    size: '14px',
    color: '#000'
};

export default Icon;