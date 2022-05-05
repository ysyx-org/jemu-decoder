<script setup>
import vHeader from './components/header.vue'
import Sidebar from './components/sidebar.vue'
import mainView from './view.vue'
import { ref } from 'vue'
import { router } from '../router'
const
	loading = ref(false),
	collapse = ref(window.innerWidth < 720),
	sideBar = ref(false)
window.addEventListener('resize', () => {
	collapse.value = window.innerWidth < 720
})
// Router loading animation
router.beforeEach((to, from, next) => {
	loading.value = true
	next()
})
router.beforeResolve((to, from, next) => {
	loading.value = false
	next()
})
</script>

<template>
	<div
		style="position: fixed; top: 0; left: 0; right: 0; bottom: 0"
		:collapse="collapse"
		:expand-sidebar="sideBar"
	>
		<v-header
			:collapse="collapse"
			:loading="loading"
			:sideBar="sideBar"
			@toggle-sidebar="sideBar = !sideBar"
		/>
		<main-view :collapse="collapse" />
		<sidebar
			:collapse="collapse"
			:toggle="sideBar"
			@toggle-sidebar="sideBar = !sideBar"
		/>
	</div>
</template>
