<script setup>
import { ref, watch, computed } from 'vue'
import decode from '@/../build/RV64G/decoder.js'
import searchIndex from '@/var/search.index.js'
import { router } from '@/router';
const
	props = defineProps({
		collapse: Boolean
	}),
	input = ref(null),
	toggle = ref(false),
	focus = ref(0),
	placeHolder = (navigator.platform.indexOf("Mac") === 0 || navigator.platform === "iPhone")
		? '⌘'
		: 'ctrl',
	searchString = ref(''),
	searchResult = ref([])
function log(...arg) { console.log(...arg) }
// Watch for search string update
watch(searchString, str => {
	const result = []
	// Reset focus to the start of result list
	focus.value = 0
	// Directly return empty array if searchString is empty
	if (!str || typeof str !== 'string') return searchResult.value = []
	// Check if searchString is formatted as a 'solid' number
	if (/^(0x[0-9a-fA-F]+)|(0o[0-7]+)|(0b[01]+)$/.test(str)) {
		// Run decoder and return the result (skip other searches)
		result.push(...codeMatch(parseInt(str)))
		// Return directly
		return searchResult.value = result
	}
	// Search in instruction names
	result.push(...nameMatch(str))
	// Try interpret the string as a hex value
	if (/^[0-9a-f]+$/i.test(str)) {
		result.unshift(...codeMatch(parseInt(str, 16)))
	}
	searchResult.value = result
})
// Watch for search prompt toggle
watch(toggle, tog => {
	if (tog) setTimeout(() => {
		const el = input.value
		if (el) el.focus()
	}, 10);
})
// Close search prompt upon navigation
router.beforeEach(() => {
	if (toggle.value) toggle.value = false}
)
// Listen for keyboard shortcuts (ctrl-f | cmd-f)
window.addEventListener(
	'keydown',
	e => {
		const { ctrlKey, metaKey, key } = e
		if ((ctrlKey || metaKey) && key === 'f') {
			e.preventDefault()
			toggle.value = true
		} else if (/^escape$/i.test(key) && toggle.value) {
			e.preventDefault()
			toggle.value = false
		}
	}
);
// Input key event handler
function normalize(i, l = searchResult.value.length) {
	while (i < 0) i += l
	return i % l
}
function handleKey(e) {
	const { key } = e
	if (/^Enter$/i.test(key)) {
		e.preventDefault()
		const { url } = searchResult.value[focus.value]
		if (url && typeof url === 'string')
			router.push(router.resolve(url))
	} else if (/^ArrowDown$/i.test(key)) {
		e.preventDefault()
		focus.value = normalize(focus.value + 1)
	} else if (/^ArrowUp$/i.test(key)) {
		e.preventDefault()
		focus.value = normalize(focus.value - 1)
	}
}
</script>

