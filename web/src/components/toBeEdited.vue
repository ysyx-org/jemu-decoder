<script setup>
const
	title = {
		en: 'Description for this instruction has not been added',
		zh: '这条指令的描述还没有添加',
	},
	body = {
		en: [
			'We need your help! ',
			'You can start contributing content today, using the "edit" links below. '
		].join(''),
		zh: [
			'我们需要你的帮助! ',
			'点击页面底部的 "编辑描述文本", 即可为本条指令添加说明. '
		].join(''),
	}
</script>


<template>
	<container type="message" style="padding-left: 3em">
		<h3 style="margin: 0 0 16px 0">
			<i
				class="fas fa-exclamation-circle"
				style="margin-left: -1.6em; width: 1.6em"
			></i>
			<span><locale-name :name="title" /></span>
		</h3>
		<p style="margin: 10px 0; line-height: 160%">
			<locale-name :name="body" />
		</p>
		<container flex-row flex-wrap :pad="false">
			<btn
				href="https://github.com/ysyx-org/jemu-decoder#jemu-decoder-library"
				type="solid gray-brand"
				style="margin-left: 0"
			>
				<i class="fa fa-link"></i>&nbsp;
				<locale-name
					:name="{
						en: 'Project Codebase',
						zh: '项目代码仓库',
					}"
				/>
			</btn>
			<btn
				href="https://github.com/ysyx-org/jemu-decoder#jemu-decoder-library"
				type="solid gray-brand"
				style="margin-left: 0"
			>
				<i class="fa fa-link"></i>&nbsp;
				<locale-name
					:name="{
						en: 'How to contribute',
						zh: '如何参与编辑',
					}"
				/>
			</btn>
		</container>
	</container>
</template>