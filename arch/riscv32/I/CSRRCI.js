export default {
	mask: '-----------------111-----1110011',
	args: {
		csr: ['31:20'],
		rd: ['11:7'],
		imm: ['S32', '19:15']
	},
	exec: {
		$: '// var(t) = CSRs[csr]; CSRs[csr] &= ~imm[4:0]; rd = t'
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
