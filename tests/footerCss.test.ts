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

test('footer about copy uses regular Figma text without a hard border top', () => {
  const footerAbout = blockFor('.footer-about')

  assert.match(blockFor('.footer-layout'), /align-items: flex-start;/)
  assert.doesNotMatch(footerAbout, /border-top:/)
  assert.match(footerAbout, /font-size: 20px;/)
  assert.match(footerAbout, /font-weight: 400;/)
  assert.match(footerAbout, /position: relative;/)
})

test('footer about emphasizes the Transparente Vivo brand phrase only', () => {
  assert.match(app, /footerAboutBrand = 'Transparente Vivo'/)
  assert.match(app, /className="footer-about-brand"/)

  const footerBrand = blockFor('.footer-about .footer-about-brand')

  assert.match(footerBrand, /color: inherit;/)
  assert.match(footerBrand, /font-size: inherit;/)
  assert.match(footerBrand, /font-weight: 700;/)
  assert.match(footerBrand, /letter-spacing: 0;/)
  assert.match(footerBrand, /line-height: inherit;/)
  assert.match(footerBrand, /text-transform: none;/)
})

test('footer about top rule is the rounded Figma shape', () => {
  const footerRule = blockFor('.footer-about::before')

  assert.match(footerRule, /background: var\(--blue\);/)
  assert.match(footerRule, /border-radius: 999px;/)
  assert.match(footerRule, /height: 6\.298px;/)
  assert.match(footerRule, /top: 0;/)
  assert.match(footerRule, /width: 401\.881px;/)
})

test('footer contact labels and values use the Figma colors and type', () => {
  assert.match(blockFor('.site-footer address'), /margin-right: 0;/)

  const footerLabels = blockFor('.site-footer strong')
  const footerValues = blockFor('.site-footer a,\n.site-footer span')

  assert.match(footerLabels, /color: var\(--muted\);/)
  assert.match(footerLabels, /font-size: 12px;/)
  assert.match(footerLabels, /font-weight: 800;/)
  assert.match(footerLabels, /letter-spacing: 0\.6px;/)
  assert.match(footerLabels, /line-height: 1\.7;/)
  assert.match(footerLabels, /text-transform: uppercase;/)

  assert.match(footerValues, /color: var\(--blue\);/)
  assert.match(footerValues, /font-size: 12px;/)
  assert.match(footerValues, /font-weight: 800;/)
  assert.match(footerValues, /letter-spacing: 0\.6px;/)
  assert.match(footerValues, /line-height: 1\.7;/)
  assert.match(footerValues, /text-transform: uppercase;/)
})
