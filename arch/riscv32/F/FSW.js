export default {
	mask: '-----------------010-----0100111',
	args: {
		imm: ['S32', '31:25', '11:7'],
		rs2: ['24:20'],
		rs1: ['19:15']
	},
	exec: {
		$: ''
	},
	meta: {
		encoding: 'S',
		importance: NaN
	}
}
