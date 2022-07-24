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

	The core directory containing the definitions of all instructions.
	See [instruction definition](docs/define.md)
	and [instruction documentation format](docs/doc-instruction.md).

+ `/lib`

	Common utilities and dependencies.

+ `/scripts`

	Scripts used to build the decoder and parser.

+ `/targets`

	Manifests declaring which instruction(s) to be included for
	a specific build.

+ `/web`

	A magical sub-project converting the build results into a handy manual.
	The decoder and parser we built in the parent
	project will be embedded into its runtime core,
	enabling search and decode of binary instructions.


## Build the decoder

```sh
# Run at project root
jemu-decoder > npm run build
```

> If you made changes to the content of `/arch`
> and want to get it reflected in the webpages,
> you have to run this command.

## Build for web

1. Build the decoder

	```sh
	# Run at project root
	jemu-decoder > npm run build
	```

	If you made any change to the content of `/arch`
	and want to get it reflected in the webpages,
	you have to run this command.

1. Preview webpages

	```sh
	# Run at web folder
	jemu-decoder/web > npm run dev
	```

	This command will launch a local server showing live
	updates of the web contents.
	`vite` is used under the hood.

	When `dev` server is running, you can modify the code under `/arch`,
	and then manually [build the decoder](#build-the-decoder) to see live updates.

1. Build and deploy (only available for [YSYX](https://ysyx.oscc.cc) stuff with certain privileges)

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
