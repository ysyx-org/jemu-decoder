<script setup>
const props = defineProps({
	collapse: {
		type: Boolean,
		default: true
	}
});
</script>

<template>
	<div style="height: 1.4em; display: flex; align-items: center">
		<div style="height: 100%; position: relative; width: 6em">
			<img
				logo
				logo-light
				src="../../res/JsEmu.light.png"
				aria-label="JEMU LOGO"
				aria-placeholder="Js.Emu"
			/>
			<img
				logo
				logo-dark
				src="../../res/JsEmu.dark.png"
				aria-label="JEMU LOGO"
				aria-placeholder="Js.Emu"
			/>
		</div>
		<span subtitle v-if="!props.collapse"><slot /></span>
	</div>
</template>

<style scoped lang="scss">
img[logo] {
	html.dark & {
		&[logo-light] {
			opacity: 0;
		}
		&[logo-dark] {
			opacity: 1;
		}
	}
	html:not(.dark) & {
		&[logo-light] {
			opacity: 1;
		}
		&[logo-dark] {
			opacity: 0;
		}
	}
	position: absolute;
	height: 100%;
}
[subtitle] {
	font-size: 1.2em;
	font-weight: bold;
	padding: 0 0.5em;
	margin: 0 0.5em;
	color: var(--ct-gray);
	border-left: 2px solid var(--ct-gray);
	[collapse="true"] & {
		display: none;
	}
}
</style>