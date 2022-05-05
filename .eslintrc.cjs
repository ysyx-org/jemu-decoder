const [NEVER, WARN, ERROR] = Array(3).keys()
const config = {
	env: {
		node: true,
		es2021: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		/* ----------------------- Coding practices ------------------------ */
		'capitalized-comments': [NEVER],
		'dot-notation': [WARN],
		'no-cond-assign': [NEVER],
		'no-control-regex': [NEVER],
		'no-extra-bind': [WARN],
		'no-unused-vars': [NEVER, { 'vars': 'all', 'args': 'after-used' }],
		'object-shorthand': [WARN],
		'prefer-const': [NEVER],
		'prefer-destructuring': [WARN],
		'prefer-template': [WARN],
		'spaced-comment': [WARN],
		'yoda': [WARN],
		/* ---------------------------- Formats ---------------------------- */
		//  🔧	enforce line_breaks after opening and before closing array brackets
		'array-bracket-newline': [WARN],
		//  🔧	enforce consistent spacing inside array brackets
		'array-bracket-spacing': [WARN],
		//  🔧	enforce line breaks after each array element
		'array-element-newline': [WARN, 'consistent'],
		//  🔧	require parentheses around arrow function arguments
		'arrow-parens': [WARN, 'as-needed'],
		//  🔧	enforce consistent spacing before and after the arrow in arrow functions
		'arrow-spacing': [WARN],
		//  🔧	disallow or enforce spaces inside of blocks after opening block and before closing block
		'block-spacing': [WARN],
		//  🔧	enforce consistent brace style for blocks
		'brace-style': [WARN, '1tbs', { allowSingleLine: true }],
		//  🔧	require or disallow trailing commas
		'comma-dangle': [NEVER],
		//  🔧	enforce consistent spacing before and after commas
		'comma-spacing': [WARN],
		//  🔧	enforce consistent comma style
		'comma-style': [WARN],
		//  🔧	enforce consistent spacing inside computed property brackets
		'computed-property-spacing': [WARN],
		//  🔧	enforce consistent newlines before and after dots
		'dot-location': [WARN, 'property'],
		//  🔧	require or disallow newline at the end of files
		'eol-last': [WARN],
		//  🔧	require or disallow spacing between function identifiers and their invocations
		'func-call-spacing': [WARN, 'never'],
		//  🔧	enforce line breaks between arguments of a function call
		'function-call-argument-newline': [NEVER],
		//  🔧	enforce consistent line breaks inside function parentheses
		'function-paren-newline': [NEVER],
		//  🔧	enforce consistent spacing around `*` operators in generator functions
		'generator-star-spacing': [NEVER],
		//  🔧	enforce the location of arrow function bodies
		'implicit-arrow-linebreak': [NEVER],
		//  🔧	enforce consistent indentation
		'indent': [WARN, 'tab', { SwitchCase: 1 }],
		//  🔧	enforce the consistent use of either double or single quotes in JSX attributes
		'jsx-quotes': [NEVER],
		//  🔧	enforce consistent spacing between keys and values in object literal properties
		'key-spacing': [WARN],
		//  🔧	enforce consistent spacing before and after keywords
		'keyword-spacing': [WARN],
		//  -	enforce position of line comments
		'line-comment-position': [NEVER],
		//  🔧	enforce consistent linebreak style
		'linebreak-style': [ERROR, 'unix'],
		//  🔧	require empty lines around comments
		'lines-around-comment': [NEVER],
		//  🔧	require or disallow an empty line between class members
		'lines-between-class-members': [NEVER],
		//  -	enforce a maximum line length
		'max-len': [NEVER],
		//  -	enforce a maximum number of statements allowed per line
		'max-statements-per-line': [NEVER],
		//  🔧	enforce newlines between operands of ternary expressions
		'multiline-ternary': [NEVER],
		//  🔧	enforce or disallow parentheses when invoking a constructor with no arguments
		'new-parens': [WARN, 'never'],
		//  🔧	require a newline after each call in a method chain
		'newline-per-chained-call': [NEVER],
		//  🔧	disallow unnecessary parentheses
		'no-extra-parens': [WARN],
		//  🔧	disallow multiple spaces
		'no-multi-spaces': [WARN],
		//  🔧	disallow multiple empty lines
		'no-multiple-empty-lines': [WARN],
		//  -	disallow all tabs
		'no-tabs': [NEVER],
		//  🔧	disallow trailing whitespace at the end of lines
		'no-trailing-spaces': [WARN],
		//  🔧	disallow whitespace before properties
		'no-whitespace-before-property': [WARN],
		//  🔧	enforce the location of single_line statements
		'nonblock-statement-body-position': [WARN],
		//  🔧	enforce consistent line breaks after opening and before closing braces
		'object-curly-newline': [WARN, { 'multiline': true, 'consistent': true }],
		//  🔧	enforce consistent spacing inside braces
		'object-curly-spacing': [WARN, 'always'],
		//  🔧	enforce placing object properties on separate lines
		'object-property-newline': [WARN, { allowAllPropertiesOnSameLine: true }],
		//  🔧	enforce consistent linebreak style for operators
		'operator-linebreak': [WARN, 'before'],
		//  🔧	require or disallow padding within blocks
		'padded-blocks': [NEVER],
		//  🔧	require or disallow padding lines between  statements
		'padding-line-between-statements': [NEVER],
		//  🔧	enforce the consistent use of either backticks, double, or single quotes
		'quotes': [WARN, 'single'],
		//  🔧	enforce spacing between rest and spread operators and their expressions
		'rest-spread-spacing': [WARN],
		//  🔧	require or disallow semicolons instead of ASI
		'semi': [WARN, 'never'],
		//  🔧	enforce consistent spacing before and after semicolons
		'semi-spacing': [NEVER],
		//  🔧	enforce location of semicolons
		'semi-style': [NEVER],
		//  🔧	enforce consistent spacing before blocks
		'space-before-blocks': [NEVER],
		//  🔧	enforce consistent spacing before `function` definition opening parenthesis
		'space-before-function-paren': [WARN, { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }],
		//  🔧	enforce consistent spacing inside parentheses
		'space-in-parens': [WARN],
		//  🔧	require spacing around infix operators
		'space-infix-ops': [WARN],
		//  🔧	enforce consistent spacing before or after unary operators
		'space-unary-ops': [WARN],
		//  🔧	enforce spacing around colons of switch statements
		'switch-colon-spacing': [WARN],
		//  🔧	require or disallow spacing around embedded expressions of template strings
		'template-curly-spacing': [WARN],
		//  🔧	require or disallow spacing between template tags and their literals
		'template-tag-spacing': [WARN],
		//  🔧	require or disallow Unicode byte order mark (BOM)
		'unicode-bom': [NEVER],
		//  🔧	require parentheses around immediate `function` invocations
		'wrap-iife': [WARN, 'inside'],
		//  🔧	require parenthesis around regex literals
		'wrap-regex': [NEVER],
		//  🔧	require or disallow spacing around the `*` in `yield*` expressions
		'yield-star-spacing': [WARN],
		'vue/no-multiple-template-root': [NEVER]
	}
}
// Export the config
module.exports = config
