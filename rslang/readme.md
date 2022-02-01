1. Setup a basic React app with TypeScript and Webpack 5
2. Configure webpack and TypeScript to allow rendering of images and SVG
3. Setup webpack config for multiple environments like dev and prod
4. Add react refresh
5. Linting with ESLint
6. Code formating with Prettier
7. Husky - this do not make git commit if project have eslint bags
8. Next steps
--------------------------------------------------------------------------

1. 1. Create dir with project name, git init, .gitignore
1. 2. Create two folder 'src', 'build', add 'build' in .gitignore
1. 3. npm init --y ==> package.json
1. 4. create file 'src/index.html' --> add '<div id="root"></div>', add node_modules in .gitignore
1. 5. npm install react react-dom
1. 6. npm install -D typescript @types/react @types/react-dom
1. 7. create 'tsconfig.json'  ---> https://github.com/gopinav/React-TypeScript-Webpack-Starter/blob/master/tsconfig.json
1. 8. create files 'index.tsx', 'App.tsx'
1. 9. npm install -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript, 
      add file .babelrc
*********************
.babelrc

{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    "@babel/preset-typescript"
  ]
}
1. 10. npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin
       npm install -D babel-loader
       create dir 'webpack', file 'webpack.config.js'
*********************
'webpack.config.js'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
  ],
}
*********************
1. 11. add in file package.json
       "scripts": {
--->      "start": "webpack serve --config webpack/webpack.config.js --open",
          ...
        },

2. 1. work with css
      add file 'src/style.css'
      npm install -D css-loader style-loader
      add in 'webpack.config.js'
         {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

2. 2. work with image
      add file 'src/*.png'
      add in file App.tsx "import IMAGE from './feature.png'" ---> Error
      add file 'src/declarations.d.ts --->  "declare module '*.png'"
      add in file App.tsx     <img src={IMAGE} alt="Logo" width="300" height="200" /></>
      add rules in webpack.config.js
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },

2. 3. work with SVG and fonts
      add file *.svg
      add in file 'src/declarations.d.ts' --->  "declare module '*.svg'"
      add in file App.tsx     
        import LOGO from './tree.svg'
        <img src={LOGO} alt="Logo" width="300" /></>
      add rules in webpack.config.js
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },

3. 1. rename 'webpack.config.js' to 'webpack.common.js' - this configuration for dev and prod
      remove property 'mode: 'development','

3. 2. create three new file
      'webpack.dev.js' - dev invaroment
          module.exports = {
            mode: 'development',
            devtool: 'cheap-module-source-map',
          }

      'webpack.prod.js' - prod invaroment
          module.exports = {
            mode: 'production',
            devtool: 'source-map',
          }
      
      npm install -D webpack-merge

      'webpack.config.js' - for unit dev and prod
          const { merge } = require('webpack-merge')
          const commonConfig = require('./webpack.common.js')

          module.exports = (envVars) => {
            const { env } = envVars
            const envConfig = require(`./webpack.${env}.js`)
            const config = merge(commonConfig, envConfig)
            return config
          }

      change 'package.json'
          "scripts": {
            "start": "webpack serve --config webpack/webpack.config.js --env env=dev --open",
            "build": "webpack --config webpack/webpack.config.js --env env=prod",
            ...

4. 1.  - 

5. 1. ESLint
        npm install -D eslint
        npm install -D eslint-plugin-react eslint-plugin-react-hooks
        npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

        create file '.eslintrc.js'

        npm install -D eslint-plugin-import eslint-plugin-jsx-a11y
        npm install eslint-plugin-eslint-comments@latest --save-dev

        add 'package.json'
        "scripts": {
          ...
          "lint": "eslint --fix \"./src/**/*.{js,jsx,ts,tsx,json}\"",
          ...
        },

6. 1. install in vs code Prettier

      npm install -D prettier eslint-config-prettier eslint-plugin-prettier

      create file '.prettierrc.js'
        module.exports = {
          semi: false,
          trailingComma: 'es5',
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
          endOfLine: 'auto'
        }

      update '.eslintrc.js'
        extends: [
          ...
          'prettier/@typescript-eslint',
          'plugin:prettier/recommended',
          ...

      add 'package.json'
        "scripts": {
          ...
          "format": "prettier --write \"./src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\"",
          ...
        },

7. 1. -

8. 1. copy static assets
      npm install -D copy-webpack-plugin

      add in file 'webpack.common.js'
        plugins: [
          ...
          new CopyPlugin({
            patterns: [{ from: 'assets', to: 'assets'}],
          }),
        ],









