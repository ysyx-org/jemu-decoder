<script setup>
import { computed } from 'vue';
import argColor from './argColor';
const props = defineProps({ args: Object, radix: Number }),
	radixSuffix = computed(() => ({
		2: '0b',
		8: '0o',
		16: '0x'
	}[props.radix]) || '')
</script>

<template>
	<container :pad="false" var-extract>
		<div v-for="(val, arg) in args" :key="arg" style="margin: 0.5em 0">
			<badge :type="`solid ${argColor(arg)}`" arg-name>
				{{ arg }}
			</badge>
			<span arg-value>
				=
				<span style="opacity: 0.5; padding-right: 0.1em;">{{
					radixSuffix
				}}</span
				><span style="font-weight: bold">{{
					val.toString(radix)
				}}</span>
			</span>
		</div>
	</container>
</template>

<style scoped lang="scss">
[var-extract] {
	font-family: monospace, monospace;
	[arg-name] {
		min-width: 3em;
		text-align: center;
		padding: 0.4em;
		margin: 0;
	}
	[arg-value] {
		color: var(--ct-gray);
	}
}
</style>