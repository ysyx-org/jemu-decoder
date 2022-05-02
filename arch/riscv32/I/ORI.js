export default {
	mask: '-----------------110-----0010011',
	args: {
		imm: ['31:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: 'rd = rs1 | sext(imm, 12)'
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
