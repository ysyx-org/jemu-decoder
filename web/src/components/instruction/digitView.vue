<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import Digit from './digit.vue';
import DigitRange from './digitRange.vue';
import DigitRuler from './digitRuler.vue';
const
	props = defineProps({
		mask: String,
		args: Object
	}),
	view = ref(null),
	width = ref(0),
	unit = computed(() => width.value / 32),
	digits = computed(() => props.mask
		.split('')
		.reverse()
		.map((d, i) => ([d, i]))
		.filter(([d]) => /^[01ZX]$/i.test(d))
	),
	ranges = computed(() => {
		const result = []
		for (const name in props.args) {
			const
				el = props.args[name],
				// bitWidth is the count of bits encoded in instructions
				// while width means the extended width
				[type, bitWidth, width] = getNumType(el)
			let n = 0
			for (const range of el.filter(r => /^\d+(:\d+)?$/.test(r))) {
				const
					[l, r = l] = range.split(':').map(s => parseInt(s)),
					w = Math.abs(l - r) + 1
				// Push to range list
				result.push({
					name,
					type,
					width,
					pos: l > r ? [l, r] : [r, l],
					vec: [bitWidth - n - 1, bitWidth - n - w]
				})
				n += w
			}
		}
		return result
	}),
	rulers = computed(() => 
		Object.values(props.args)
			.map(arr => arr
				.filter(s => /^\d+(:\d+)?$/
				.test(s))
				.map(s => {
					const [l, r = l] = s.split(':').map(s => parseInt(s))
					return l > r ? [l + 1, r] : [r + 1, l]
				})
			)
			.flat(Infinity)
			.filter((val, i, self) => self.indexOf(val) === i)
	)
function getNumType(dsc) {
	const bitWidth = dsc
		.filter(str => /^\d+(:\d+)?$/.test(str))
		.reduce((w, range) => {
			const [l, r = l] = range.split(':').map(s => parseInt(s))
			return w + Math.abs(l - r) + 1
		}, 0)
	// Check for type declaration
	for (const el of dsc) if (/^[SUF]\d+$/i.test(el)) {
		const [type, ...width] = el
		return [type.toUpperCase(), bitWidth, parseInt(width)]
	}
	// Deduct size from range array
	return [
		// Type is defaulted to unsigned
		'U', bitWidth, bitWidth
	]
}
function resize() {
	width.value = view.value?.offsetWidth || 0
}
onMounted(() => {
	resize()
	window.addEventListener(
		'resize',
		resize
	)
})
</script>

<template>
	<div
		digit-view
		:ref="(el) => (view = el)"
		:style="{ '--unit': `${unit}px` }"
	>
		<digit v-for="(el, i) in digits" :key="i" :pos="el[1]">
			{{ el[0] }}
		</digit>
		<digit-range
			v-for="(range, i) in ranges"
			:key="i"
			:name="range.name"
			:type="range.type"
			:width="range.width"
			:pos="range.pos"
			:vec="range.vec"
		/>
		<digit-ruler :rulers="[0, ...rulers, 32]" />
	</div>
</template>

<style scoped lang="scss">
[digit-view] {
	position: relative;
	height: calc(2 * var(--unit));
	font-size: calc(0.6 * var(--unit));
	--padding: calc(0.1 * var(--unit));
	--blk-top: calc(0.5 * var(--unit));
	& > * {
		position: absolute;
		:deep([content]) {
			position: absolute;
			font-family: monospace, monospace;
			text-align: center;
			top: var(--padding);
			left: var(--padding);
			right: var(--padding);
			bottom: var(--padding);
			border-radius: calc(0.1 * var(--unit));
		}
	}
	&,
	:deep(*) {
		transition: none;
	}
}
</style>