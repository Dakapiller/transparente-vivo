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

test('desktop menu icon uses the Figma hamburger dimensions', () => {
  const menuIcon = blockFor('.menu-button img')

  assert.match(menuIcon, /display: block;/)
  assert.match(menuIcon, /height: 28px;/)
  assert.match(menuIcon, /width: 36px;/)
})

test('desktop header controls keep the language selector fixed when menu opens', () => {
  const menuButton = blockFor('.menu-button')
  const closeButton = blockFor('.menu-close-button')

  assert.match(menuButton, /height: 36px;/)
  assert.match(menuButton, /width: 42px;/)
  assert.match(closeButton, /height: 36px;/)
  assert.match(closeButton, /width: 42px;/)
})

test('language selector uses a custom rendered dropdown', () => {
  assert.doesNotMatch(app, /<select\b/)
  assert.match(app, /function LanguageDropdown/)
  assert.match(app, /aria-haspopup="listbox"/)
  assert.match(app, /className="language-menu"/)

  const toggle = blockFor('.language-toggle')
  const menu = blockFor('.language-menu')
  const selectedOption = blockFor(".language-option[aria-selected='true']")

  assert.match(toggle, /background: transparent;/)
  assert.match(toggle, /font-size: 15px;/)
  assert.match(menu, /position: absolute;/)
  assert.match(menu, /border-radius: 8px;/)
  assert.match(menu, /box-shadow:/)
  assert.match(selectedOption, /background: var\(--sky\);/)
})

test('desktop menu rows use separate Figma separators centered between items', () => {
  assert.match(app, /menuSeparator/)
  assert.match(app, /className="desktop-menu-item"/)
  assert.match(app, /className="desktop-menu-separator"/)

  const list = blockFor('.desktop-menu-list')
  const item = blockFor('.desktop-menu-item')
  const link = blockFor('.desktop-menu-item a')
  const separator = blockFor('.desktop-menu-separator')

  assert.match(list, /top: 108px;/)
  assert.match(list, /width: 726px;/)
  assert.match(item, /height: 100px;/)
  assert.match(item, /position: relative;/)
  assert.doesNotMatch(link, /border-bottom:/)
  assert.match(link, /height: 40px;/)
  assert.match(link, /line-height: 1;/)
  assert.match(link, /padding: 0;/)
  assert.match(separator, /height: 2px;/)
  assert.match(separator, /left: 0;/)
  assert.match(separator, /position: absolute;/)
  assert.match(separator, /top: 70px;/)
  assert.match(separator, /width: 400px;/)
})
