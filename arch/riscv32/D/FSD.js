export default {
	mask: '-----------------011-----0100111',
	args: {
		imm: ['31:25', '11:7'],
		rs2: ['24:20'],
		rs1: ['19:15']
	},
	sext: true,
	exec: {
		$: ''
	},
	meta: {
		encoding: 'S',
		importance: NaN
	}
}
