export default {
	mask: '-----------------111-----1110011',
	args: {
		imm: ['S32', '19:15'],
		csr: ['31:15'],
		rd: ['11:7']
	},
	exec: {
		$: '// var(t) = CSRs[csr]; CSRs[csr] &= ~imm[4:0]; rd = t'
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
