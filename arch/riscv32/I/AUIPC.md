@related LUI JAL
@locale en
@title Add U-Immediate with PC

`AUIPC` is used to build `PC`-relative addresses and uses the U-type format. 
`AUIPC` forms a 32-bit offset from the `U-immediate`,
filling in the lowest 12 bits with zeros,
adds this offset to the address of the `AUIPC` instruction,
then places the result in `rd`.

@locale zh
@title U型立即数加PC

`AUIPC` 用于获取相对于 `PC` 的地址, 指令使用 U 编码.

通过将指令中编码的 20 位 `U型立即数` 左移 12 位并在低位补 0, `AUIPC` 可以构造一个 32 位整型的地址偏移范围.

`AUIPC` 将这个偏移量与当前 `PC` 中的地址相加, 结果保存至`rd`.

@locale *
<container type="warn">

@locale en
<i class="fas fa-bell"></i> <b>Notice</b>

`AUIPC` will **NOT** change `PC`.
Control flow will never be interrupted by this instruction.

@locale zh
<i class="fas fa-bell"></i> <b>注意</b>

`AUIPC` **不会**更改 `PC`.
这条指令永远不会让控制流产生分支.

@locale *
</container>

<container type="info">

@locale en
<i class="fa fa-info-circle"></i> <b>Hint</b>

The assembly syntax for `LUI` and `AUIPC` does not represent the lower 12 bits of the U-immediate, which are always zero.

The `AUIPC` instruction supports two-instruction sequences to access arbitrary offsets from the `PC` for both control-flow transfers and data accesses.
The combination of an `AUIPC` and the 12-bit `immediate` in a `JALR` can transfer control to any 32-bit `PC`-relative address,
while an `AUIPC` plus the 12-bit `immediate` offset in regular load or store instructions can access any 32-bit `PC`-relative data address.

The current `PC` can be obtained by setting the U-immediate to 0.
Although a `JAL` + 4 instruction could also be used to obtain the local `PC` (of the instruction following the `JAL`),
it might cause pipeline breaks in simpler micro-architectures or pollute BTB structures in more complex micro-architectures.

@locale zh
<i class="fa fa-info-circle"></i> <b>提示</b>

在汇编代码中, `LUI` 和 `AUIPC` 指令的 `字面立即数` 并不会反映 `用于实际计算的立即数` 的低 12 位, 因为它们永远是 0.

`AUIPC` 指令可以在另一条指令的配合下实现 32 位整型偏移范围内的任意跳转或访存
(相对于 `AUIPC` 指令所在的 `PC`).
例如:
	
+ `AUIPC` 与 `JALR` 的 12 位立即数配合, 可以将控制流跳转到相对于 `PC` 的、32 位整型范围内的任意地址;

+ `AUIPC` 与任意访存指令 (如 `LB`, `LW`, `SB`, `SW`) 的12位立即数配合, 可以读写相对于 `PC` 的、32位整型范围内的任意内存.

通过将 `立即数` 设置为0, `AUIPC` 可以用于读取当前的 `PC`.
尽管 `JAL` `rd, 4` 指令也可以做到类似的效果 (紧随 `JAL` 之后的那一条指令可以在 `rd` 中读取自己的地址),
但是由于 `JAL` 属于跳转指令, 这种用法很可能导致简单微架构内核冲刷流水线, 或者污染较为复杂内核中的分支预测缓存.

@locale *
</container>