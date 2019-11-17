import React, {Fragment, useRef, useState} from 'react';
import {store} from '../stores/RootStore';
import {observer} from 'mobx-react';
import {Header} from './layout/Header';
import {AddNewButton} from './common/AddNewButton';
import {ToDosLayout} from './ToDos/ToDosLayout';
import GroupsList from './Groups/GroupsList';
import {ToDoInput} from './common/ToDoInput';

const App = () => {
    const [showInput, setShowInput] = useState(false);

    const groups = store.groups;
    const inputEl = useRef();
    const selectedGroup = store.groups.selectedGroup;

    const onAddNewItemClick = () => {
        setShowInput(true);
    };

    const onAdd = (value) => {
        const group = store.groups.addGroup(value);
        store.groups.toggleSelected(group);
        setShowInput(false);
    };

    return (
        <Fragment>
            <Header/>
            <div className="columns content-wrap">
                <div className="column aside">
                    {
                        groups.list.length
                            ? <GroupsList groups={groups.list}/>
                            : null
                    }
                    {showInput && <ToDoInput ref={inputEl} onAdd={onAdd} placeholder='Add new list ...'/>}
                    <AddNewButton text='New list' onClick={onAddNewItemClick}/>
                </div>
                <div className="column is-two-thirds">
                    {
                        selectedGroup.length
                            ? <ToDosLayout group={store.groups.selectedGroup[0]}/>
                            : null
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default observer(App);