import T from 'prop-types';
import {ToDoPropTypes} from './toDoPropTypes';

export const GroupPropTypes = {
    id: T.string.isRequired,
    title: T.string.isRequired,
    type: T.string,
    isSelected: T.bool,
    todos: T.arrayOf(T.shape({...ToDoPropTypes}))
};