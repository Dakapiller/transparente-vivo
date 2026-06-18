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

test('sign CTA buttons are stacked to match the Figma desktop rows', () => {
  assert.match(app, /<div className="sign-actions">[\s\S]*campaign-button--whatsapp/)
  assert.match(blockFor('.sign-layout'), /position: relative;/)
  assert.match(blockFor('.sign-title'), /position: absolute;/)
  assert.match(blockFor('.sign-title'), /top: 174px;/)
  assert.match(blockFor('.sign-layout p'), /position: absolute;/)
  assert.match(blockFor('.sign-layout p'), /top: 366px;/)
  assert.match(blockFor('.sign-actions'), /display: grid;/)
  assert.match(blockFor('.sign-actions'), /gap: 26px;/)
  assert.match(blockFor('.sign-actions'), /left: 0;/)
  assert.match(blockFor('.sign-actions'), /position: absolute;/)
  assert.match(blockFor('.sign-actions'), /top: 544px;/)
  assert.match(blockFor('.sign-actions'), /width: 400px;/)
})

test('WhatsApp CTA uses the Figma outline button and icon asset', () => {
  assert.match(app, /import whatsappIcon from '\.\/assets\/figma\/vectors\/whatsapp\.svg'/)
  assert.match(app, /<img alt="" src=\{whatsappIcon\} \/>/)
  assert.match(blockFor('.campaign-button--whatsapp'), /border: 1px solid var\(--muted\);/)
  assert.match(blockFor('.campaign-button--whatsapp'), /height: 64px;/)
  assert.match(blockFor('.campaign-button--whatsapp img'), /height: 34px;/)
  assert.match(blockFor('.campaign-button--whatsapp img'), /width: 34px;/)
})
