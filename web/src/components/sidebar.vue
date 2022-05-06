<script setup>
import { ref } from 'vue'
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import index from '@/var/sidebar.index.js'
import NavGroup from './navGroup.vue'
import LanguageSetting from './languageSetting.vue'
const 
	props = defineProps({
		collapse: Boolean,
		toggle: Boolean
	}),
	emit = defineEmits(['toggle-sidebar'])
</script>

<template>
	<div sidebar-cover @click="emit('toggle-sidebar')"></div>
	<div sidebar-wrapper>
		<container sidebar-content flex-column flex-space-between :pad="false">
			<container
				sidebar-list-view
				style="
					width: 100%;
					padding: 1em 0;
					overflow-x: hidden;
					overflow-y: scroll;
				"
			>
				<nav-group
					title="HOME"
					url="/"
					@active="
						() => {
							if (props.toggle) emit('toggle-sidebar');
						}
					"
				/>
				<keep-alive>
					<nav-group
						v-for="(group, i) in index"
						:key="i"
						:title="group.title"
						:url="group.url"
						:items="group.items"
						@active="
							() => {
								if (props.toggle) emit('toggle-sidebar');
							}
						"
					/>
				</keep-alive>
			</container>
			<div
				style="
					height: 4rem;
					min-height: 4rem;
					width: 100%;
					background-color: var(--cf);
					border-top: 1px solid var(--cb-gray-light);
				"
			>
				<language-setting />
			</div>
		</container>
	</div>
</template>

<style>
:root {
	--sidebar-width: 16rem;
}
</style>

<style lang="scss" scoped>
[sidebar-wrapper],
[sidebar-cover] {
	position: absolute;
	top: var(--header-height);
	left: 0;
	bottom: 0;
}

[sidebar-cover] {
	right: 0;
	pointer-events: none;
	opacity: 0;
	background-color: #0008;
	backdrop-filter: blur(3px);
	-webkit-backdrop-filter: blur(3px);
	[expand-sidebar="true"] & {
		pointer-events: all;
		opacity: 1;
	}
}

[sidebar-wrapper] {
	width: var(--sidebar-width);
	background-color: var(--cf);
	border-right: 1px solid var(--cb-gray-light);
	[sidebar-content] {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		:deep([sidebar-list-view] > [nav-group]) {
			padding-top: 0.2em;
			padding-bottom: 0.2em;
		}
	}
	[collapse="true"][expand-sidebar="false"] & {
		transform: translateX(calc(-2px - var(--sidebar-width)));
	}
}
</style>