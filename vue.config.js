const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'chat-system-admin.dll',
    port: 8080,
    https: false
  },
  lintOnSave: false
})
