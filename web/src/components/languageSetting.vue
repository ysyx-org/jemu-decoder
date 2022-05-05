<script setup>
import { locale } from '@CL/locale.js'
import { ref, watch } from 'vue';
const language = ref(locale.$.replace(/-[a-z]*/gi, ''))
watch(language, l => {
	locale.$ = l
	location.href = location.href
})
</script>

<template>
	<div
		style="
			width: 100%;
			height: 100%;
			overflow: hidden;
			display: flex;
			padding: 0.2em 0.8em;
			justify-content: space-between;
			align-items: center;
			color: var(--ct-gray);
		"
	>
		<span><locale-name :name="{ en: 'Language', zh: '语言' }" /></span>
		<select
			v-model="language"
			style="
				overflow: hidden;
				text-overflow: ellipsis;
				border: none;
				background-color: var(--cf-gray-light);
				border-radius: 0.5em;
				margin: 0 0.5em;
				font-size: 0.8rem;
				padding: 0.5em;
				color: var(--ct-gray-dark);
				line-height: 1em;
			"
		>
			<option value="zh">中文 - 简体</option>
			<option value="en">English - U.S.</option>
		</select>
	</div>
</template>