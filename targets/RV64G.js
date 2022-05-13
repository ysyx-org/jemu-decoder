import make from 'lib/makeTarget.js'
export default {
	// general
	...await make('riscv/Zifencei', { type: 'RV-Zifencei' }),
	...await make('riscv/Zicsr', { type: 'RV-Zicsr' }),
	// riscv32
	...await make('riscv32/A', { type: 'RV32A' }),
	...await make('riscv32/D', { type: 'RV32D' }),
	...await make('riscv32/F', { type: 'RV32F' }),
	...await make('riscv32/I', { type: 'RV32I' }),
	...await make('riscv32/M', { type: 'RV32M' }),
	// riscv64
	...await make('riscv64/A', { type: 'RV64A' }),
	...await make('riscv64/D', { type: 'RV64D' }),
	...await make('riscv64/F', { type: 'RV64F' }),
	...await make('riscv64/I', { type: 'RV64I' }),
	...await make('riscv64/M', { type: 'RV64M' }),
}
