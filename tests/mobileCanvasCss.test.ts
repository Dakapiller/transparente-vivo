import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const css = readFileSync(join(process.cwd(), 'src', 'App.css'), 'utf8')
const app = readFileSync(join(process.cwd(), 'src', 'App.tsx'), 'utf8')
const mobileOrbitLines = readFileSync(
  join(process.cwd(), 'src', 'assets', 'figma', 'vectors', 'ecosystem-orbit-mobile-lines.svg'),
  'utf8',
)

function mobileRule(selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(
    new RegExp(`@media \\(max-width: 760px\\) \\{[\\s\\S]*?${escapedSelector} \\{([\\s\\S]*?)\\n  \\}`),
  )
  assert.ok(match, `missing mobile rule for ${selector}`)
  return match[1]
}

function baseRule(selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`\\n${escapedSelector} \\{([\\s\\S]*?)\\n\\}`))
  assert.ok(match, `missing base rule for ${selector}`)
  return match[1]
}

test('mobile layout preserves the centered 390px Figma canvas', () => {
  assert.match(css, /@media \(max-width: 760px\) \{[\s\S]*?--wrap: 390px;/)
  assert.match(
    css,
    /@media \(max-width: 760px\) \{[\s\S]*?\.wrap \{[\s\S]*?max-width: 390px;[\s\S]*?width: 100%;[\s\S]*?\}/,
  )
})

test('mobile ecosystem uses the composed Figma orbit-line layer', () => {
  assert.match(app, /ecosystem-orbit-mobile-lines\.svg/)
  assert.match(app, /className="orbit-lines-mobile"/)
  assert.match(mobileOrbitLines, /viewBox="0 0 359 360"/)
  assert.equal([...mobileOrbitLines.matchAll(/stroke="#E5F3FF"/g)].length, 12)
  assert.doesNotMatch(mobileOrbitLines, /#0290FE/)
  assert.match(baseRule('.orbit-lines-mobile'), /display: none;/)
  assert.match(
    mobileRule('.orbit-lines-mobile'),
    /display: block;[\s\S]*?height: 360px;[\s\S]*?width: 359px;[\s\S]*?z-index: 0;/,
  )
})

test('mobile ecosystem suppresses the desktop connector and ring fragments', () => {
  assert.match(mobileRule('.orbit-link'), /display: none;/)
  assert.match(mobileRule('.orbit-ring'), /display: none;/)
  assert.match(
    css,
    /@media \(max-width: 760px\) \{[\s\S]*?\.orbit-node \.orbit-icon,[\s\S]*?\.orbit-node \.orbit-culture-icon \{[\s\S]*?z-index: 2;[\s\S]*?\}/,
  )
})

test('mobile history timeline includes the Figma dashed connector segment', () => {
  assert.match(
    css,
    /@media \(max-width: 760px\) \{[\s\S]*?\.timeline::before \{[\s\S]*?repeating-linear-gradient\([\s\S]*?180deg,[\s\S]*?var\(--blue-dark\) 0 8px,[\s\S]*?transparent 8px 16px[\s\S]*?\) 28px 105px \/ 4px 80px no-repeat,[\s\S]*?\}/,
  )
})

test('mobile history timeline rules are centered through the milestone dots', () => {
  assert.match(css, /\.timeline-dot \{[\s\S]*?left: 20px;[\s\S]*?width: 20px;/)
  assert.match(
    css,
    /@media \(max-width: 760px\) \{[\s\S]*?\.timeline::before \{[\s\S]*?28px 10px \/ 4px 94px no-repeat,[\s\S]*?28px 105px \/ 4px 80px no-repeat,[\s\S]*?28px 192px \/ 4px 87px no-repeat,[\s\S]*?28px 284px \/ 4px 86px no-repeat;/,
  )
})
