<script setup>
import '@CR/markdown.scss'
import { computed } from 'vue';
const
	props = defineProps({
		collapse: Boolean
	}),
	style = computed(
		() => props.collapse
			? { left: 0 }
			: { left: 'var(--sidebar-width)' }
	)
</script>

<template>
	<container
		:style="{
			position: 'absolute',
			top: 'var(--header-height)',
			right: 0,
			bottom: 0,
			'overflow-x': 'hidden',
			'overflow-y': 'scroll',
			...style,
		}"
	>
		<router-view />
	</container>
</template>