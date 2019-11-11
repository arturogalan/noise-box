module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // options here will be passed to css-loader
        prependData: `@import "@/scss/_variables.scss";`
      },
      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  }
}
