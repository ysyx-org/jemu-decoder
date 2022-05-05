export default {
	mask: '-----------------011-----0100111',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		imm: ['S32', '31:25', '11:7']
	},
	exec: {
		$: ''
	},
	meta: {
		encoding: 'S',
		importance: NaN
	}
}