<template>
	<div search-wrapper>
		<div search-btn v-if="!props.collapse" @click="toggle = true">
			<i
				class="fa fa-search"
				style="
					margin-right: 0.5em;
					padding: 0 0.5em 0 0.1em;
					border-right: 1px solid var(--ct);
				"
			></i>
			<span v-if="searchString">{{ searchString }}</span>
			<span v-else style="opacity: 0.5; font-weight: bold"
				>{{ placeHolder }} f</span
			>
		</div>
		<div search-prompt-cover v-if="toggle" @click="toggle = false"></div>
		<div search-prompt v-if="toggle">
			<div search-prompt-content>
				<div search-input>
					<div icon><i class="fa fa-search"></i></div>
					<input
						v-model.trim="searchString"
						:ref="(el) => (input = el)"
						@focus="
							({ target }) =>
								target.setSelectionRange(0, target.value.length)
						"
						tabindex="0"
						@keydown="handleKey"
					/>
					<responsive
						icon
						@click="
							() => {
								searchString = '';
								toggle = false;
							}
						"
					>
						<i
							class="fa fa-times"
							style="
								display: block;
								border-radius: 1em;
								background-color: var(--ct-gray-light);
								color: var(--cf);
								transform: scale(0.6);
							"
						></i>
					</responsive>
				</div>
				<div search-result v-if="searchResult.length">
					<div
						search-result-entry
						v-for="(result, i) in searchResult"
						:key="`${i}:${result.inst}`"
						@click="(e) => e.target.childNode[0]?.click()"
						@mouseenter="() => (focus = i)"
						@mousemove="() => (focus = i)"
						@touchmove="() => (focus = i)"
					>
						<router-link
							search-result-entry-content
							:to="result.url"
							:class="i == focus ? 'focus' : ''"
						>
							<div match-info>
								<span inst v-if="result.hits">
									<span
										v-for="([str, match], i) in result.hits"
										:key="i"
										:class="match ? 'match' : ''"
										>{{ str }}</span
									>
								</span>
								<span inst v-else>
									{{ result.inst }}
								</span>
								<badge type="solid blue" v-if="result.type">{{
									result.type
								}}</badge>
								<badge
									type="solid yellow"
									v-if="result.encoding"
									>{{ result.encoding }}</badge
								>
							</div>
							<div match-reason v-if="result.match">
								<locale-name :name="result.match" />
							</div>
						</router-link>
					</div>
				</div>
			</div>
			<div search-prompt-hint v-if="searchResult.length == 0">
				<div
					search-hint
					style="text-align: left; padding-left: 1em"
					v-if="!searchString"
				>
					<i
						class="fa fa-info-circle"
						style="margin-left: -1.6em; width: 1.6em"
					></i
					><locale-name
						:name="{
							en: 'Supported search terms:',
							zh: '支持的搜索方式:',
						}"
					/>
					<ul style="margin-left: 1em">
						<li>
							<locale-name
								:name="{
									en: 'Exact name match',
									zh: '严格名称匹配',
								}"
							/>
							<i example-arrow class="fa fa-arrow-right"></i>
							<span example>"ADDI"</span>
						</li>
						<li>
							<locale-name
								:name="{
									en: 'Blurry match',
									zh: '模糊名称匹配',
								}"
							/>
							<i example-arrow class="fa fa-arrow-right"></i>
							<span example>"AMO ADD SUB"</span>
						</li>
						<li>
							<locale-name
								:name="{
									en: 'Instruction Decode',
									zh: '指令解码',
								}"
							/>
							<i example-arrow class="fa fa-arrow-right"></i>
							<span example>"00008293"</span>
						</li>
					</ul>
					<span footnote>
						<locale-name
							:name="{
								en: `
									PS: If radix (0x, 0o, 0b) was not specified at the begin of code,
									the decoder will try to interpret it as a hexadecimal number.
								`,
								zh: `
									注: 如果输入的指令码没有在开头明确指定进制 (0x, 0o, 0b),
									解码器会默认按照十六进制尝试解码指令.
								`,
							}"
						/>
					</span>
				</div>
				<div search-result-placeholder v-else>
					<locale-name
						:name="{
							en: 'Your search string does not match any instructions',
							zh: '您输入的搜索条件无法匹配任何指令',
						}"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

// Code match utility
function codeMatch(code) {
	// Run decoder
	const inst = decode(code)
	// Validate result
	if (inst && inst in searchIndex) {
		return [{
			inst,
			...searchIndex[inst],
			url: `/${inst.toUpperCase()}?${code.toString(16)}`,
			match: {
				en: 'Decode match',
				zh: '解码匹配'
			}
		}]
	} else {
		// Return empty
		return []
	}
}
function nameMatch(name) {
	const searchKeywords = name
		.toUpperCase()
		.split(/\s+/gi)
		.filter(el => !!el)
	return Object
		.keys(searchIndex)
		.map(inst => {
			const
				target = inst.toUpperCase(),
				hits = new Array(target.length).fill(false),
				exact = name.toUpperCase() === inst.toUpperCase()
			let score = 0
			searchKeywords.forEach(key => {
				if (target.includes(key)) {
					const index = target.indexOf(key)
					hits.fill(true, index, index + key.length)
					score += key.length
				}
				if (key.includes(target)) {
					hits.fill(true)
					score += target.length
				}
			})
			return { inst, hits, score, exact }
		})
		.filter(({ score, exact }) => exact || (score > 0))
		.sort((a, b) => b.exact || a.score < b.score)
		.map(({ inst, hits, exact }) => ({
			inst,
			...searchIndex[inst],
			hits: parseHits(inst, hits),
			url: `/${inst.toUpperCase()}`,
			match: {
				en: 'Name match',
				zh: '名称匹配'
			},
			exact
		}))
}
function parseHits(inst, lut) {
	const result = []
	let s = !!lut[0], str = ''
	inst.split('').forEach((c, i) => {
		const _s = !!lut[i]
		if (_s === s) {
			str += c
		} else {
			// Push existing items into result
			result.push([str, s])
			// Create new state
			s = _s
			str = c
		}
	})
	// Push last state into result
	result.push([str, s])
	return result
}
</script>


