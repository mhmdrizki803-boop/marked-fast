# markdown-render-speed-02 — a faster drop-in for marked

[![make.fun · markdown-render-speed-02](https://make.fun/badge/markdown-render-speed-02.svg)](https://make.fun/bounty/markdown-render-speed-02)
[![rank](https://make.fun/badge/markdown-render-speed-02/mhmdrizki803-boop/marked-fast/rank.svg)](https://make.fun/bounty/markdown-render-speed-02/leaderboard)
[![reward](https://make.fun/badge/markdown-render-speed-02/mhmdrizki803-boop/marked-fast/reward.svg)](https://make.fun/bounty/markdown-render-speed-02)

`parse(markdown)` returns exactly the HTML that marked 18.1.3 renders with its defaults — GFM on,
breaks off, async off — and does it without the per-call setup marked's own entry point pays for.

`marked.parse()` builds a fresh options object from two spreads and re-checks its hooks on every
call, which is identical work for every string. This entry calls the same lexer and the same parser
that marked itself uses, on one options object, so the HTML is byte-identical by construction rather
than by reimplementation.

    MAKEFUN_INPUT_DIR=in MAKEFUN_OUTPUT_DIR=out node main.ts

Vendored: `vendor/marked/` is marked 18.1.3's npm build, byte for byte, with its MIT licence and
notice. Everything else here is the entry's own.

Entered for [make.fun's markdown render speed bounty](https://make.fun/bounty/markdown-render-speed-02).

MIT licensed (see LICENSE).
