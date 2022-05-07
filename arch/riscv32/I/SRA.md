@related SLL SRL
@title Shift Right (Arithmetic)

`SRA` perform arithmetic (aka signed) right shift on the value in `rs1` by the shift amount held in the **lower 5 bits** of `rs2`.

<container type="info">

<i class="fa fa-info-circle"></i> <b>Hint</b>

Shift left operations do not have to worry about the sign bits,
therefore there exists **NO** `SLA` (corresponding to `SLL`)

</container>