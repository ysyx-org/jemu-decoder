@locale en
@title Add Immediate

ADDI adds the sign-extended 12-bit immediate with `rs1`,
and saves the result to rd.
Arithmetic overflow is ignored and the result is simply the low _XLEN_ bits of the result.

`ADDI rd, rs1, 0` is used to implement the `MV rd, rs1` assembler pseudoinstruction.

@locale zh
@title 加立即数 (Add Immediate)

`ADDI` 将符号拓展的12位 `立即数` 和`rs1` 的值相加, 并将运算结果保存至`rd`.
计算过程中的数值溢出会被直接忽略, 仅保留低 _XLEN_ 位的运算结果.

`ADDI` `rd, rs1, 0` 被用于实现虚拟汇编指令 `MV` `rd, rs1`.