<style lang="scss" scoped>
[search-wrapper] {
	position: relative;
	[search-btn] {
		display: block;
		margin: 0 0.5em;
		padding: 0.3em 0.5em;
		--ct: var(--ct-gray-light);
		height: 1.8em;
		line-height: 1em;
		border-radius: 8px;
		border: 1px solid var(--ct);
		color: var(--ct);
		max-width: 10em;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: text;
		&:hover {
			--ct: var(--ct-gray-dark);
		}
	}
	[search-prompt-cover] {
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
	}
	[search-prompt] {
		position: fixed;
		z-index: 9999;
		pointer-events: none;
		[collapse="false"] & {
			top: 10vh;
			--h-space: max(0px, calc(50vw - 360px));
			left: var(--h-space);
			right: var(--h-space);
			height: 80vh;
		}
		[collapse="true"] & {
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
		[search-prompt-content] {
			width: 100%;
			max-height: 100%;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			pointer-events: all;
			box-shadow: 0 0 8px 0 #000a;
			[collapse="false"] & {
				border-radius: 0.5em;
			}
			[search-input] {
				display: flex;
				align-items: center;
				background-color: var(--cf);
				height: 3em;
				font-size: 1.5rem;
				input {
					flex-grow: 1;
					font-size: 1em;
					border: none;
					outline: none;
					font-family: monospace, monospace;
					width: 100%;
					height: 100%;
					padding: 1em 0;
				}
				[icon] {
					height: 3em;
					width: 3em;
					min-width: 3em;
					padding: 0.8em;
					text-align: center;
					color: var(--ct-gray-light);
					i {
						line-height: 1.4em;
					}
				}
			}
			[search-result] {
				flex-grow: 1;
				overflow-x: hidden;
				overflow-y: scroll;
				border-top: 1px solid var(--cb-gray-dark);
				padding: 0.6em 0;
				background-color: var(--cf);
				[search-result-entry] {
					padding: 0.4em 0.8em;
					cursor: pointer;
					user-select: none;
					[search-result-entry-content] {
						display: flex;
						flex-direction: row;
						padding: 0.6em 1em;
						border-radius: 0.5em;
						color: inherit;
						text-decoration: none;
						transition: none;
						border: 1px solid transparent;
						&.focus {
							border: 1px solid var(--cb-gray);
							background-color: var(--cf-next-level);
							box-shadow: 0.2em 0.2em 0.6em 0 #0004;
						}
						[match-info] {
							display: flex;
							flex-grow: 1;
							font-size: 1.2em;
							[inst] {
								display: inline-block;
								min-width: 3em;
								margin-right: 0.5em;
								transition: none;
								font-family: monospace, monospace;
								font-weight: bold;
								.match {
									color: var(--ct-blue);
									text-decoration: underline;
									font-weight: bold;
								}
							}
						}
						[match-reason] {
							color: var(--ct-gray-light);
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
		[search-prompt-hint] {
			color: var(--ct-gray);
			width: 100%;
			padding: 1em 2em;
			opacity: 0.8;
			text-align: center;
			* {
				margin-bottom: 0.8em;
			}
			[example-arrow] {
				font-size: 0.8em;
				margin: 0 0.8em;
				opacity: 0.8;
			}
			[example] {
				opacity: 0.8;
				font-family: monospace, monospace;
			}
			[footnote] {
				font-weight: bold;
				font-size: 0.9em;
				line-height: 1.6em;
				color: var(--ct-gray-light);
			}
		}
	}
}
</style>