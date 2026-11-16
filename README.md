# make.fun markdown-render-speed-02
[![make.fun · markdown-render-speed-02](https://make.fun/badge/markdown-render-speed-02.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![rank](https://make.fun/badge/markdown-render-speed-02/mhmdrizki803-boop/marked-fast/rank.svg)](https://make.fun/bounty/markdown-render-speed-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![reward](https://make.fun/badge/markdown-render-speed-02/mhmdrizki803-boop/marked-fast/reward.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)


Entry for make.fun's **markdown-render-speed-02** bounty: render Markdown to
exactly the HTML that marked 18.1.3 produces with its defaults (GFM on, breaks
off, async off), as fast as possible.

This entry exports `parse(markdown)` from `parse.js`. Instead of calling
`marked.parse()`, it takes marked's `getDefaults()` option object once at module
load and reuses it for every input, skipping the per-call option spreads, hook
normalization, and option re-checks that are identical for every string. It
then runs `Parser.parse(Lexer.lex(markdown, options), options)` with the same
object handed to both stages. With no tokenizer, hooks, extensions, walkTokens,
or renderer overrides, those options are exactly what marked itself would
merge, and marked's own `parse()` delegates to the same lexer and parser, so the
output is byte-identical.

`main.ts` is the scored driver. It reads `cases.json`, renders each case, and
streams the JSON array of HTML strings to `html.json`, flushing in ~256 KB
chunks so neither a large array nor a full-document string is kept live.

Run it with:

```sh
MAKEFUN_INPUT_DIR=in MAKEFUN_OUTPUT_DIR=out node main.ts
```

The renderer is a vendored, unmodified copy of
[marked](https://github.com/markedjs/marked) 18.1.3 at
`vendor/marked/marked.esm.js`; all credit for the parser and renderer goes to
the marked project and its contributors.
