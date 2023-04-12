const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: "http://localhost:5001"
  },
  transpileDependencies: true
})
