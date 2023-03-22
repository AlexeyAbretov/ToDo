/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import { AddInput } from '@components';
import { TodoContext } from '@store';
import { Observer } from 'mobx-react-lite';

export const AddInputContainer = () => {
  const { todoStore } = useContext(TodoContext);

  return (
    <Observer>
      {() => (
        <AddInput
          onAdd={value => {
            todoStore.addTodoItem(value);
          }}
        />
      )}
    </Observer>
  );
};
