export default {
	mask: '0000--------00000000000000001111',
	args: {
		p: ['27:24'],
		s: ['23:20']
	},
	sext: true,
	exec: {
		$: '// Fence(pred, succ);'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
