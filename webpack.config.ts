import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type Mode = 'production' | 'development';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {

  const isDev = env.mode ?? 'development';

  const config: webpack.Configuration = {

    mode: env.mode ?? 'development',

    entry: path.resolve(__dirname, 'src', 'index.tsx'),

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true
    },

    plugins: [
      new HtmlWebpackPlugin(
        {
          template: path.resolve(__dirname, 'public', 'index.html')
        }
      ),
      new MiniCssExtractPlugin(
        {
        filename: 'css/[name].css',
        }
      ),
    ],

    module: {

      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isDev
                    ?
                    '[path][name]__[local]'
                    :
                    '[hash:base64:8]',
                },
              },
            },
            "sass-loader"
          ],
        },

        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },

        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options:
              {
                icon: true
              }
            }],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias:
      {
        '@': path.resolve(__dirname, 'src')
      }
    },

    devtool: isDev && 'inline-source-map',

    devServer:  isDev ? {
      port: env.port ?? 3000,
      open: true,
      historyApiFallback: true,
    } : undefined
  }

  return config;
}