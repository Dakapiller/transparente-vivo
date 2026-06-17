import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const css = readFileSync(join(process.cwd(), 'src', 'App.css'), 'utf8')
const app = readFileSync(join(process.cwd(), 'src', 'App.tsx'), 'utf8')
const campaignArrow = readFileSync(
  join(process.cwd(), 'src', 'assets', 'figma', 'vectors', 'campaign-arrow.svg'),
  'utf8',
)

function blockFor(selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`${escapedSelector} \\{([\\s\\S]*?)\\n\\}`))

  assert.ok(match, `Missing CSS block for ${selector}`)

  return match[1]
}

test('campaign buttons use the Figma vector arrow instead of a text glyph', () => {
  assert.match(app, /campaignArrow/)
  assert.doesNotMatch(app, /campaignArrowLine/)
  assert.doesNotMatch(app, /campaignArrowHeadTop/)
  assert.doesNotMatch(app, /campaignArrowHeadBottom/)
  assert.doesNotMatch(app, />\\s*→\\s*</)
  assert.doesNotMatch(css, /\.button-arrow span,\s*\n\.button-arrow img/)
  assert.doesNotMatch(app, /className="button-arrow-line"/)
  assert.doesNotMatch(app, /className="button-arrow-head/)
  assert.match(campaignArrow, /width="60" height="36" viewBox="0 0 60 36"/)
  assert.match(campaignArrow, /M3\.75988e-06 17\.5901C3\.78957e-06 16\.9108/)
  assert.match(campaignArrow, /M58\.2285 15\.7535C57\.7445 16\.2302/)
  assert.match(campaignArrow, /M58\.2285 19\.5033C57\.7445 19\.0267/)

  const button = blockFor('.campaign-button')
  const arrow = blockFor('.button-arrow')
  const arrowImage = blockFor('.button-arrow img')

  assert.match(button, /position: relative;/)
  assert.match(arrow, /height: 36px;/)
  assert.match(arrow, /position: absolute;/)
  assert.match(arrow, /right: 23px;/)
  assert.match(arrow, /top: 14px;/)
  assert.match(arrow, /width: 60px;/)
  assert.match(arrowImage, /display: block;/)
  assert.match(arrowImage, /height: 100%;/)
  assert.match(arrowImage, /max-width: none;/)
  assert.match(arrowImage, /width: 100%;/)
})
