<script setup>
import { computed } from "vue";
import argColor from "./argColor";

const
	props = defineProps({
		name: String,
		type: String,
		width: Number,
		pos: Array,
		vec: Array,
	}),
	color = computed(() => argColor(props.name)),
	rangeWidth = computed(() => props.pos
		.slice(0, 2)
		.reduce((a, b) => a > b ? a - b : b - a)
	),
	rangeText = computed(() => {
		const [l, r = l] = props.vec
		// Single digit variable
		if (props.width <= 1 && l == 0 && r == 0) return ''
		// Range segment of one digit
		if (l == r) return `[${l}]`
		// Normal range
		return `[${l}:${r}]`
	}),
	hang = computed(() => {
		const
			textWidth = props.name.length + rangeText.value.length * 0.8,
			elWidth = rangeWidth.value * 3
		return textWidth > elWidth
	})
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
			:class="hang ? 'hang' : ''"
		>
			<div
				range
				style="font-weight: 100; opacity: 0.8 font-size: 0.8em;"
				v-if="rangeText"
			>
				{{ rangeText }}
			</div>
			<div name>{{ props.name }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
[digit-range] {
	[content] {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row-reverse;
		flex-wrap: wrap;
		[range] {
			opacity: 0.6;
			font-weight: lighter;
		}
		&.hang [range] {
			font-size: 0.8em;
			margin: 0.125em 0 0.25em 0;
		}
	}
}
</style>