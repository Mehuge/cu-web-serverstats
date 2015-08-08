module.exports = {
  type: 'component',
  path: __dirname,
  legacy: true,
  main: 'src/main.js',
  exclude: [
    'node_modules',
    'dist'
  ],
  glob: {
      js: ['src/*.js', 'src/*.jsx'],
      stylus: [ 'src/*.styl', 'src/*.css' ]
  },
  dir: {
    publish: 'dist'
  }
};
