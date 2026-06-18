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

test('brand, menu, close, and language controls expose hover and active states', () => {
  assert.match(blockFor('.wordmark'), /transition:/)
  assert.match(blockFor('.wordmark:hover,\n.wordmark:focus-visible'), /opacity: 0\.82;/)
  assert.match(blockFor('.wordmark:active'), /transform: scale\(0\.985\);/)

  assert.match(blockFor('.menu-button'), /transition:/)
  assert.match(blockFor('.menu-close-button'), /transition:/)
  assert.match(
    blockFor('.menu-button:hover,\n.menu-button:focus-visible,\n.menu-close-button:hover,\n.menu-close-button:focus-visible'),
    /opacity: 0\.72;/,
  )
  assert.match(blockFor('.menu-button:active,\n.menu-close-button:active'), /transform: scale\(0\.94\);/)

  assert.match(blockFor('.language-toggle'), /transition:/)
  assert.match(blockFor('.language-toggle:hover,\n.language-toggle:focus-visible'), /color: var\(--blue\);/)
  assert.match(blockFor('.language-toggle:active'), /transform: translateY\(1px\);/)
  assert.match(blockFor('.language-option:active'), /background: var\(--sky\);/)
})

test('navigation, CTA, slider, and footer links expose hover and active states', () => {
  assert.match(blockFor('.desktop-menu-item a'), /transition:/)
  assert.match(
    blockFor('.desktop-menu-item a:hover,\n.desktop-menu-item a:focus-visible'),
    /color: var\(--blue-dark\);/,
  )
  assert.match(blockFor('.desktop-menu-item a:active'), /transform: translateX\(4px\);/)

  assert.match(blockFor('.campaign-button:active'), /transform: translateY\(1px\);/)
  assert.match(
    blockFor('.campaign-button--outline:hover,\n.campaign-button--outline:focus-visible,\n.campaign-button--whatsapp:hover,\n.campaign-button--whatsapp:focus-visible'),
    /border-color: var\(--blue-dark\);/,
  )
  assert.match(
    blockFor('.campaign-button--outline:active,\n.campaign-button--whatsapp:active'),
    /background: var\(--sky\);/,
  )

  assert.match(blockFor('.round-arrow'), /transition:/)
  assert.match(blockFor('.round-arrow:hover,\n.round-arrow:focus-visible'), /transform: scale\(1\.04\);/)
  assert.match(blockFor('.round-arrow:active'), /transform: scale\(0\.94\);/)

  assert.match(blockFor('.site-footer a'), /transition:/)
  assert.match(blockFor('.site-footer a:hover,\n.site-footer a:focus-visible'), /color: var\(--blue-dark\);/)
  assert.match(blockFor('.site-footer a:active'), /transform: translateY\(1px\);/)
})
