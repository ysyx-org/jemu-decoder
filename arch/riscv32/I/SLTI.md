@related SLT SLTIU
@locale en
@title (SIGNED) set less than immediate

SLTI performs **signed compare** between `rs1` and 32-bits sign-extended 12-bits immediate, writing 1 to 'rd' if 'rs1' < immediate, 0 otherwise.

@locale zh
@title (有符号) 小于立即数则置位

SLTI 对 `rs1` 和 已被符号拓展至32位的12位`立即数` 进行**有符号**比较,
如果 `rs1` < `立即数` 则将 `rd` 置 1, 否则置 0.
