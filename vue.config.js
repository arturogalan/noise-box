const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Noise-box: Web Guitar Amp Simulator!',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },  
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true,
      });
  },  
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`
              _  _     ___     ___     ___     ___             ___     ___   __  __  
             | \\| |   / _ \\   |_ _|   / __|   | __|    ___    | _ )   / _ \\  \\ \\/ /  
             | .| |  | (_) |   | |    \\__ \\   | _|    |___|   | _ \\  | (_) |  >  <   
             |_|\\_|   \\___/   |___|   |___/   |___|           |___/   \\___/  /_/\\_\\
             
                                                              arturo.galan@gmail.com
          `],
          notes: [],
        },
      }),
    ],
  },
  css: {
    loaderOptions: {
      scss: {
        // options here will be passed to css-loader
        prependData: `@import "@/scss/_variables.scss";`,
      },
    },
  },
};
