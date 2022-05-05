<script setup>
import { useRoute } from 'vue-router';
import DigitView from './instruction/digitView.vue';
import StateTransfer from './instruction/stateTransfer.vue';
import VarExtract from './instruction/varExtract.vue';
import decode from '@/../build/RV64G/decoder.js'
import { ref, watch, computed } from 'vue';
import { router } from '@/router';
const
	props = defineProps({
		inst: String,
		mask: String,
		args: Object,
		exec: Object,
		meta: Object,
		parse: Function
	}),
	gitBase = 'https://github.com/ysyx-org/jemu-decoder',
	code = ref(parseInstCode()),
	codeInst = computed(() => code.value == NaN ? '' : decode(code.value)),
	agree = computed(() => codeInst.value == props.inst),
	radix = ref(16)
function parseInstCode() {
	const search = location.search.replace(/^\?/, '')
	if (/^[0-9A-F]+$/i.test(search)) {
		return parseInt(search, 16)
	} else {
		return NaN
	}
}
watch(() => props.inst, parseInstCode)
router.beforeEach(() => code.value = parseInstCode())
</script>

<template>
	<container flex-column :pad="false" style="min-height: 100%">
		<container
			flex-row
			flex-wrap
			content-center
			style="font-size: 1.6rem"
			:pad="false"
		>
			<span style="color: var(--ct-gray); margin: 0.5rem 0">{{
				props.meta.type
			}}</span>
			<span
				style="
					color: var(--ct-gray);
					margin: 0.5rem 0;
					padding: 0 0.3em;
				"
				>&gt;</span
			>
			<span style="font-weight: bold">{{ props.inst }}</span>
			<span style="flex-grow: 1"></span>
			<badge style="font-size: 1rem; height: 1.6em; line-height: 100%; margin: 0">
				<span style="font-weight: lighter">encoding&nbsp;</span>
				<b>{{ props.meta.encoding }}</b>
			</badge>
		</container>
		<container
			type="warn"
			v-if="!isNaN(code) && !agree"
			style="line-height: 160%"
		>
			<p style="padding-left: 1.5em">
				<i
					class="fas fa-exclamation-circle"
					style="width: 1.5em; margin-left: -1.5em"
				></i
				>Warning: given code 0x{{ code.toString(16).padStart(8, "0") }}
				seems to be an INVALID
				<b>
					<pre style="display: inline">{{ props.inst }}</pre>
				</b>
				instruction. Variable values extracted from this code may be
				unreliable. Proceed with caution!
			</p>
			<p style="padding-left: 1.5em; opacity: 0.6">
				decoder yields [ <i>{{ codeInst || "no match" }}</i> ]
			</p>
		</container>
		<span section-title>
			<locale-name
				:name="{
					en: 'Binary Encoding Scheme',
					zh: '二进制编码格式',
				}"
			/>
		</span>
		<div style="width: 100%; overflow-x: scroll; padding: 12px 0">
			<digit-view
				style="
					width: 98%;
					margin-left: 1%;
					min-width: 720px;
					max-width: 1280px;
				"
				:mask="props.mask"
				:args="props.args"
			/>
		</div>
		<span section-title>
			<locale-name
				:name="{
					en: 'State Transfer Model',
					zh: '状态转移模型',
				}"
			/>
		</span>
		<state-transfer :exec="exec" />
		<span
			section-title
			v-if="!isNaN(code)"
			style="display: flex; justify-content: space-between"
		>
			<locale-name
				:name="{
					en: `Variables Extracted from 0x${code
						.toString(16)
						.padStart(8, 0)}`,
					zh: `从 0x${code.toString(16).padStart(8, 0)} 提取的变量`,
				}"
			/>
			<select v-model.number="radix">
				<option value="16">
					<locale-name
						:name="{ en: 'hexadecimal', zh: '十六进制' }"
					/>
				</option>
				<option value="10">
					<locale-name :name="{ en: 'decimal', zh: '十进制' }" />
				</option>
				<option value="8">
					<locale-name :name="{ en: 'octal', zh: '八进制' }" />
				</option>
				<option value="2">
					<locale-name :name="{ en: 'binary', zh: '二进制' }" />
				</option>
			</select>
		</span>
		<var-extract :args="parse(code)" :radix="radix" v-if="!isNaN(code)" />
		<span section-title
			><locale-name
				:name="{
					en: 'Behavioral Description',
					zh: '行为描述',
				}"
		/></span>
		<container style="flex-grow: 1" :pad="false" markdown-body
			><slot
		/></container>
		<span section-title>
			<container
				flex-row
				content-center
				:pad="false"
				style="color: var(--ct-gray)"
			>
				<a
					style="
						display: block;
						color: inherit;
						font-size: 1.6em;
						margin-right: 0.5em;
					"
					:href="gitBase"
					target="_blank"
				>
					<i class="fab fa-github"></i>
				</a>
				<btn
					:href="`${gitBase}/blob/master/${props.meta.fsPath}.js`"
					target="_blank"
					type="solid gray-brand"
				>
					<i class="fa fa-edit" style="line-height: 90%"></i>&nbsp;
					<locale-name :name="{ en: 'metadata', zh: '元数据' }" />
				</btn>
				<btn
					:href="`${gitBase}/blob/master/${props.meta.fsPath}.md`"
					target="_blank"
					type="solid gray-brand"
				>
					<i class="fa fa-edit" style="line-height: 90%"></i>&nbsp;
					<locale-name
						:name="{ en: 'description', zh: '描述文本' }"
					/>
				</btn>
			</container>
			<container
				flex-row
				content-center
				:pad="false"
				style="margin-top: 10px"
			>
				<locale-name
					:name="{
						en: 'Contributors',
						zh: '贡献者',
					}"
				/>:
				<badge
					v-for="(name, i) in props.meta?.contributors || []"
					:key="i"
					style="margin: 0.2em 0.4em; opacity: 0.6"
				>
					{{ name }}
				</badge>
			</container>
		</span>
	</container>
</template>

<style lang="scss" scoped>
[section-title] {
	width: 100%;
	font-weight: bold;
	color: var(--ct-gray-light);
	padding: 0.5em 0;
	margin: 0.5em 0;
	border-top: 1px solid var(--cb-gray-light);
	select {
		border: none;
		outline: 1px solid var(--cb-gray);
		font-family: monospace, monospace;
		color: var(--ct-gray);
		padding: 0.2em 0.5em;
	}
}
</style>