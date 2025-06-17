const path = require('path');

module.exports = {
  entry: "./app/static/jay-comps/imports.js",
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app', 'static')
  }
};
