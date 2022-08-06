import Dotenv from 'dotenv-webpack';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: ['./client/index.js'],
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
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
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
