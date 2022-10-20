const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack:{
    resolve:{
        alias:{
            'assets':'@/assets',
            'common':'@/common',
            'components':'@/components',
            'network':'@/network',
            'router':'@/router',
            'store':'@/store',
            'views':'@/views',
            'api':'@/api'
         }
      }
  }
})
