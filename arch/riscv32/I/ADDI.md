@related ADDI
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

@locale *
<container type="info">

<i class="fa fa-info-circle"></i> <b>Hint: <code>NOP</code> Pseudo Instruction</b>

`NOP`s can be used to align code segments to micro-architecturally significant address boundaries,
or to leave space for inline code modifications.
Although there are many possible ways to encode a NOP,
we define a canonical `NOP` encoding to allow micro-architectural optimizations as well as for more readable disassembly output.
The other `NOP` encodings are made available for `HINT` instructions.

`ADDI` was chosen for the `NOP` encoding as this is most likely to take fewest resources to execute across a range of systems
(if not optimized away in decode).
In particular, the instruction only reads one register.
Also, an `ADDI` functional unit is more likely to be
available in a super-scalar design as adds are the most common
operation. In particular, address-generation functional units can
execute `ADDI` using the same hardware needed for `base + offset` address
calculations, while register-register `ADD` or logical/shift operations
require additional hardware.

</container>