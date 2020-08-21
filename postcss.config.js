module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
        '@fullhuman/postcss-purgecss': {
          content: [
            './components/**/*.js',
            './pages/**/*.js',
            './layouts/**/*.js'
          ],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
        }
      }
      : {})
  }
};
