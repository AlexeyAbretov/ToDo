/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';

export default {
  test: {
    globals: true,

    environment: 'jsdom',

    setupFiles: ['./setupVitest.js'],
  },

  define: {
    COUNTER_STEP: '1',
  },

  resolve: {
    alias: {
      '@components': [path.resolve(__dirname, './src/components')],

      '@contexts': [path.resolve(__dirname, './src/contexts')],

      '@containers': [path.resolve(__dirname, './src/containers')],

      '@constants': [path.resolve(__dirname, './src/constants')],

      '@types': [path.resolve(__dirname, './src/types/types')],

      '@store': [path.resolve(__dirname, './src/store')],

      '@theme': [path.resolve(__dirname, './src/theme')],
    },
  },
};
