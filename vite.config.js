/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

const path = require('path');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      // Relative to the root
      outDir: './dist',
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
        '@GlobalStyles': [path.resolve(__dirname, './src/styles/GlobalStyles')],
      },
    },
    define: {
      COUNTER_STEP: env.COUNTER_STEP,
    },
    plugins: [
      splitVendorChunkPlugin(),
      react({
        include: '**/*.{jsx,tsx}',
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
        },
      },
    },
  };
});
