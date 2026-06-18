import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const css = readFileSync(join(process.cwd(), 'src', 'App.css'), 'utf8')

function blockFor(selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`${escapedSelector} \\{([\\s\\S]*?)\\n\\}`))

  assert.ok(match, `Missing CSS block for ${selector}`)

  return match[1]
}

test('ecosystem orbit uses the Figma SVG stage dimensions and forms', () => {
  assert.doesNotMatch(css, /\.ecosystem-orbit::before \{/)
  assert.match(blockFor('.ecosystem-orbit'), /height: 603\.296px;/)
  assert.match(blockFor('.ecosystem-orbit'), /width: 602\.788px;/)
  assert.match(blockFor('.orbit-node'), /background: transparent;/)
  assert.match(blockFor('.orbit-node'), /height: 190\.825px;/)
  assert.match(blockFor('.orbit-node'), /width: 193\.788px;/)
})

test('ecosystem orbit nodes preserve the Figma desktop coordinates', () => {
  assert.match(blockFor('.orbit-node-0'), /left: 202px;/)
  assert.match(blockFor('.orbit-node-0'), /top: 0;/)
  assert.match(blockFor('.orbit-node-1'), /left: 409px;/)
  assert.match(blockFor('.orbit-node-1'), /top: 205px;/)
  assert.match(blockFor('.orbit-node-2'), /left: 202\.16px;/)
  assert.match(blockFor('.orbit-node-2'), /top: 412\.471px;/)
  assert.match(blockFor('.orbit-node-3'), /left: 0;/)
  assert.match(blockFor('.orbit-node-3'), /top: 202px;/)
})

test('ecosystem orbit connectors preserve the Figma wrapper coordinates', () => {
  assert.match(blockFor('.orbit-link-tl'), /left: 127\.055px;/)
  assert.match(blockFor('.orbit-link-tl'), /top: 133\.706px;/)
  assert.match(blockFor('.orbit-link-tr'), /left: 404\.209px;/)
  assert.match(blockFor('.orbit-link-tr'), /top: 127\.204px;/)
  assert.match(blockFor('.orbit-link-bl'), /left: 130\.914px;/)
  assert.match(blockFor('.orbit-link-bl'), /top: 419\.827px;/)
  assert.match(blockFor('.orbit-link-br'), /left: 412\.361px;/)
  assert.match(blockFor('.orbit-link-br'), /top: 414\.929px;/)
})

test('ecosystem orbit labels and icons use Figma offsets', () => {
  assert.match(blockFor('.orbit-node-0 .orbit-icon'), /left: 67\.107px;/)
  assert.match(blockFor('.orbit-node-0 .orbit-icon'), /top: 41\.518px;/)
  assert.match(blockFor('.orbit-node-1 .orbit-icon'), /left: 64\.313px;/)
  assert.match(blockFor('.orbit-node-1 .orbit-icon'), /top: 44\.518px;/)
  assert.match(blockFor('.orbit-node-2 .orbit-icon'), /left: 58\.581px;/)
  assert.match(blockFor('.orbit-node-2 .orbit-icon'), /top: 44\.058px;/)
  assert.match(blockFor('.orbit-node-3 .orbit-culture-icon'), /left: 62\.472px;/)
  assert.match(blockFor('.orbit-node-3 .orbit-culture-icon'), /top: 42\.518px;/)
  assert.match(blockFor('.orbit-node-0 .orbit-label'), /top: 127\.911px;/)
  assert.match(blockFor('.orbit-node-3 .orbit-label'), /left: 32px;/)
})

test('ecosystem orbit keeps icons and labels full blue at the tablet desktop breakpoint', () => {
  assert.match(blockFor('.orbit-label'), /color: var\(--blue\);/)
  assert.doesNotMatch(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.ecosystem-orbit \{[\s\S]*?opacity: 0\.35;/,
  )
})
