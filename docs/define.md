# Instruction meta-definition

## YAML file format

As you might already noticed, we use structured _yml_ file to define instructions.

For example, this is the definition of `ADDI` (RV32I):

```yml
# ADDI.yml
mask: '-----------------000-----0010011'

args:
  rs1: 19:15
  rd: 11:7
  s32'imm: 31:20

exec:
  rd: rs1 + imm

meta:
  encoding: I
  importance: NaN
```

## Type definitions

Type definitions can be placed at the begining of a variable, or an expression.

e.g. `s32'imm` declares an immediate number **sign**-extended from its actual bit-width to 32-bit integer,
and `u32'imm` declares an immediate number **zero**-extended from its actual bit-width to 32-bit integer

## State transfer notations

Each key (aka. entry name) in field `exec` of the yml represents a destination register, and the corresponding expression represents the state transfer rule for its next state (aka combinational logic).

If you are familiar with verilog, the above code can be interpreted as:

```verilog
module addi(
	input reg clk,
	input reg [63:0] rs1, [31:0] imm,
	output reg [63:0] rd
)
	always @(posedge clk) begin
		rd <= rs1 + imm;
	end
endmodule
```

The way of state transfer notation is rooted in the nature of real hardwares: they are, by design, state transfer machines.

The registers available in state transfer notation are architecture-dependent, hence it was externally defined in `jemu-core-$ARCH`

## Metadata

+ encoding `Char`

	The type of instruction encoding (among R, I ,S, B, U, J).
	See [official RISC-V manual](https://github.com/riscv/riscv-isa-manual/releases/latest)

+ importance `Number`

	This metadata describes how 'important' an instruction is considered.
	To be clear, the concept of importance is **only** meant to indicate the order of implementation for those who tries to develop their own RTL design or emulators. We are not trying to defame the design of ANY existing instructions.

	+ `0` - _FUNDAMENTAL_
	
		Required by almost all programs, frequently used in machine mode
	
	+ `1` - _BASIC_
		
		Necessary to implement some basic functionalities, e.g. input/output
	
	+ `2` - _OS-RT_
		
		Required to boot up RT-Thread
	
	+ `3` - _OS-GENERIC_
		
		Required to boot up generic operating systems (mainly linux)
	
	+ `4` - _EXTRA_
		
		Additional features
