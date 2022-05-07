@locale en
@title Subtract two registers

`SUB` performs the subtraction of `rs1` and `rs2`.
Overflows are ignored and the low _XLEN_ bits of results are written to `rd`.

@locale zh
@title 寄存器减寄存器

`SUB` 指令将 `rs1` 和 `rs2` 的值相减.
忽略运算过程中的溢出, 只保留低 _XLEN_ 位的结果, 并将该结果写至 `rd`.