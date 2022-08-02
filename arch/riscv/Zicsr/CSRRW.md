@locale en
@title Atomic Read/Write CSR

CSRRW reads the old value of the `CSR`, zero-extends the value to XLEN bits, then writes it to integer register `rd`. The initial value in `rs1` is written to the CSR.

@locale zh
@title 原子读/写CSR

CSRRW 从 `CSR` 中读取数据， 将读到的数据0拓展后写入 `rd` 寄存器。 存于 `rs1` 寄存器的值写入对应的 `CSR`

</container>
