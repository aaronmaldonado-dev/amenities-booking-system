module.exports = {
  // Specify the line length that the printer will wrap on
  // https://prettier.io/docs/en/options.html#tab-width
  printWidth: 120,

  // Specify the number os spaces per indentation level
  // https://prettier.io/docs/en/options.html#tab-width
  tabWidth: 2,

  // Indent lines with spaces
  // https://prettier.io/docs/en/options.html#tabs
  tabs: false,

  // Print semicolons at the end of statements
  // https://prettier.io/docs/en/options.html#semicolons
  semi: true, 

  // Use single quotes
  // https://prettier.io/docs/en/options.html#quotes
  singleQuote: true,

  // Trailing commas where valid in ES5 (objects, arrays, etc.). No trailing commas in type parameters in TypeScript.
  // https://prettier.io/docs/en/options.html#trailing-commas
  trailingComma: 'es5',

  // Print spaces between brackets in object literals
  //https://prettier.io/docs/en/options.html#bracket-spacing

  bracketSpacing: true,

  // Put the > of a multi-line HTML element at the end of the last line
  // https://prettier.io/docs/en/options.html#bracket-line
  bracketSameLine: false, 

  // Include parentheses around a sole arrow function parameter
  // https://prettier.io/docs/en/options.html#arrow-function-parentheses
  arrowParens: 'always',

  // Maintain existing line endings
  // https://prettier.io/docs/en/options.html#end-of-line
  endOfLine: 'auto',
};