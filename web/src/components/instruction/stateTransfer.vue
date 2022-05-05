<script setup>
const props = defineProps({
	exec: Object
})
</script>

<template>
	<container flex-column :pad="false" style="margin-bottom: 1em">
		<container
			flex-row
			content-center
			v-for="(exp, target) in props.exec"
			:key="target"
			:pad="false"
		>
			<badge :name="target" style="min-width: 2em; text-align: center">{{
				target
			}}</badge>
			<i
				class="fa fa-arrow-left"
				style="font-size: 0.8em; color: var(--ct-gray); margin: 0 0.5em"
			></i>
			<pre>{{ exp }}</pre>
		</container>
	</container>
</template>