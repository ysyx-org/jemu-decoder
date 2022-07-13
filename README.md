# Js.Emu Decoder Library

This library includes structured raw data of ISA related specs.

The data will be needed to either generate runtime core of JEMU (cpu emulator)
or to auto-generate a wiki site.

## Contributors wanted!

We are looking for coordinators for this project.
Any amount and any form of contributions are welcomed.

Please take a look at [contribution guide](docs/contribute.md) to get started.

## Project Structure

+ `/arch`

	The core directory containing the definitions of all instructions. See [instruction definition](docs/define.md) and [instruction documentation format](docs/doc-instruction.md).

+ `/lib`

	Common utilities and dependencies.

+ `/scripts`

	Scripts used to build the decoder and parser.

+ `/targets`

	Manifests declaring which instruction(s) to be included for
	a specific build.

+ `/web`

	A magical sub-project converting the project into a handy manual website.
	The decoder and parser we built in the parent project will be imbedded into
	its runtime core, enabling search and decode of binary instruction codes.


## Build for web

1. Build the decoder

	```sh
	# Run at project root
	jemu-decoder > npm run build
	```

1. Preview webpages

	```sh
	# Run at web folder
	jemu-decoder/web > npm run dev
	```

1. Build and deploy ([ysyx](ysyx.oscc.cc) stuff with certain privileges only)

	To build for web only (without deploying)
	
	```sh
	# Run at web folder (build)
	jemu-decoder/web > npm run build
	```
	
	To build and deploy (with privileged account)
	
	```sh
	# Run at web folder
	jemu-decoder/web > npm run deploy
	```
	
