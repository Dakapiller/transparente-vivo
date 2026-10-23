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

test('gallery wrapper and arrows use desktop side placement', () => {
  assert.match(blockFor('.gallery-section'), /background: #ffffff;/)
  assert.match(blockFor('.gallery-section'), /height: 820px;/)
  assert.match(blockFor('.gallery-wrap'), /left: calc\(var\(--side\) \+ 1px\);/)
  assert.match(
    blockFor('.gallery-wrap'),
    /width: min\(1381px, calc\(100vw - var\(--side\) - 1px\)\);/,
  )
  assert.match(blockFor('.gallery-viewport'), /overflow: hidden;/)
  assert.match(blockFor('.gallery-viewport'), /touch-action: pan-y pinch-zoom;/)
  assert.match(blockFor('.gallery-slide img'), /border-radius: 10px;/)
  assert.match(blockFor('.gallery-slide img'), /object-position: center center;/)
  assert.match(blockFor('.gallery-prev'), /left: -84px;/)
  assert.match(blockFor('.gallery-prev'), /top: 225px;/)
  assert.match(blockFor('.gallery-next'), /right: 66px;/)
  assert.match(blockFor('.gallery-next'), /top: 225px;/)
})

test('gallery carousel renders the original images once inside Embla slides', () => {
  assert.equal(
    app.match(/import galleryCommunity\d+ from '\.\/assets\/figma\/gallery\/gallery-\d+\.jpg'/g)?.length,
    21,
  )
  assert.match(
    app,
    /const galleryCommunityImages = \[\n {2}galleryCommunity13,\n {2}galleryCommunity04,\n {2}galleryCommunity20,\n {2}galleryCommunity01,\n {2}galleryCommunity17,\n {2}galleryCommunity18,\n {2}galleryCommunity24,\n {2}galleryCommunity06,\n {2}galleryCommunity26,\n {2}galleryCommunity09,\n {2}galleryCommunity14,\n {2}galleryCommunity23,\n {2}galleryCommunity08,\n {2}galleryCommunity10,\n {2}galleryCommunity27,\n {2}galleryCommunity11,\n {2}galleryCommunity25,\n {2}galleryCommunity16,\n {2}galleryCommunity22,\n {2}galleryCommunity28,\n {2}galleryCommunity29,\n\] as const/,
  )
  assert.match(app, /const galleryImages = galleryCommunityImages/)
  assert.doesNotMatch(app, /galleryTrackImages/)
  assert.match(app, /galleryImages\.map\(\(image\) => \(/)
  assert.match(app, /className="gallery-viewport" ref=\{galleryViewportRef\}/)
  assert.match(app, /className="gallery-slide" key=\{image\}/)
  assert.match(app, /loading="lazy"/)
  assert.match(app, /decoding="async"/)
})

test('looping gallery keeps both overlap masks visible', () => {
  assert.match(app, /className="gallery-fade gallery-fade--left"/)
  assert.doesNotMatch(app, /gallery-fade--hidden/)

  const rightFade = blockFor('.gallery-fade')
  const leftFade = blockFor('.gallery-fade--left')

  assert.match(rightFade, /background: linear-gradient\(90deg, rgba\(255, 255, 255, 0\), #ffffff 137px, #ffffff\);/)
  assert.match(rightFade, /height: 513px;/)
  assert.match(rightFade, /pointer-events: none;/)
  assert.match(rightFade, /right: calc\(-1 \* var\(--side\)\);/)
  assert.match(rightFade, /top: 0;/)
  assert.match(rightFade, /width: calc\(var\(--side\) \+ 185px\);/)
  assert.match(rightFade, /z-index: 3;/)

  assert.match(leftFade, /background: linear-gradient\(90deg, #ffffff, #ffffff calc\(100% - 137px\), rgba\(255, 255, 255, 0\)\);/)
  assert.match(leftFade, /left: calc\(-1 \* var\(--side\) - 1px\);/)
  assert.match(leftFade, /right: auto;/)
  assert.match(leftFade, /width: calc\(var\(--side\) \+ 1px\);/)

})

test('gallery arrows use gallery-specific Figma assets', () => {
  assert.match(app, /import galleryArrowPrev from '\.\/assets\/figma\/vectors\/gallery-arrow-prev\.svg'/)
  assert.match(app, /import galleryArrowNext from '\.\/assets\/figma\/vectors\/gallery-arrow-next\.svg'/)
  assert.match(app, /className="gallery-prev"[\s\S]*iconSrc=\{galleryArrowPrev\}/)
  assert.match(app, /className="gallery-next"[\s\S]*iconSrc=\{galleryArrowNext\}/)
})

test('gallery next arrow moves beside the stage on 4k viewports', () => {
  assert.match(
    css,
    /@media \(min-width: 2200px\) \{[\s\S]*?\.gallery-next \{[\s\S]*?left: calc\(100% \+ 20px\);[\s\S]*?right: auto;[\s\S]*?\}/,
  )
})

test('gallery hides the arrows in the mobile/tablet range (swipe-only)', () => {
  // At <=1100px the natural-flow mobile treatment applies; the carousel is
  // swipe-driven and the prev/next arrows are hidden.
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.gallery-fade,\n {2}\.gallery-fade--left,\n {2}\.gallery-prev,\n {2}\.gallery-next \{[\s\S]*?display: none;[\s\S]*?\}/,
  )
})

test('mobile gallery clips at the Embla viewport, not the moving track', () => {
  assert.match(
    css,
    /\.gallery-viewport \{[\s\S]*?overflow: hidden;[\s\S]*?touch-action: pan-y pinch-zoom;[\s\S]*?\}/,
  )
  assert.doesNotMatch(
    blockFor('.gallery-track'),
    /overflow:/,
  )
})
