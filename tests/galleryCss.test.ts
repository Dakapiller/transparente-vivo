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
  assert.match(blockFor('.gallery-wrap'), /left: calc\(var\(--side\) \+ 1px\);/)
  assert.match(
    blockFor('.gallery-wrap'),
    /width: min\(1381px, calc\(100vw - var\(--side\) - 1px\)\);/,
  )
  assert.match(blockFor('.gallery-prev'), /left: -84px;/)
  assert.match(blockFor('.gallery-prev'), /top: 225px;/)
  assert.match(blockFor('.gallery-next'), /right: 16px;/)
  assert.match(blockFor('.gallery-next'), /top: 225px;/)
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

test('gallery keeps the previous arrow inside the 1024px viewport', () => {
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.gallery-prev \{[\s\S]*?left: calc\(-1 \* var\(--side\) \+ 24px\);[\s\S]*?\}/,
  )
})
