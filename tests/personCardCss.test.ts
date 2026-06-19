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

test('person cards use the Figma rounded rectangle surface', () => {
  const block = blockFor('.person-card')

  assert.match(block, /background: #f8f8f8;/)
  assert.doesNotMatch(block, /\n {2}border:/)
  assert.match(block, /border-radius: 9\.227px;/)
  assert.match(block, /box-shadow: 0 1\.172px 2\.344px rgba\(0, 0, 0, 0\.25\);/)
  assert.match(block, /height: 512\.164px;/)
  assert.match(block, /overflow: hidden;/)
  assert.match(block, /padding: 0;/)
})

test('person card inner elements use Figma forms and offsets', () => {
  assert.match(blockFor('.portrait-frame'), /left: 11\.585px;/)
  assert.doesNotMatch(blockFor('.portrait-frame'), /\n {2}border:/)
  assert.match(blockFor('.portrait-frame'), /top: 11\.072px;/)
  assert.match(blockFor('.portrait-frame-lines'), /height: 317\.438px;/)
  assert.match(blockFor('.portrait-frame-lines'), /width: 269\.421px;/)
  assert.match(blockFor('.portrait-mask'), /height: 281\.28px;/)
  assert.match(blockFor('.portrait-mask'), /left: 16\.543px;/)
  assert.match(blockFor('.portrait-mask'), /overflow: hidden;/)
  assert.match(blockFor('.portrait-mask'), /top: 17\.056px;/)
  assert.match(blockFor('.portrait-mask'), /width: 237\.916px;/)
  assert.match(blockFor('.portrait-image'), /height: var\(--portrait-image-height\);/)
  assert.match(blockFor('.portrait-image'), /left: var\(--portrait-image-left\);/)
  assert.match(blockFor('.portrait-image'), /top: var\(--portrait-image-top\);/)
  assert.match(blockFor('.portrait-image'), /width: var\(--portrait-image-width\);/)
  assert.match(blockFor('.person-card blockquote'), /font-size: 23px;/)
  assert.match(blockFor('.person-card blockquote'), /font-weight: 700;/)
  assert.match(blockFor('.person-card blockquote'), /left: 28px;/)
  assert.match(blockFor('.person-card blockquote'), /line-height: 1\.2;/)
  assert.match(blockFor('.person-card blockquote'), /text-indent: -10\.35px;/)
  assert.match(blockFor('.person-card blockquote'), /top: 341px;/)
  assert.match(blockFor('.person-meta'), /left: 28\.128px;/)
  assert.match(blockFor('.person-meta'), /top: 446\.532px;/)
  assert.match(blockFor('.person-meta h3'), /font-size: 23px;/)
  assert.match(blockFor('.person-meta h3'), /font-weight: 700;/)
  assert.match(blockFor('.person-meta span:first-of-type'), /color: var\(--muted\);/)
  assert.match(blockFor('.person-meta span:last-child'), /color: #b6bbd0;/)
  assert.match(blockFor('.person-meta span:last-child'), /text-align: right;/)
})

test('people carousel arrows preserve Figma wrapper orientation', () => {
  assert.match(css, /\.people-prev img,\n\.people-next img \{[\s\S]*?transform-origin: center;/)
  assert.match(css, /\.people-prev img \{\n {2}transform: rotate\(180deg\);\n\}/)
  assert.match(css, /\.people-next img \{\n {2}transform: scaleY\(-1\);\n\}/)
})

test('people carousel arrows sit beside cards and remain visible on desktop', () => {
  assert.match(blockFor('.people-prev'), /left: -84px;/)
  assert.match(blockFor('.people-next'), /right: 66px;/)
})

test('people carousel uses the same right fade treatment as the photo slider', () => {
  assert.match(
    app,
    /<div className="people-viewport">[\s\S]*?<div aria-hidden="true" className="people-fade" \/>[\s\S]*?<ArrowButton\s+className="people-prev"/,
  )

  const block = blockFor('.people-fade')

  assert.match(block, /background: linear-gradient\(90deg, rgba\(255, 255, 255, 0\), #ffffff 74%\);/)
  assert.match(block, /height: 720px;/)
  assert.match(block, /pointer-events: none;/)
  assert.match(block, /position: absolute;/)
  assert.match(block, /right: 0;/)
  assert.match(block, /top: -121px;/)
  assert.match(block, /width: 185px;/)
  assert.match(block, /z-index: 3;/)
})

test('people carousel expands the full card run and moves next arrow beside it on 4k viewports', () => {
  assert.match(
    css,
    /@media \(min-width: 2200px\) \{[\s\S]*?\.people-viewport \{[\s\S]*?width: 1545px;[\s\S]*?\}[\s\S]*?\.people-next \{[\s\S]*?left: calc\(100% \+ 20px\);[\s\S]*?right: auto;[\s\S]*?\}/,
  )
})

test('people carousel hides the arrows in the mobile/tablet range (swipe-only)', () => {
  // At <=1100px the natural-flow mobile treatment applies; the carousel is
  // swipe-driven and the prev/next arrows are hidden.
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.people-prev,\n {2}\.people-next \{[\s\S]*?display: none;[\s\S]*?\}/,
  )
})
