import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  resolve: {
    alias: {
        stream: 'stream-browserify'
    }
  },
  optimizeDeps: {
      esbuildOptions: {
          // Node.js global to browser globalThis
          define: {
              global: 'globalThis'
          },
          // Enable esbuild polyfill plugins
          plugins: [
              NodeGlobalsPolyfillPlugin({
                  buffer: true
              })
          ]
      }
  }
})


