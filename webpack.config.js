const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: ['./src/client/index.js'],
    mode: 'development',
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [new Dotenv()],
};
