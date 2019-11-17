import {flow, getRoot, types as t} from 'mobx-state-tree';
import uuid from 'uuid/v4';
import Api from '../api/Api';

export const ToDoModel = t
    .model('ToDoModel', {
        id: t.identifier,
        title: t.string,
        isCompleted: t.optional(t.boolean, false),
        isFavorite: t.optional(t.boolean, false),
        isTogglingFavorite: false,
        isTogglingFavoriteError: false,
        isTogglingCompleted: false,
        isTogglingCompletedError: false,
        isSending: false,
        isSendingError: false
    })
    .actions((store) => ({
        send: flow(function* send() {
            store.isSending = true;
            store.isSendingError = false;

            try {
                const todo = yield Api.Todos.add(store);
                store.isSending = false;

                const model = ToDoModel.create(todo);
                getRoot(store).todos.replaceItem(store.id, model);

                return model;
            } catch (error) {
                console.log(error);
                store.isSendingError = true;
                store.isSending = false;
            }
        }),

        toggleCompleted: flow(function* toggleCompleted() {
            const oldValue = store.isCompleted;

            store.isTogglingCompleted = true;
            store.isTogglingCompletedError = false;
            store.isCompleted = !store.isCompleted;

            try {
                const todo = yield Api.Todos.update(store.id, store);
                store.isTogglingCompleted = false;

                getRoot(store).todos.replaceItem(store.id, todo);
            } catch (error) {
                store.isTogglingCompletedError = true;
                store.isCompleted = oldValue;
                store.isTogglingCompleted = false;
            }
        }),

        toggleFavorite: flow(function* toggleFavorite() {
            const oldValue = store.isFavorite;

            store.isTogglingFavorite = true;
            store.isTogglingFavoriteError = false;
            store.isFavorite = !store.isFavorite;

            try {
                const todo = yield Api.Todos.update(store.id, store);
                store.isTogglingFavorite = false;

                getRoot(store).todos.replaceItem(store.id, todo);
            } catch (error) {
                console.log(error);
                store.isTogglingFavoriteError = true;
                store.isFavorite = oldValue;
                store.isTogglingFavorite = false;
            }
        })
    }));

export const ToDoListModel = t
    .model('ToDoListModel', {
        list: t.array(ToDoModel),
        isLoading: false,
        isLoadingError: false,
        isRemovingToDo: false,
        isRemovingToDoError: false
    })
    .actions(store => ({
        add: flow(function* add(title) {
            const todo = ToDoModel.create({
                id: uuid(),
                title
            });

            store.list.unshift(todo);

            return yield todo.send();
        }),

        replaceItem(id, todo) {
            const index = store.list.findIndex(item => item.id === id);

            if (index > -1) {
                store.list[index] = todo;
            }
        },

        removeTodo: flow(function* removeTodo(todo) {
            store.isRemovingToDo = true;
            store.isRemovingToDoError = false;

            try {
                yield Api.Todos.remove(todo.id);
                store.list = store.list.filter(t => t.id !== todo.id);

                store.isRemovingToDo = false
            } catch (error) {
                console.log(error);
                store.isRemovingToDoError = true;
                store.isRemovingToDo = false;
            }
        }),

        getToDos: flow(function* geToDos() {
            store.isLoading = true;
            store.isLoadingError = false;

            try {
                const todos = yield Api.Todos.getAll();
                store.list = todos;
                store.isLoading = false;
            } catch (error) {
                console.log(error);
                store.isLoadingError = true;
            } finally {
                store.isLoading = false;
            }
        })
    }));
