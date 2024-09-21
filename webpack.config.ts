import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

//указываем какой может иметь тип Mode
type Mode = 'production' | 'development';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {

  //передаем значение чтобы отображать некоторые элементы только в определенном моде
  const isDev = env.mode ?? 'development';

  const config: webpack.Configuration = {
    //отвечает за то в каком виде будет выводится контент, для разработки или продакшена
    mode: env.mode ?? 'development',

    // входные точки, обычно одна (__dirname текущая папка в которой запущен проект)
    entry: path.resolve(__dirname, 'src', 'index.tsx'),

    // куда будут выгружаться файлы, clean: true очищает папку перед тем как вложить туда новые файлы
    // [name] текущее имя файла, если прописать [name].[contenthash].js файл будет создавать рандомное доп имя
    // хеш будет меняться только при изменении внутренних изменений файла
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

      // указываются loaders в необходимом поярдке
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  //указываем как будет отображаться имя
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
      //ts-loader умеет обрабатывать JSX без него нужен babel
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      // обработка изображений
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

    //отслеживание карт для помощи отлова ощибок
    devtool: isDev && 'inline-source-map',

    // открытие сервера через терминал при вызове npm start можно указать порт вручную -- --env port=5000
    devServer:  isDev ? {
      port: env.port ?? 3000,
      open: true,
      //работает только для dev сервера
      historyApiFallback: true,
    } : undefined
  }

  return config;
}