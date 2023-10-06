@locale en
@title Branch if greater or equal (unsigned)

 `BEQU` branches to a different part of the program if the value in `rs1` is greater than or equal to (unsigned) the value in `rs2` when considering unsigned integer values.


If the condition is true, then the value of the `PC` is set to its current value plus a sign-extended B-type immediate value.

@locale zh
@title @title 当大于或等于寄存器的值时产生分支(无符号)

`BEQ` 指令在 `rs1` 的值大于等于(无符号比较)`rs2` 的值时产生分支.
 
若结果为真，则将 `PC` 的值设为当前值加上符号位拓展的 `B型立即数`.

<to-be-edited />