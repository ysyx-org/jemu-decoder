<script setup>
/* $PSEUDO */ const $INST = 'ADD'
/* $PSEUDO */ const $MASK = '11111110000011100000-----00000'
/* $PSEUDO */ const $ARGS = { rs1: ['5:0'] }
/* $PSEUDO */ const $EXEC = { rd: 'rs1 + rs2' }
/* $PSEUDO */ const $META = { args: {imm: 'S32'} }
/* $PSEUDO */ const $PARSE = code => ({ rs1: 0, rs2: 0, rs3: 0, imm: 0 })
const
	INST = $INST,
	ARGS = $ARGS,
	EXEC = $EXEC,
	MASK = $MASK,
	META = $META,
	PARSE = $PARSE
</script>

<template>
	<instruction
		:inst="INST"
		:args="ARGS"
		:exec="EXEC"
		:mask="MASK"
		:meta="META"
		:parse="PARSE"
	>
		$DOC
	</instruction>
</template>