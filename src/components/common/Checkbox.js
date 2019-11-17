import React from 'react';
import {observer} from 'mobx-react';
import T from 'prop-types';
import {ToDoPropTypes} from '../../propTypes/toDoPropTypes';

const Checkbox = ({todo, onChange}) => {
    return <input
        type="checkbox"
        value={todo.id}
        onChange={onChange}
        checked={todo.isCompleted}
    />
};

Checkbox.propTypes = {
    todo: T.shape({...ToDoPropTypes}),
    onChange: T.func
};

export default observer(Checkbox);