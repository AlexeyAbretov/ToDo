/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */
import { LoadingState } from '@constants';
import { ToDoItemType, ToDoListType } from '@types';
import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';

export class PopupStore {
  opened: Array<string> = [];

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  openPopup(name: string) {
    this.opened.push(name);
  }

  closePopup(name: string) {
    this.opened = this.opened.filter(x => x !== name);
  }
}

export class TodoStore {
  items: ToDoListType = [];

  loading: LoadingState = LoadingState.Idle;

  current: ToDoItemType = null;

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  loadTodoList = async (): Promise<void> => {
    try {
      runInAction(() => {
        this.loading = LoadingState.Pending;
      });

      const response = await fetch('/api/v1/todo');

      if (response.ok) {
        const result = await response.json();

        runInAction(() => {
          this.loading = LoadingState.Success;
          this.items = result.list;
        });
      }
    } catch {
      runInAction(() => {
        this.loading = LoadingState.Fail;
      });
    }
  };

  addTodoItem = async (title: string): Promise<void> => {
    try {
      runInAction(() => {
        this.loading = LoadingState.Pending;
      });

      const response = await fetch('/api/v1/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        runInAction(() => {
          this.loading = LoadingState.Success;
          this.items = [
            ...this.items,
            {
              title,
              isFinish: false,
              id: (result as ToDoItemType).id,
            },
          ];
        });
      }
    } catch {
      runInAction(() => {
        this.loading = LoadingState.Fail;
      });
    }
  };

  editToDoItem = async ({
    title,
    id,
  }: {
    title: string;
    id: string;
  }): Promise<void> => {
    try {
      runInAction(() => {
        this.loading = LoadingState.Pending;
      });

      const response = await fetch('/api/v1/todo', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          id,
        }),
      });

      if (response.ok) {
        runInAction(() => {
          this.loading = LoadingState.Success;
          this.items = this.items.map(x => ({
            ...x,
            title: x.id === id ? title : x.title,
          }));
          this.rootStore.popupStore.closePopup('edit');
        });
      }
    } catch {
      runInAction(() => {
        this.loading = LoadingState.Fail;
      });
    }
  };

  setLoadingState(state: LoadingState) {
    this.loading = state;
  }

  setCurrentItem(item: ToDoItemType) {
    this.current = item;
  }

  get isLoading() {
    return this.loading === LoadingState.Pending;
  }
}

export class RootStore {
  popupStore: PopupStore;

  todoStore: TodoStore;

  constructor() {
    this.popupStore = new PopupStore(this);
    this.todoStore = new TodoStore(this);
  }
}

export const TodoContext = createContext<RootStore>(null);
