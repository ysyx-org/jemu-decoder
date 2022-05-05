<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import navGroup from './navGroup.vue'
const
	props = defineProps({
		indent: {
			type: Number,
			default: 0
		},
		items: {
			type: Array,
			default: []
		},
		title: String,
		url: String,
		extern: {
			type: Boolean,
			default: false
		}
	}),
	emit = defineEmits(['active']),
	expand = ref(false),
	active = ref(false),
	route = useRoute()
watch(() => route.path, path => active.value = props.url == path)
watch(active, val => {
	if (val) {
		emit('active')
		expand.value = true
	}
})
onMounted(() => active.value = props.url == route.path)
</script>

<template>
	<div nav-group :style="{ '--indent': props.indent }">
		<responsive>
			<router-link
				title
				:class="active ? 'active' : ''"
				:to="props.url"
				v-if="!extern && items.length == 0"
			>
				{{ props.title || "Untitled" }}
			</router-link>
			<a
				title
				:class="active ? 'active' : ''"
				:href="props.url"
				v-else-if="items.length == 0"
			>
				{{ props.title || "Untitled" }}
			</a>
			<div
				title
				:class="active ? 'active' : ''"
				v-else
				@click="expand = !expand"
			>
				<i
					class="fas fa-caret-right"
					:style="{
						'margin-right': '0.2em',
						transform: expand ? 'rotate(90deg)' : '',
					}"
				></i>
				{{ props.title }}
			</div>
		</responsive>
		<div nav-group-items v-show="expand">
			<nav-group
				v-for="(item, i) in props.items"
				:key="i"
				:indent="props.indent + 1"
				:title="item.title"
				:url="item.url"
				:extern="item.extern || false"
				:items="item.items || []"
				@active="() => (active = true)"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
[nav-group] {
	display: block;
	width: 100%;
	font-size: 1.1rem;
	--indent-depth: calc(var(--indent) * 1.6em + 1em);
	[title] {
		display: block;
		font-family: monospace, monospace;
		// font-weight: 600;
		text-decoration: none;
		padding: 0.2em 1em 0.2em var(--indent-depth);
		cursor: pointer;
		user-select: none;
		transition: none;
		color: var(--ct-gray);
		text-decoration: none;
		&.active {
			color: var(--c-brand-light);
			font-weight: bold;
		}
		&:hover {
			background-color: var(--cf-next-level);
		}
	}
	[nav-group-items] {
		position: relative;
		&::before {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			left: calc(var(--indent-depth));
			bottom: 0.5em;
			width: 1px;
			background-color: var(--cb-gray-light);
		}
	}
}
</style>