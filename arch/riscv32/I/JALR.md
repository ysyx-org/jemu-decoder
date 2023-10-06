@locale *
@title Jump and Link register

`JALR` instruction obtains the target address by adding a 12-bit signed immediate value to register `rs1` and then setting the lowest bit of the result to zero before storing it in the `PC`. JALR stores the address of the instruction following the jump (pc+4) into register rd. Typically, rd is set to x0.

@locale zh
@title 跳转-链接(寄存器地址)

`JALR` 通过将 12 位有符号立即数添加到寄存器 `rs1`，然后将结果的最低有效位设置为零后存入 `PC` 来获得目标地址.JALR 将跳转后的指令地址（pc+4）,存储到寄存器 `rd` 中。
通常 `rd` = x0.

<to-be-edited />