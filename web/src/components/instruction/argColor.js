export default function argColor(arg) {
	if (/^rs\d$/i.test(arg)) return 'green'
	if (/^rd$/i.test(arg)) return 'blue'
	if (/^imm$/i.test(arg)) return 'yellow'
	return 'red'
}