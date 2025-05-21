import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`@import "./src/assets/scss/iframe.scss"`
      },
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${resolve("src/assets/css/base.less")}";`,
                },
                javascriptEnabled: true,
            },
    }
  }
})
