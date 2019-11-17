import React from 'react';
import ToDoItem from './ToDoItem';
import T from 'prop-types';
import {ToDoPropTypes} from '../../propTypes/toDoPropTypes';

export const ToDosList = ({todos}) => {
    return (
        <ul className='toDoList'>
            {todos.map(todo =>
                <ToDoItem key={todo.id}
                          {...{todo}}>
                    {todo.text}
                </ToDoItem>
            )}
        </ul>
    );
};

ToDosList.propTypes = {
    todos: T.arrayOf(T.shape({...ToDoPropTypes}))
};