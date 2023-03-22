/* eslint-disable import/no-extraneous-dependencies */
import { Loader } from '@components';
import { TodoContext } from '@store';
import { Observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

export const LoaderContainer = () => {
  const { todoStore } = useContext(TodoContext);

  return <Observer>{() => todoStore.isLoading && <Loader />}</Observer>;
};
