@related ADDIW SUBW
@locale en
@title Add Word

`ADDW` is RV64I-only instructions that are defined analogously to ADD,
`ADDW` performs the addition of `rs1` and `rs2`.
Overflows are ignored, and the low 32-bits of the result is sign-extended to 64-bits and written to `rd`.

@locale zh
@title 加字(Add Word)

`ADDW` 是一条 RV64I 指令, 其定义类似于 ADD.
`ADDW` 将 `rs1` 和 `rs2` 的值相加.
忽略算数溢出, 将结果的低32位被符号扩展为64位并写入 `rd`.
