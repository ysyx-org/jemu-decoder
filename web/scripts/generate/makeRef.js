import { raw } from './index.js'

function renderInstruction(content) {
	if (content in raw) return [
		`<a href="${content}" style="`,
		[
			'font-family: monospace, monospace',
			'font-weight: bold',
			'color: var(--c-brand)',
		].join(';'),
		'">',
		content,
		'</a>',
	].join('')
}

function renderKeywordBadge(content) {
	const
		registerBadge = '<locale-name :name="{ en: \'register\', zh: \'寄存器\' }"/>',
		regLut = {
			rs1: registerBadge,
			rs2: registerBadge,
			rs3: registerBadge,
			rd: registerBadge,
			csr: registerBadge,
			imm: '<locale-name :name="{ en: \'immediate number\', zh: \'立即数\' }"/>',
			PC: '<locale-name :name="{ en: \'program counter\', zh: \'程序计数器\' }"/>',
		}
	if (content in regLut) return [
		'<code>',
		'<span style="',
		[
			'display: inline-block',
			'user-select: none',
			'font-size: 0.8em',
			'padding-right: 0.5em',
			'color: var(--ct-gray)',
			'transform: translateY(-0.1em)',
		].join(';'),
		'">',
		regLut[content],
		'</span>',
		'<b>',
		content,
		'</b>',
		'</code>',
	].join('')
}

export default function makeRef(doc) {
	return doc.replace(
		/<code>(.*?)<\/code>/gi,
		(original, content) => undefined
			|| renderInstruction(content)
			|| renderKeywordBadge(content)
			|| original
	)
}
