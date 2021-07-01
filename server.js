var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    https: true //Change this to true when testing on a server
}).listen(3000, 'localhost', function (err, result) {
    console.log(result);
    if (err) {
        return console.log(err);
    }

    console.log('Listening at https://localhost:3000/');
});
