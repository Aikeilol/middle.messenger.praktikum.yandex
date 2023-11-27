import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default {
  plugins: [handlebars()],
  root: resolve(__dirname),
  appType: 'spa',
  build: {
    outDir: resolve(__dirname, 'dist')
  },
  server: {
    port: 3000
  }
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       authorization: resolve(__dirname, './src/pages/authorization/index.html'),
  //       account: resolve(__dirname, './src/pages/account/index.html'),
  //       registration: resolve(__dirname, './src/pages/registration/index.html'),
  //       chat: resolve(__dirname, './src/pages/chat/index.html'),
  //       404: resolve(__dirname, './src/pages/404/index.html'),
  //       500: resolve(__dirname, './src/pages/500/index.html'),
  //     },
  //   },
  // },
};
