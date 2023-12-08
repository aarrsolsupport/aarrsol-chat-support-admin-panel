const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_ADMIN_PORT,
    https: false,
    client: {
      webSocketURL: {
        hostname: process.env.VUE_APP_WEBSOCKETS_SERVER,
        port: 2096,
        pathname: '',
      },
    }
  },
  lintOnSave: false
})
