import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import {
  AddInputContainer,
  LoaderContainer,
  ToDoListContainer,
} from '@containers';
import { GlobalStyles } from '@GlobalStyles';
import { AppLayout } from '@components';

import { store } from './store';
import { theme } from './theme';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppLayout>
          <AddInputContainer />
          <ToDoListContainer />
          <LoaderContainer />
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
};
