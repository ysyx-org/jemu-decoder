@related SLTI SLTU
@locale en
@title (UNSIGNED) set less than immediate

SLTI performs **unsigned compare** between `rs1` and 32-bits sign-extended 12-bits immediate, writing 1 to `rd` if `rs1` < immediate, 0 otherwise.

@locale zh
@title (无符号) 小于立即数则置位

SLTI 对 `rs1` 和已被符号拓展至32位的12位 `立即数` 进行**无符号**比较,
如果 `rs1` < `立即数` 则将 `rd` 置 1, 否则置 0.

@locale *
<container type="info">

@locale en
<i class="fa fa-info-circle"></i> <b>Info</b>

`SLTIU` `rd, rs1, 1` sets `rd` to 1 if `rs1` is  equal to zero, otherwise sets `rd` to zero.

assembler pseudo-instruction `SNEZ` `rd, rs`.

@locale zh
<i class="fa fa-info-circle"></i> <b>提示</b>

`SLTIU` `rd, rs1, 1` 可以用于判断 `rs1` 的值是否为零. 若 `rs1` 为零则 `rd` 置 1, 否则置零

用于实现汇编器虚拟指令 `SEQZ` `rd, rs`

@locale *
</container>
