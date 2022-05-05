<script setup>
import Logo from './components/logo.vue'
const
	metaKey = (navigator.platform.indexOf("Mac") === 0 || navigator.platform === "iPhone")
		? '⌘'
		: 'ctrl'
</script>

<template>
	<container
		flex-column
		content-center
		style="min-height: 100%; color: var(--ct-gray);"
		:pad="false"
	>
		<container
			flex-column
			flex-center
			content-center
			style="flex-grow: 1; text-align: center"
			:pad="false"
		>
			<logo
				style="
					text-align: left;
					font-size: 2.4em;
					filter: saturate(0) contrast(0);
				"
			/>
			<h1
				style="
					color: inherit;
					padding: 20px 0;
					margin-bottom: 15px;
					border-bottom: 1px solid var(--cb-gray);
				"
			>
				<locale-name
					:name="{
						en: 'RISC-V ISA Manual',
						zh: 'RISC-V 指令集手册',
					}"
				/><sup> *</sup>
			</h1>
			<span style="color: var(--ct-gray-light)">
				<locale-name
					:name="{
						en: `Press ${metaKey}-F to search instructions, or use the side bar to find an instruction.`,
						zh: `按下 ${metaKey}-F 搜索指令, 或在侧边栏中查找指令`,
					}"
				/>
			</span>
			<span style="margin-top: 10px; color: var(--ct-gray-light)">
				<pre style="display: inline; padding-right: 0.3em">*</pre>
				<locale-name
					:name="{
						en: `Unofficial version, maintained by JEMU project.`,
						zh: `非官方版本, 由 JEMU 项目维护`,
					}"
				/>
			</span>
		</container>
		<container
			flex-row
			flex-wrap
			flex-center
			content-center
			:pad="false"
			style="opacity: 0.6"
		>
			<a
				style="
					display: flex;
					align-items: center;
					color: inherit;
					padding: 0.5em;
					text-decoration: none;
				"
				href="https://github.com/ysyx-org/jemu-decoder"
				target="_blank"
			>
				<i
					class="fab fa-github"
					style="font-size: 1.6em; margin-right: 0.3em"
				></i>
				<b
					><locale-name :name="{ en: 'Git REPO', zh: 'Git 仓库' }"
				/></b>
			</a>
			<div
				style="
					margin: 0 0.5em;
					height: 2em;
					width: 2px;
					background-color: var(--cb-gray);
				"
			></div>
			<a
				style="
					display: flex;
					align-items: center;
					color: inherit;
					padding: 0.5em;
					text-decoration: none;
				"
				href="https://github.com/ysyx-org/jemu-decoder"
				target="_blank"
			>
				<i
					class="fas fa-paper-plane"
					style="font-size: 1.4em; margin-right: 0.4em"
				></i>
				<b
					><locale-name :name="{ en: 'Contribute', zh: '参与编写' }"
				/></b>
			</a>
		</container>
	</container>
</template>