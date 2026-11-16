// Fast path: marked.parse() spreads its options twice and rebuilds hooks on every call — the same
// work for every string. Lexer.lex and Parser.parse take the options object directly, so this keeps
// ONE options object for all 720 cases. marked writes tokenizer/parser back onto that object, so it
// must be a plain object, not a frozen one; and it is reset per call so no state leaks between cases.

import { Lexer, Parser, getDefaults } from './vendor/marked/marked.esm.js';

export function parse(markdown) {
  const options = getDefaults();
  options.tokenizer = null;
  return Parser.parse(Lexer.lex(markdown, options), options);
}
