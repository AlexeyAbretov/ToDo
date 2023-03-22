/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';

import { EditPopup } from '@components';
import { TodoContext } from '@store';
import { Observer } from 'mobx-react-lite';

export const EditPopupContainer: React.FC = () => {
  const { todoStore, popupStore } = useContext(TodoContext);
  return (
    <Observer>
      {() =>
        popupStore.opened.includes('edit') && (
          <EditPopup
            value={todoStore.current.title}
            onApply={text => {
              if (text) {
                todoStore.editToDoItem({
                  title: text,
                  id: todoStore.current.id,
                });
              }
            }}
            onCancel={() => {
              popupStore.closePopup('edit');
              todoStore.setCurrentItem(null);
            }}
          />
        )
      }
    </Observer>
  );
};
