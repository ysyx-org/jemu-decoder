# JEMU Decoder Library

This library includes structured raw data of ISA related specs.

The data will be needed to either generate runtime core of JEMU (cpu emulator)
or to auto-generate a wiki site.

## Project Structure

+ `/arch`

	The core directory containing the definitions of all instructions

+ `/lib`

	Common utilities and dependencies

+ `/scripts`

	Scripts used to generate and build the project


## State transfer notations

As you might already noticed, we use object notation to model the behavior of each instruction. Each key (aka. entry name) of the object represents a destination register, and the corresponding expression represents the state transfer rule for its next state (aka combinational logic).

For example, we can describe the state transfer rule for `ADDI` (RV32I) as follows:

```js
// ADDI.js
export default {
	/* irrelevant items are hidden */
	exec: {
		rd: 'rs1 + imm'
	}
}
```

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
