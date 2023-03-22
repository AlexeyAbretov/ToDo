/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { ThemeProvider } from 'styled-components';

import {
  AddInputContainer,
  EditPopupContainer,
  LoaderContainer,
  ToDoListContainer,
} from '@containers';
import { GlobalStyles } from '@GlobalStyles';

import styles from './App.css';

import { theme } from './theme';
import { RootStore, TodoContext } from './store';

export const App = () => {
  return (
    <TodoContext.Provider value={new RootStore()}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div className={styles.App}>
          <AddInputContainer />
          <ToDoListContainer />
          <LoaderContainer />
          <EditPopupContainer />
        </div>
      </ThemeProvider>
    </TodoContext.Provider>
  );
};
