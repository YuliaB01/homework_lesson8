import {onSnapshot, types as t} from 'mobx-state-tree';
import {ToDoListModel} from './ToDoStore';
import {GroupListModel} from './GroupStore';
import uuid from 'uuid/v4';

export const RootStore = t
    .model('RootStore', {
        todos: t.optional(ToDoListModel, {}),
        groups: t.optional(GroupListModel, {
            list: [{
                id: uuid(),
                title: 'Important',
                type: 'predefined',
                isSelected: true
            }]
        })
    });

export const store = RootStore.create({});

store.todos.getToDos().then(response => {
    store.groups.getGroups()
        .then(_ => {})
        .catch(error => console.error(error));
}).catch(error => console.error(error));

// onSnapshot(store, (snapshot) => console.log(snapshot));
