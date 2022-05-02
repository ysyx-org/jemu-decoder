import { basename, resolve } from 'path'

export const PROJECT_ROOT = resolve(
	basename(import.meta.url.replace(/^file:/, '')),
	'../'
)
