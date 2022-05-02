export default {
	mask: '-----00------------------1000011',
	args: {
		rs3: ['31:27'],
		rs2: ['24:20'],
		rs1: ['19:15'],
		rm: ['14:12'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: ''
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
