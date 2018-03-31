const webpack = require('webpack');

module.exports = {
  plugins: {
      'autoprefixer': { browsers: 'last 2 versions' },
      'cssnano': {
        safe: true,
        sourcemap: true,
        autoprefixer: false
      },
      'postcss-import': {
        addDependencyTo: webpack
      },
      'postcss-cssnext': {}
  }
}
