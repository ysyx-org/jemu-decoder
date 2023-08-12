@related JALR
@locale *
@title Add Immediate

J-immediate encodes a signed offset in multiples of 2 bytes.
The offset is sign-extended and added to the pc to form the jump target address.
JAL stores the address of the instruction following the jump (pc+4) into register rd.

Plain unconditional jumps (assembler pseudo-op J) are encoded as a JAL with rd=x0.
