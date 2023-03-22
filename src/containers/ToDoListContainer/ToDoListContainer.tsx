/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect } from 'react';
import { List } from '@components';
import { TodoContext } from '@store';
import { Observer } from 'mobx-react-lite';

export const ToDoListContainer = () => {
  const { todoStore, popupStore } = useContext(TodoContext);

  useEffect(() => {
    todoStore.loadTodoList();
  }, [todoStore]);

  return (
    <Observer>
      {() => (
        <List
          items={todoStore.items}
          onFinish={id => {
            fetch('/api/v1/todo/finish', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id,
              }),
            }).then(() => {
              // dispatch(finish(id));
            });
          }}
          onRemove={id => {
            fetch('/api/v1/todo', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id,
              }),
            }).then(() => {
              // dispatch(remove(id));
            });
          }}
          // onRevert={id => dispatch(revert(id))}
          onEdit={id => {
            todoStore.setCurrentItem({
              ...todoStore.items.find(x => x.id === id),
            });
            popupStore.openPopup('edit');
          }}
        />
      )}
    </Observer>
  );
};
