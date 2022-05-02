import { makeTarget } from 'lib/target.js'
export default {
	// riscv32
	...await makeTarget('riscv32/A', { type: 'RV32A' }),
	...await makeTarget('riscv32/D', { type: 'RV32D' }),
	...await makeTarget('riscv32/F', { type: 'RV32F' }),
	...await makeTarget('riscv32/I', { type: 'RV32I' }),
	...await makeTarget('riscv32/M', { type: 'RV32M' }),
	// riscv64
	...await makeTarget('riscv64/A', { type: 'RV64A' }),
	...await makeTarget('riscv64/D', { type: 'RV64D' }),
	...await makeTarget('riscv64/F', { type: 'RV64F' }),
	...await makeTarget('riscv64/I', { type: 'RV64I' }),
	...await makeTarget('riscv64/M', { type: 'RV64M' }),
}
