import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const css = readFileSync(join(process.cwd(), 'src', 'App.css'), 'utf8')
const app = readFileSync(join(process.cwd(), 'src', 'App.tsx'), 'utf8')

function blockFor(selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`${escapedSelector} \\{([\\s\\S]*?)\\n\\}`))

  assert.ok(match, `Missing CSS block for ${selector}`)

  return match[1]
}

test('beliefs kicker uses the muted Figma text color', () => {
  assert.match(blockFor('.beliefs-kicker'), /color: var\(--muted\);/)
})

test('belief icons preserve the provided SVG dimensions', () => {
  assert.match(blockFor('.belief-card li img'), /max-height: 31px;/)
  assert.match(blockFor('.belief-card li img'), /width: 40px;/)
  assert.match(blockFor('.belief-card--demolish li img'), /width: 30px;/)
})

test('belief rows use Figma separator assets with card-specific colors', () => {
  assert.match(app, /className="belief-separator"/)
  assert.match(app, /index < copy\.beliefs\.preserve\.items\.length - 1/)
  assert.match(app, /index < copy\.beliefs\.demolish\.items\.length - 1/)

  const row = blockFor('.belief-card li')
  const separator = blockFor('.belief-separator')
  const preserveSeparator = blockFor('.belief-card--preserve .belief-separator')
  const demolishSeparator = blockFor('.belief-card--demolish .belief-separator')

  assert.doesNotMatch(row, /border-bottom:/)
  assert.match(row, /position: relative;/)
  assert.match(row, /gap: var\(--belief-row-gap\);/)
  assert.match(row, /grid-template-columns: var\(--belief-icon-column\) 1fr;/)
  assert.match(separator, /mask-image: url\('\.\/assets\/figma\/vectors\/menu-separator\.svg'\);/)
  assert.match(separator, /height: 2px;/)
  assert.match(separator, /left: var\(--belief-separator-left\);/)
  assert.match(separator, /position: absolute;/)
  assert.match(separator, /top: 92px;/)
  assert.match(separator, /width: var\(--belief-separator-width\);/)
  assert.match(preserveSeparator, /background: var\(--blue\);/)
  assert.match(blockFor('.belief-card--preserve'), /--belief-icon-column: 40px;/)
  assert.match(blockFor('.belief-card--preserve'), /--belief-row-gap: 43px;/)
  assert.match(blockFor('.belief-card--preserve'), /--belief-separator-left: 83px;/)
  assert.match(blockFor('.belief-card--preserve'), /--belief-separator-width: 466px;/)
  assert.match(demolishSeparator, /background: var\(--muted\);/)
  assert.match(blockFor('.belief-card--demolish'), /--belief-icon-column: 30px;/)
  assert.match(blockFor('.belief-card--demolish'), /--belief-row-gap: 33px;/)
  assert.match(blockFor('.belief-card--demolish'), /--belief-separator-left: 64px;/)
  assert.match(blockFor('.belief-card--demolish'), /--belief-separator-width: 485px;/)
})
