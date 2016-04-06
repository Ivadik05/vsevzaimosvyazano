var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// require promise polyfill for old node environment
if(typeof Promise === 'undefined') {
  require('es6-promise').polyfill();
}

var DEV = JSON.parse(process.env.BUILD_DEV || false);


var developFlag = new webpack.DefinePlugin({
  __DEV__: DEV
});

var listOfPlugins = [
    developFlag,
    new ExtractTextPlugin('app.css', {
        allChunks: true
    })
];

//uglify js if production build
var uglifierOptions = {minimize: true, mangle: {except: ['exports', 'require']}};
!DEV && listOfPlugins.push(new webpack.optimize.UglifyJsPlugin(uglifierOptions));

module.exports = {
  entry: [
      path.resolve('src', 'index.tsx')
  ],
  devtool: DEV && "inline-source-map",
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'index.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css']
  },
  plugins: listOfPlugins,
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: [
      {
        test: /\.ts(x)?$/,
        exclude: /(node_modules|__tests__)/,
        loaders: ['react-hot', 'ts-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer-loader')
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },

  tslint: {
    emitErrors: false
  },

  devServer: {
    hot: true
  }
};


