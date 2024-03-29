import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default ({mode}) => {
    const env = loadEnv(mode, process.cwd())
    const baseUrl = env.VITE_API
    return defineConfig({
        envPrefix: ["VITE_"],  // 需要使用的前缀
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                
            },
        },
        
        server: {
            host: "127.0.0.1",  // 项目运行的ip
            port: 80,  // 项目运行的端口
            proxy: {
                "/uploads": {
                    target: baseUrl
                },
                "/api": {
                    target: baseUrl,
                    changeOrigin: true,
                }
            }
        }
    })
}
