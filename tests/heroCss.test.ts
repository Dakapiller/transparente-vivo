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

test('desktop hero image reaches the viewport right edge from inside the wrapper', () => {
  const heroImage = blockFor('.hero-image')

  assert.match(heroImage, /position: absolute;/)
  assert.match(heroImage, /right: calc\(-1 \* var\(--side\) - 31px\);/)
  assert.match(heroImage, /width: 741px;/)
})

test('4k hero image keeps the Figma content offset instead of reaching the viewport edge', () => {
  assert.match(
    css,
    /@media \(min-width: 2200px\) \{[\s\S]*?\.hero-image \{[\s\S]*?right: -31px;[\s\S]*?\}/,
  )
})
