@related LHU LB LBU
@locale en
@title Load byte (signed)

LH loads a 16-bit value from memory at the address pointed to by rs1+immediate into rd, sign-extending the value to fill the register.

@locale zh

<to-be-edited />

@locale *
<container type="info">

<i class="fa fa-info-circle"></i> <b>Hint: Sign-extension</b>

After loading the value `bbbbb..bb_2` from memory, `rd`'s contents will depend on the most significant bit (MSB) of the value. It will contain either:

```
0b111...11_1bbb_b..bb
```

or

```
0b000...00_0bbb_b..bb
```

so that the 32-bit two's complement representation is equivalent to the 8-bit representation.

</container>