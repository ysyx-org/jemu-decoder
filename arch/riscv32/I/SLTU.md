@locale en
@title (UNSIGNED) Set if Less Than

`SLTU` performs **unsigned** compare between `rs1` and `rs2`,
writing 1 to `rd` if `rs1` < `rs2`, 0 otherwise.

@locale zh
@title (无符号) 小于则置位

`SLTU` 对 `rs1` 和 `rs2` 进行**无符号**比较,
如果 `rs1` < `rs2` 则将 `rd` 置 1, 否则置 0.

@locale *
<container type="info">

@locale en
<i class="fa fa-info-circle"></i> <b>Info</b>

`SLTU` `rd, x0, rs2` sets `rd` to 1 if `rs2` is not equal to zero, otherwise sets `rd` to zero.

assembler pseudo-instruction `SNEZ` `rd, rs`.

@locale zh
<i class="fa fa-info-circle"></i> <b>提示</b>

`SLTU` `rd, x0, rs2` 可以用于判断 `rs2` 的值是否为零. 若 `rs2` 非零则 `rd` 置 1, 否则置零

用于实现汇编器虚拟指令 `SNEZ` `rd, rs`

@locale *
</container>