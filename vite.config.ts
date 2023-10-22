import { registration } from './src/modules/registration';
import handlebars from 'vite-plugin-handlebars';
import { fileURLToPath } from 'url'

export default {
  plugins: [handlebars({
    partialDirectory: './src/partials',
    context: {
      title: 'Hello, world!',
    },
  })],
  build: {
    rollupOptions: {
      input: {
        authorization: fileURLToPath(new URL('./src/pages/authorization/index.html', import.meta.url)),
        registration: fileURLToPath(new URL('./src/pages/registration/index.html', import.meta.url)),
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
    },
  },
};