import { getDefaults, Lexer, Parser } from './vendor/marked/marked.esm.js'

// marked.parse() clones and merges options, normalizes hooks, and revalidates
// them on every call. Those steps are identical for every input, and with no
// tokenizer, hooks, extensions, walkTokens, or renderer overrides the merged
// options equal this object exactly. Lexer.lex and Parser.parse then perform
// the same lexing and rendering marked's own parse() runs, so the HTML is
// byte-identical while the per-call setup is paid only once at module load.
const options = getDefaults()
options.tokenizer = null
options.hooks = null
options.walkTokens = null
options.extensions = null
options.renderer = null
options.async = false
options.breaks = false
options.pedantic = false
options.silent = false
options.gfm = true

// One Lexer and one Parser are reused instead of constructing both for every
// case. Both constructors only set options and empty state, so resetting the
// few mutable fields below to exactly their constructor values (verified on
// every practice case) reproduces a fresh instance while skipping two
// allocations and their initialization per call.
const lexer = new Lexer(options)
const parser = new Parser(options)
const state = lexer.state
const links = lexer.tokens.links
const lex = lexer.lex.bind(lexer)
const render = parser.parse.bind(parser)

export function parse(markdown) {
  lexer.tokens.length = 0
  for (const key in links) delete links[key]
  lexer.inlineQueue.length = 0
  state.inLink = false
  state.inRawBlock = false
  state.linkEmitted = false
  state.linkParenPossible = true
  state.top = true
  return render(lex(markdown))
}
