/* eslint-env node, browser */
import '@CR/global.css'
import '@CR/fa/all.min.css'
// Mount app
import { createApp } from 'vue'
import App from './src/index.vue'
import { router } from './router'
// import * as componentList from '@CL/components'
import Btn from '@CC/button.vue'
import Tri from '@CC/TriStateLink.vue'
import Badge from '@CC/badge.vue'
import Responsive from '@CC/Responsive.vue'
import Container from '@CC/Container.vue'
import LocaleName from '@CC/locale/LocaleName.vue'
import Instruction from './src/components/instruction.vue'
import ToBeEdited from './src/components/toBeEdited.vue'
const Vue = createApp(App)
	.use(router)
	// .use(createPinia())
Object
	.entries({
		Btn,
		Tri,
		Badge,
		Responsive,
		LocaleName,
		Container,
		Instruction,
		ToBeEdited
	})
	.forEach(([name, el]) => Vue.component(name, el))
Vue.mount('#app')
