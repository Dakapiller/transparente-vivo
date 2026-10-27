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
  assert.match(blockFor('.portrait-mask'), /border-radius: 5px;/)
  assert.match(blockFor('.portrait-mask'), /overflow: hidden;/)
  assert.match(blockFor('.portrait-mask'), /top: 17\.056px;/)
  assert.match(blockFor('.portrait-mask'), /width: 237\.916px;/)
  assert.match(blockFor('.portrait-image'), /border-radius: 5px;/)
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
  assert.match(blockFor('.person-meta span'), /color: var\(--muted\);/)
  assert.match(app, /<span>\{person\.role\}<\/span>/)
  assert.doesNotMatch(app, /<span>\{person\.since\}<\/span>/)
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
    /<div className="people-viewport" ref=\{peopleViewportRef\}>[\s\S]*?<div aria-hidden="true" className="people-fade" \/>[\s\S]*?<ArrowButton\s+className="people-prev"/,
  )

  const block = blockFor('.people-fade')

  assert.match(block, /background: linear-gradient\(90deg, rgba\(255, 255, 255, 0\), #ffffff 137px, #ffffff\);/)
  assert.match(block, /height: 720px;/)
  assert.match(block, /pointer-events: none;/)
  assert.match(block, /position: absolute;/)
  assert.match(block, /right: calc\(-1 \* var\(--side\)\);/)
  assert.match(block, /top: -121px;/)
  assert.match(block, /width: calc\(var\(--side\) \+ 185px\);/)
  assert.match(block, /z-index: 3;/)
})

test('looping people carousel keeps the left fade visible', () => {
  assert.match(app, /className="people-fade people-fade--left"/)
  assert.doesNotMatch(app, /people-fade--hidden/)
})

test('people carousel left fade mirrors the right mask overlap', () => {
  const block = blockFor('.people-fade--left')

  assert.match(block, /background: linear-gradient\(90deg, #ffffff, #ffffff calc\(100% - 137px\), rgba\(255, 255, 255, 0\)\);/)
  assert.match(block, /left: calc\(-1 \* var\(--side\) - 4px\);/)
  assert.match(block, /width: calc\(var\(--side\) \+ 4px\);/)
})

test('person role labels use the full metadata width without rendered since labels', () => {
  const block = blockFor('.person-meta span')

  assert.match(block, /display: -webkit-box;/)
  assert.match(block, /overflow: hidden;/)
  assert.match(block, /-webkit-line-clamp: 2;/)
  assert.match(block, /-webkit-box-orient: vertical;/)
  assert.match(block, /width: 241\.432px;/)
})

test('mobile portrait image stays centered inside the frame', () => {
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.portrait-mask \{[\s\S]*?left: 50%;[\s\S]*?top: 50%;[\s\S]*?transform: translate\(-50%, -50%\);[\s\S]*?width: 203px;[\s\S]*?\}/,
  )
})

test('mobile people carousel fade stays over the photo frame only', () => {
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.people-carousel \{[\s\S]*?position: relative;[\s\S]*?\}[\s\S]*?\.people-fade \{[\s\S]*?display: block;[\s\S]*?height: 270\.851px;[\s\S]*?top: 9\.447px;[\s\S]*?width: 110px;[\s\S]*?\}/,
  )
})

test('people carousel expands the full card run and moves next arrow beside it on 4k viewports', () => {
  assert.match(
    css,
    /@media \(min-width: 2200px\) \{[\s\S]*?\.people-carousel \{[\s\S]*?width: 1545px;[\s\S]*?\}[\s\S]*?\.people-next \{[\s\S]*?left: calc\(100% \+ 20px\);[\s\S]*?right: auto;[\s\S]*?\}/,
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

test('person cards show only first name and job title, never a start year', () => {
  assert.doesNotMatch(app, /person\.since/)
  assert.match(app, /<h3>\{person\.name\}<\/h3>\s*<span>\{person\.role\}<\/span>/)
})
