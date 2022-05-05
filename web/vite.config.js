import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { WEB_ROOT } from './env.js'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), VitePWA()],
	publicDir: './common/public',
	resolve: {
		dedupe: ['vue'],
		alias: {
			'@': resolve(WEB_ROOT),
			'@C': resolve(WEB_ROOT, './common'),
			'@CR': resolve(WEB_ROOT, './common/res'),
			'@CL': resolve(WEB_ROOT, './common/lib'),
			'@CS': resolve(WEB_ROOT, './common/store'),
			'@CC': resolve(WEB_ROOT, './common/components'),
		},
	},
	server: {
		host: true,
		hmr: {
			// port: 443
		}
	}
})
