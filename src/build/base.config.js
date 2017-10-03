// Define this constant for easier usage
const isProd = process.env.NODE_ENV === 'production';

const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const {
    ProvidePlugin
} = require('webpack');

const config = {
    // Include source maps in development files
    // devtool: isProd ? false : '#cheap-module-source-map',

    entry: {
        // Main entry point of our app
        app: resolve(__dirname, '..', 'app.js'),
    },

    output: {
        // As mentioned before, built files are stored in dist
        path: resolve(__dirname, '..', '..', 'dist'),

        // In our case we serve assets directly from root
        publicPath: '/',

        // We add hash to filename to avoid caching issues
        filename: '[name].[hash].js',
    },

    // Automatically compile when files change.
    // watch: true, //added with CLI --hot

    //Automatically reload the page when compilation is done.
    devServer: {
        inline: true //added with CLI --inline
    },

    resolve: {
        extensions: ['*', '.js'],
        modules: [
            resolve(__dirname, '..', '..', 'node_modules'),
        ],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        }

    },

    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!sass-loader'
                }),
            },
            {
                test: /\.handlebars$/,
                loader: 'text-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.ico$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]'
                }
            },
        ],
    },

    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: 'popper.js',
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, '..', 'app.html'),
        }),
        new ExtractTextPlugin({
            filename: 'style.[hash].css',
            disable: !isProd,
        }),
    ],
};

if (!isProd) {
    config.devServer = {
        contentBase: resolve(__dirname, '..', 'static'),
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
    };
}

module.exports = config;
