export default {
	mask: '-----------------011-----1110011',
	args: {
		csr: ['31:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: '// var(t) = CSRs[csr]; CSRs[csr] &= ~rs1  ; rd = t'
	},
	meta: {
		encoding: '!',
		importance: NaN
	}
}
