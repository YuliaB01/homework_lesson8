import {flow, getRoot, types as t} from 'mobx-state-tree';
import {ToDoModel} from './ToDoStore';
import uuid from 'uuid/v4';
import Api from '../api/Api';

export const GroupModel = t
    .model('GroupModel', {
        id: t.string,
        title: t.string,
        type: 'user-defined',
        todos: t.array(t.reference(ToDoModel)),
        isSelected: t.optional(t.boolean, false),
        isSending: false,
        isSendingError: false,
        isToDoSending: false,
        isToDoSendingError: false
    })
    .actions(store => ({
        send: flow(function* send() {
            store.isSending = true;
            store.isSendingError = false;

            try {
                const group = yield Api.Groups.add(store);
                group.isSending = false;

                getRoot(store).groups.replaceGroup(store.id, group);
            } catch (err) {
                console.log(err);
                store.isSendingError = true;
                store.isSending = false;
            }
        }),

        sendToDo: flow(function* sendToDo(todo) {
            store.isToDoSending = true;
            store.isToDoSendingError = false;

            try {
                yield Api.Groups.addTodo(store.id, todo);

                store.isToDoSending = false;
            } catch (err) {
                store.isToDoSendingError = true;
                store.isToDoSending = false;
                console.error(err);
            }
        }),

        addTodo: flow(function* addTodo(todo) {
            store.todos.push(todo);

            yield store.sendToDo(todo);
        }),

        removeTodo(todo) {
            store.todos = store.todos.filter(_todo => _todo.id !== todo.id);
        }
    }));

export const GroupListModel = t
    .model('GroupListModel', {
        list: t.array(GroupModel),
        isLoading: false,
        isLoadingError: false
    })
    .views(store => ({
        get selectedGroup() {
            return store.list.filter(group => group.isSelected);
        }
    }))
    .actions(store => ({
        addGroup: flow(function* addGroup(title) {

            const group = GroupModel.create({
                id: uuid(),
                title
            });

            store.list.push(group);

            yield group.send();

            return group;
        }),

        toggleSelected(group) {
            store.list.forEach(_group => {
                _group.isSelected = group.id === _group.id;
            });
        },

        replaceGroup(id, group) {
            const index = store.list.findIndex(g => g.id === id);

            if (index > -1) {
                store.list[index] = {...group, isSelected: true};
            }
        },

        getGroups: flow(function* getGroups() {
            store.isLoading = true;
            store.isoadingError = false;

            try {
                const groups = yield Api.Groups.getAll();

                groups.reverse().forEach(group => {
                    store.list.push(group);
                });

                const importantList = store.list.filter(group => group.type === 'predefined');
                importantList[0].todos = getRoot(store).todos.list.filter(todo => todo.isFavorite && todo);

                store.isLoading = false;
            } catch (err) {
                console.error(err);
                store.isLoadingError = true;
                store.isLoading = false;
            }
        })
    }));