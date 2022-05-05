<script setup>
const props = defineProps({ pos: Number })
</script>

<template>
	<div
		digit
		:style="{
			top: 'var(--blk-top)',
			left: `calc(${31 - props.pos} * var(--unit))`,
			right: `calc(${props.pos} * var(--unit))`,
			height: 'var(--unit)',
		}"
	>
		<div content>
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
[digit] {
	[content] {
		background-color: var(--cf-gray-light);
		border: 1px solid var(--cb-gray);
		color: var(--ct-gray);
	}
}
</style>