@locale en
@title Add Upper Immediate to PC

`AUIPC` is used to build `PC`-relative addresses and uses the `U`-type format. 
`AUIPC` forms a 32-bit offset from the `U`-immediate,
filling in the lowest 12 bits with zeros,
adds this offset to the address of the `AUIPC` instruction,
then places the result in register `rd`.

@locale zh
@title PC加左移立即数

`AUIPC` 被用于构造相对于 `PC` 的地址, 指令使用 `U` 型编码.
通过将 `U` 型立即数中的20位立即数左移12位并在低位补0, `AUIPC` 可以获得一个32位整型的地址偏移范围,
该偏移量与 `AUIPC` 自身的地址相加, 结果保存至寄存器 `rd`.