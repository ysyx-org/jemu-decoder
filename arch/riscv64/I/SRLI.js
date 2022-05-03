export default {
	mask: '000000-----------101-----0010011',
	args: {
		imm: ['S32', '25:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: 'rd = rs1 >> B64(imm)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
