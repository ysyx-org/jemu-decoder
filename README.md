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
