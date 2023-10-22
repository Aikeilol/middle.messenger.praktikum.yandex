import handlebars from 'vite-plugin-handlebars';



export default {
  plugins: [handlebars({
    partialDirectory: './src/partials',
    context: {
      title: 'Hello, world!',
    },
  })],
};