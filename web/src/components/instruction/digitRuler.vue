<script setup>
import { computed } from 'vue';
const props = defineProps({
		rulers: Array
	}),
	list = computed(() => props.rulers?.sort() || [])
</script>

<template>
	<div
		style="
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			opacity: 0.5;
		"
	>
		<span v-for="pos in list" :key="pos" :style="{ '--pos': pos }">
			<div rule></div>
			<div
				rule-text
				:class="list.includes(pos + 1) ? 'center' : 'left'"
				v-if="pos < 32"
			>
				{{ pos }}
			</div>
			<div
				rule-text
				class="right"
				v-if="pos > 0 && !list.includes(pos - 1)"
			>
				{{ pos - 1 }}
			</div>
		</span>
	</div>
</template>

<style scoped lang="scss">
[rule],
[rule-text] {
	position: absolute;
	--x: calc(var(--pos) * var(--unit));
	--c: var(--ct-gray-dark);
}

[rule] {
	top: 0;
	bottom: 0;
	width: 1px;
	right: calc(var(--x) - 0.5px);
	background-image: linear-gradient(to bottom,
		var(--c) 12%, transparent 12%,
		transparent 20%, var(--c) 20%,
		var(--c) 32%, transparent 32%,
		transparent 40%, var(--c) 40%,
		var(--c) 52%, transparent 52%,
		transparent 60%, var(--c) 60%,
		var(--c) 72%, transparent 72%
	);
}

[rule-text] {
	top: 0;
	color: var(--c);
	font-size: 0.7em;
	font-weight: bold;
	line-height: 100%;
	padding: 0 calc(var(--unit) * 0.125);
	&.left {
		right: var(--x);
	}
	&.right {
		left: calc(100% - var(--x));
	}
	&.center {
		right: var(--x);
		width: var(--unit);
		text-align: center;
	}
}
</style>