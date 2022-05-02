export default {
	mask: '-----------------010-----0000111',
	args: {
		imm: ['31:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: ''
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
