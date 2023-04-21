@related LH LB LBU
@locale en
@title Load byte (unsigned)

LHU loads a 16-bit value from memory at the address pointed to by rs1+immediate into rd, zero-extending the value to fill the register.

@locale zh

<to-be-edited />

@locale *
<container type="info">

<i class="fa fa-info-circle"></i> <b>Hint: Zero-extension</b>

After loading the value `bb..bb_2` (`xxxx_16`) from memory, `rd` will contain:

```
0b0000...00bb..bb
```

or, in hex:

```
0x000...0xxxx
```

</container>