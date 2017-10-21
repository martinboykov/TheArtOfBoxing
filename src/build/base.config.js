// Define this constant for easier usage
const isProd = process.env.NODE_ENV === 'production';
const processCss = isProd ? '!postcss-loader' : ''; // autoprefixer only in ENV === 'production'


const { resolve } = require('path');
const { ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    // Include source maps in development files
    devtool: isProd ? false : '#cheap-module-source-map', // source-map only in ENV === 'development'
    entry: {
        // Main entry point of our app
        app: resolve(__dirname, '..', 'app.js'),
    },
    output: {
        // built files are stored in dist
        path: resolve(__dirname, '..', '..', 'dist'),

        // In our case we serve assets directly from root
        publicPath: '/',

        // We add hash to filename to avoid caching issues
        filename: '[name].[hash].js',
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
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: `css-loader${processCss}!resolve-url-loader!sass-loader?sourceMap`
            }),
        },
        {
            test: /\.handlebars$/,
            loader: 'text-loader',
        },
        // {
        //     test: /\.(png|jpe?g|gif)(\?.*)?$/,
        //     loader: 'url-loader',
        //     options: {
        //         limit: 100,
        //         name: 'post/images/[name].[ext]'
        //     },
        // },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                  loader: 'image-webpack-loader',
                  options: {
                    bypassOnDebug: true,
                  },
                },
              ],
        },
        {
            test: /\.ico$/,
            exclude: /node_modules/,
            loader: 'file-loader',
            options: {
                name: 'images/favicon/[name].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 100,
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
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
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
