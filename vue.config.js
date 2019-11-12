const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
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
