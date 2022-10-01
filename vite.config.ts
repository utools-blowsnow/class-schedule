import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [
          path.resolve(
              process.cwd(),
              './node_modules/qweather-icons/icons'
          ),
          path.resolve(process.cwd(), './src/assets/svg')
        ],
        symbolId: 'icon-[name]'
      })
  ],
})
