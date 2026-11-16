import { mkdirSync, openSync, readFileSync, writeSync, closeSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from './parse.js'

type Case = { id: string; markdown: string }

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input'
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output'

const cases = JSON.parse(
  readFileSync(join(inputDir, 'cases.json'), 'utf8'),
) as Case[]

mkdirSync(outputDir, { recursive: true })
const fd = openSync(join(outputDir, 'html.json'), 'w')

const FLUSH_AT = 256 * 1024
let pending = '['

for (let i = 0; i < cases.length; i++) {
  const html = JSON.stringify(parse(cases[i].markdown))
  pending += i === 0 ? html : ',' + html
  if (pending.length >= FLUSH_AT) {
    writeSync(fd, pending)
    pending = ''
  }
}

pending += ']'
writeSync(fd, pending)
closeSync(fd)
