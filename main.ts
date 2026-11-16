// The driver the harness runs: node main.ts (node 22). It reads every case from /input/cases.json
// (a JSON array of {id, markdown}), renders each one alone with parse() from parse.js, and writes
// /output/html.json: a JSON array of the HTML strings, one per case, in the cases' order.
//
// MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR stand in for /input and /output outside the container.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases: { id: string; markdown: string }[] = JSON.parse(
  readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8'),
);

mkdirSync(OUTPUT_DIR, { recursive: true });

// One renderer buffer, grown once: the 720 cases run to a couple of megabytes of HTML and pushing
// into one array is cheaper than a string that is copied on every concatenation.
const html: string[] = new Array(cases.length);
for (let i = 0; i < cases.length; i += 1) html[i] = parse(cases[i].markdown);

writeFileSync(join(OUTPUT_DIR, 'html.json'), JSON.stringify(html));
