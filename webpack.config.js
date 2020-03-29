const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    devtool: 'source-map',
    entry: ['./project/resources/assets/scripts/main.js',
        './project/resources/assets/styles/main.scss'
    ],
    output: {
        filename: './scripts/[contenthash].bundle.js',
        sourceMapFilename: './[file].map',
        path: path.resolve(__dirname, './project/dist/'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader?-url',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer'),
                                    require('cssnano')({
                                        discardComments: {
                                            removeAll: true
                                        }
                                    })
                                ];
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './styles/[contenthash].bundle.css',
        })
    ],
};