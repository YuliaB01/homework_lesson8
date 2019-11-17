import React from 'react';
import Checkbox from '../common/Checkbox';
import Icon from '../common/Icon';
import {observer} from 'mobx-react';
import {store} from '../../stores/RootStore';
import {ToDoPropTypes} from '../../propTypes/toDoPropTypes';
import T from 'prop-types';

const ToDoItem = ({todo}) => {
    const onChange = async () => {
        await todo.toggleCompleted();
    };

    const onStarClick = async () => {
        await todo.toggleFavorite();

        const importantList = store.groups.list.find(group => group.type === 'predefined');

        if (todo.isFavorite) {
            await importantList.addTodo(todo);
        } else {
            importantList.removeTodo(todo);

            store.groups.list.forEach(group => {
                if(group.type === 'predefined') {
                    return false;
                }
                const index = group.todos.findIndex(t => t.id === todo.id);

                if(index > -1) {
                    return false;
                } else {
                    store.todos.removeTodo(todo);
                }
            })
        }
    };

    return !!todo && (
        <li className='toDoItem'>
            <Checkbox todo={todo} onChange={onChange}/>
            <div className={todo.isCompleted ? 'isCompleted text-wrap' : 'text-wrap'}>
                {todo.title}
            </div>
            <div className="icon-wrap">
                <Icon name='star' size='18px'
                      color={todo.isFavorite ? '#3e69e4' : '#ccc'}
                      onClick={onStarClick}
                />
            </div>
        </li>
    );
};
ToDoItem.propTypes = {
    todo: T.shape({...ToDoPropTypes})
};

export default observer(ToDoItem);