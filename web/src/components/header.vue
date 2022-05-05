<script setup>
import logo from "./logo.vue";
import Search from "./search.vue";
import ColorSchemeSwitch from "@CC/header/ColorSchemeSwitch.vue";
import { ref, watch } from "vue";
// Loading animation
const
	props = defineProps({
		loading: Boolean,
		collapse: Boolean,
		sideBar: Boolean
	}),
	emit = defineEmits(['toggle-sidebar']),
	progress = ref(false)
let timeout = undefined;
watch(
	() => props.loading,
	(now, old) => {
		if (timeout !== undefined) {
			try {
				clearTimeout(timeout);
			} catch (e) {}
			timeout = undefined;
		}
		if (now) {
			if (!progress.value) progress.value = true;
		} else {
			// Loading ends
			timeout = setTimeout(() => {
				progress.value = false;
				timeout = undefined;
			}, 200);
		}
	}
);
</script>

<template>
	<div class="header">
		<logo :collapse="props.collapse"
			><locale-name
				:name="{
					en: 'Unofficial RISC-V Manual',
					zh: 'RISC-V 指令手册 (非官方)',
				}"
		/></logo>
		<div style="flex-grow: 1"></div>
		<ColorSchemeSwitch style="margin-right: 8px" />
		<search />
		<div
			v-if="collapse"
			@click="emit('toggle-sidebar')"
			class="expand-button"
			:class="props.sideBar ? 'expand' : ''"
		>
			<i class="fas fa-bars"></i>
		</div>
		<transition name="prog">
			<div class="progress" v-if="progress"></div>
		</transition>
	</div>
</template>

<style>
:root {
	--header-height: 3.6rem;
}
</style>

<style scoped lang="scss">
.header {
	position: fixed;
	width: 100%;
	height: var(--header-height);
	top: 0;
	left: 0;
	z-index: 1000;
	/* Layout */
	padding: 0 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* Appearance */
	background-color: var(--cf);
	border-bottom: 1px solid var(--cb-gray-light);
	box-shadow: 0 0 5px 0 hsla(0, 0%, 0%, 0.1);
}

.header-placeholder {
	position: relative;
}

/* Header elements layout */
.expand-button {
	font-size: 1.2em;
	padding: 0.3em 0.6em;
	border-radius: 5px;
	margin-left: 0.5em !important;
	margin-right: -0.5em !important;
	&.expand {
		color: var(--c-brand-contrast);
		background-color: var(--c-brand-dark);
	}
}
/* Loading progress-bar */
.progress {
	position: fixed;
	z-index: 999;
	box-shadow: 0 3px 10px 0 hsla(217, 100%, 30%, 0.5);
	left: 0;
	top: var(--header-height);
	height: 3px;
	margin: 0;
	padding: 0;
	background-color: var(--c-brand-light);
	width: 90%;
	opacity: 1;
}
.prog {
	&-enter {
		&-from {
			width: 0%;
			opacity: 1;
		}
		&-active {
			transition: 2s ease-in-out;
		}
	}
	&-leave {
		&-active {
			transition: 0.3s ease-in-out;
		}
		&-to {
			width: 100%;
			opacity: 0;
		}
	}
}
</style>
