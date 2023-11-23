const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: process.env.VUE_APP_API_PORT,
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
