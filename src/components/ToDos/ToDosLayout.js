import React, {Fragment} from 'react';
import {ToDosList} from './ToDosList';
import {ToDoInput} from '../common/ToDoInput';
import {store} from '../../stores/RootStore';
import T from 'prop-types';
import {GroupPropTypes} from '../../propTypes/groupPropTypes';

export const ToDosLayout = ({group}) => {
    const onAdd = async (value) => {
        const todo = await store.todos.add(value);

        if (group.type === 'predefined') {
            await todo.toggleFavorite();
            await group.addTodo(todo);
        } else {
            await group.addTodo(todo);
        }
    };

    return (
        <Fragment>
            <h3 className="groupName">{group.title}</h3>
            {!!group.todos.length ? <ToDosList todos={group.todos}/> : null}
            <ToDoInput onAdd={onAdd} placeholder='Add new todo...'/>
        </Fragment>
    );
};

ToDosLayout.propTypes = {
    group: T.shape({...GroupPropTypes})
};