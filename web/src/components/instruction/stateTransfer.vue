<script setup>
import argColor from './argColor';
const props = defineProps({
	exec: Object
})
</script>

<template>
	<container flex-column :pad="false">
		<container
			flex-row
			content-center
			v-for="(exp, target) in props.exec"
			:key="target"
			:pad="false"
			style="margin: 0.5em 0; font-family: monospace, monospace"
		>
			<badge
				:name="target"
				:type="`solid ${argColor(target)}`"
				style="
					min-width: 3em;
					text-align: center;
					margin: 0;
					font-size: 1em;
				"
				>{{ target }}</badge
			>
			<i
				class="fa fa-arrow-left"
				style="
					font-size: 0.8em;
					color: var(--ct-gray);
					margin: 0 1em;
				"
			></i>
			<span style="color: var(--ct-blue)">{{ exp }}</span>
		</container>
	</container>
</template>