@related ADDI ADDW
@locale en
@title Add Word Immediate

`ADDIW` is an RV64I instruction that adds the sign-extended 12-bit immediate to register `rs1` and produces the proper sign-extension of a 32-bit result in `rd`.
Overflows are ignored and the result is the low 32 bits of the result sign-extended to 64 bits.

`ADDIW rd, rs1, 0` writes the sign-extension of the lower 32 bits of register `rs1` into register `rd`
(assembler pseudoinstruction SEXT.W)

@locale zh
@title 加立即数字 (Add Word Immediate)

`ADDIW` 是一条 RV64I 指令, 它将符号扩展的12位 `立即数` 和 `rs1` 的值相加, 将结果截断为32位, 再把符号位扩展的结果保存至 `rd`.
忽略算数溢出, 结果是低32位经过符号扩展生成的64位.

`ADDIW rd, rs1, 0` 将寄存器 `rs1` 的低32位的符号扩展写入寄存器 `rd` (伪指令 SEXT.W)
