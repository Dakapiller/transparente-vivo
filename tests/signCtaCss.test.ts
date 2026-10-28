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
  assert.match(blockFor('.sign-section'), /background: linear-gradient\(180deg, #ffffff 0%, var\(--sky\) 28%, var\(--sky\) 100%\);/)
  assert.match(blockFor('.sign-layout'), /position: relative;/)
  assert.match(blockFor('.sign-title'), /position: absolute;/)
  assert.match(blockFor('.sign-title'), /top: 164px;/)
  assert.match(blockFor('.sign-layout p'), /position: absolute;/)
  assert.match(blockFor('.sign-layout p'), /top: 356px;/)
  assert.match(blockFor('.sign-actions'), /display: grid;/)
  assert.match(blockFor('.sign-actions'), /gap: 26px;/)
  assert.match(blockFor('.sign-actions'), /left: 0;/)
  assert.match(blockFor('.sign-actions'), /position: absolute;/)
  assert.match(blockFor('.sign-actions'), /top: 534px;/)
  assert.match(blockFor('.sign-actions'), /width: 400px;/)
})

test('sign CTA shows the community workspace image beside the copy on desktop', () => {
  assert.match(app, /import signCtaImage from '\.\/assets\/figma\/gallery\/gallery-15\.jpg'/)
  assert.match(app, /<img alt="" className="sign-image" height=\{1600\} src=\{signCtaImage\} width=\{1067\} \/>/)

  const image = blockFor('.sign-image')

  assert.match(image, /border-radius: 8px;/)
  assert.match(image, /height: 671px;/)
  assert.match(image, /object-fit: cover;/)
  assert.match(image, /position: absolute;/)
  assert.match(image, /right: 0;/)
  assert.match(image, /top: 91px;/)
  assert.match(image, /width: 562px;/)

  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.sign-image \{[\s\S]*?margin: 32px 0 0;[\s\S]*?position: static;[\s\S]*?width: 100%;[\s\S]*?\}/,
  )
})

test('WhatsApp CTA uses the Figma outline button and icon asset', () => {
  assert.match(app, /import whatsappIcon from '\.\/assets\/figma\/vectors\/whatsapp\.svg'/)
  assert.match(app, /<img alt="" src=\{whatsappIcon\} \/>/)
  assert.match(blockFor('.campaign-button--whatsapp'), /border: 1px solid var\(--muted\);/)
  assert.match(blockFor('.campaign-button--whatsapp'), /height: 64px;/)
  assert.match(blockFor('.campaign-button--whatsapp img'), /height: 34px;/)
  assert.match(blockFor('.campaign-button--whatsapp img'), /width: 34px;/)
})
