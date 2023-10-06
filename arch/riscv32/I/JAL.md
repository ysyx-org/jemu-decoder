@related JALR
@locale *
@title Jump and Link

J-immediate encodes a signed offset in multiples of 2 bytes.
The offset is sign-extended and added to the pc to form the jump target address.
JAL stores the address of the instruction following the jump (pc+4) into register rd.

Plain unconditional jumps (assembler pseudo-op J) are encoded as a JAL with rd=x0.

@locale zh
@title 跳转-链接

`JAL` 编码了以2字节为单位的有符号偏移量。该偏移量进行符号扩展，并加到 `PC` 上，形成跳转的目标地址。JAL将跳转后的指令地址（pc+4）存储到寄存器 `rd` 中。

普通的无条件跳转（汇编伪指令J）被编码为一个带有`rd`=x0的JAL指令。

<to-be-edited />