var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
 entry: `${SRC_DIR}/index.jsx`,
 output: {
   filename: 'bundle.js',
   path: DIST_DIR
 },
 module : {
   rules : [
     {
       test : /\.jsx?/,
       include : SRC_DIR,
       loader : 'babel-loader',
       query: {
         presets: ['react', 'es2015', 'stage-3']
      }
     },
     {
       test: /\.(graphql|gql)$/,
       exclude: /node_modules/,
       loader: 'graphql-tag/loader',
     },
     {
      test: /\.(pdf|jpg|png|gif|svg|ico)$/,
      use: [
          {
              loader: 'url-loader'
          },
        ]
      },
   ]
 },
 resolve: {
  alias: {
    graphql: path.resolve('./node_modules/graphql')
  }
},
 node: {
   fs: 'empty',
   tls: 'empty'
 }
}