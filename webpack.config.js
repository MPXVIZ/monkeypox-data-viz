const Dotenv = require('dotenv-webpack');
const path = require('path');

// const { fileURLToPath } = require('url');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

module.exports = {
    entry: ['./src/client/index.tsx'],
    mode: 'development',
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                        },
                    },
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: `postcss-loader`,
                        options: {
                            postcssOptions: {
                                plugins: () => {
                                    autoprefixer({
                                        browsers: ['last 2 versions'],
                                    });
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new Dotenv()],
};
