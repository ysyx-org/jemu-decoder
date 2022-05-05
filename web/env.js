import { dirname, resolve } from 'path'

export const WEB_ROOT = resolve(
	dirname(import.meta.url.replace(/^file:/gi, ''))
)

export const BUILD_PATH = resolve(
	WEB_ROOT,
	'../build/RV64G'
)
