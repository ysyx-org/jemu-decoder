import { createRouter, createWebHistory } from 'vue-router'
import instList from '@/var/router.index'
import { match as matchLocale } from '@CC/locale/LocaleName.vue'
import { locale } from '@CL/locale'
// Compose the router
const TITLE = 'RISC-V Manual'
/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	{
		path: '/',
		component: () => import('./src/home.vue'),
		meta: { title: TITLE },
	},
	...Object.entries(instList).map(([inst, locales]) => ({
		path: `/${inst}`,
		component: () => import(
			`./var/inst.vue/${
				inst
			}.${
				matchLocale(
					Object.fromEntries(
						locales.map(el => [el, el])
					),
					locale.$
				)
			}.vue`
		),
		meta: { title: inst }
	})),
	{
		path: '/:inst',
		meta: {
		/**
		 * @param {import('vue-router').RouteLocationNormalized} to
		 * @returns {String}
		 */
			title: 'Not Found'
		},
		component: () => import('./src/404.vue')
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes
})

router.afterEach(to => {
	let title = to?.meta?.title
	if (typeof title === 'function') title = title(to)
	if (typeof title !== 'string' || !title) title = 'Untitled'
	if (title.includes(TITLE)) {
		document.title = title
	} else {
		document.title = `${title} | ${TITLE}`
	}
})
