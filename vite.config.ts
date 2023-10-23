import handlebars from 'vite-plugin-handlebars';
import { fileURLToPath } from 'url'
import { resolve } from 'path';

export default {
  plugins: [handlebars()],
  build: {
    rollupOptions: {
      input: {
        // authorization: fileURLToPath(new URL('./src/pages/authorization/index.html', import.meta.url)),
        // registration: fileURLToPath(new URL('./src/pages/registration/index.html', import.meta.url)),
        // main: fileURLToPath(new URL('./index.html', import.meta.url)),
        main: resolve(__dirname, 'index.html'),
        authorization: resolve(__dirname, './src/pages/authorization/index.html'),
        registration: resolve(__dirname, './src/pages/registration/index.html'),
        404: resolve(__dirname, './src/pages/404/index.html'),
        500: resolve(__dirname, './src/pages/500/index.html'),
      },
    },
  },
};