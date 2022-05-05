<script setup>
import { computed } from "@vue/runtime-core";
import argColor from "./argColor";

const
	props = defineProps({
		name: String,
		type: String,
		width: Number,
		pos: Array,
		vec: Array,
	}),
	color = computed(() => argColor(props.name))
</script>

<template>
	<div
		digit-range
		:style="{
			top: 'var(--blk-top)',
			left: `calc(${31 - props.pos[0]} * var(--unit))`,
			right: `calc(${props.pos[1]} * var(--unit))`,
			height: 'var(--unit)',
		}"
	>
		<div
			content
			:style="{
				color: `var(--ct-${color})`,
				border: `1px solid var(--cf-${color})`,
				'background-color': `var(--cf-${color})`,
			}"
		>
			<b>{{ props.name }}</b>
			<span
				style="font-weight: 100; opacity: 0.8"
				v-if="props.vec[0] !== props.vec[1]"
				>[{{ props.vec.join(":") }}]</span
			>
		</div>
	</div>
</template>

<style lang="scss" scoped>
</style>