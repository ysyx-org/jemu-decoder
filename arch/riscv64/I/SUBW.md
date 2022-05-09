@related SUB ADDW
@locale en
@title Substract Word

`SUBW` is RV64I-only instructions that are defined analogously to SUB,
`SUBW` performs the subtraction of `rs1` and `rs2`.
Overflows are ignored, and the low 32-bits of the result is sign-extended to 64-bits and written to `rd`.

@locale zh
@title 减字(Substract Word)

`SUBW` 是一条 RV64I 指令, 其定义类似于 ADD.
`SUBW` 将 `rs1` 和 `rs2` 的值相减.
忽略算数溢出, 将结果的低32位被符号扩展为64位并写入 `rd`.
