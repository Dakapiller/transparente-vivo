import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const css = readFileSync(join(process.cwd(), 'src', 'App.css'), 'utf8')
const app = readFileSync(join(process.cwd(), 'src', 'App.tsx'), 'utf8')
const dir = join(process.cwd(), 'src', 'assets', 'figma', 'vectors')
const mobileOrbitConnectors = readFileSync(join(dir, 'ecosystem-orbit-mobile-connectors.svg'), 'utf8')

function mobileRule(selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(
    new RegExp(`@media \\(max-width: 1100px\\) \\{[\\s\\S]*?${escapedSelector} \\{([\\s\\S]*?)\\n  \\}`),
  )
  assert.ok(match, `missing mobile rule for ${selector}`)
  return match[1]
}

test('mobile layout preserves the centered 390px Figma canvas', () => {
  assert.match(css, /@media \(max-width: 1100px\) \{[\s\S]*?--wrap: 390px;/)
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.wrap \{[\s\S]*?max-width: 390px;[\s\S]*?width: 100%;[\s\S]*?\}/,
  )
})

test('mobile ecosystem blooms each node with its own ring; connectors are separate', () => {
  // Each node carries its own .orbit-ring (shown on mobile) so the ring blooms
  // with the node's icon + label — never a bare ring. The connector arcs live in
  // their own layer so they can be revealed last, matching desktop order.
  assert.match(app, /ecosystem-orbit-mobile-connectors\.svg/)
  assert.match(app, /className="orbit-connectors-mobile"/)
  assert.match(app, /className="orbit-ring"/)
  assert.match(mobileOrbitConnectors, /viewBox="0 0 359 360"/)
  assert.equal([...mobileOrbitConnectors.matchAll(/stroke="#E5F3FF"/g)].length, 4)
  // Per-node ring is visible on mobile (overriding the desktop-only base hide).
  assert.match(mobileRule('.orbit-ring'), /display: block;[\s\S]*?z-index: 0;/)
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.orbit-connectors-mobile \{[\s\S]*?display: block;[\s\S]*?width: 359px;[\s\S]*?z-index: 0;/,
  )
})

test('mobile ecosystem suppresses the desktop connector images', () => {
  // The desktop .orbit-link connector images are hidden on mobile (mobile uses
  // its own connectors layer); the per-node .orbit-ring stays visible.
  assert.match(mobileRule('.orbit-link'), /display: none;/)
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.orbit-node \.orbit-icon,[\s\S]*?\.orbit-node \.orbit-culture-icon \{[\s\S]*?z-index: 2;[\s\S]*?\}/,
  )
})

test('mobile history timeline keeps the dashed connector segment in natural flow', () => {
  // Flow rewrite: the connector line is drawn per milestone via article::before
  // rather than one fixed-pixel gradient. The 2nd segment stays dashed.
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.timeline article:nth-of-type\(2\)::before \{[\s\S]*?repeating-linear-gradient\([\s\S]*?180deg,[\s\S]*?var\(--blue-dark\) 0 8px,[\s\S]*?transparent 8px 16px[\s\S]*?\)[\s\S]*?\}/,
  )
})

test('mobile history timeline flows milestones with a per-item connector and orange end', () => {
  // Dots align to the left rail; the final segment is orange like the desktop rhythm.
  assert.match(mobileRule('.timeline-dot'), /left: 0;[\s\S]*?width: 20px;/)
  assert.match(mobileRule('.timeline article'), /position: relative;/)
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.timeline article::before \{[\s\S]*?background: var\(--blue-dark\);[\s\S]*?\}/,
  )
  assert.match(
    css,
    /@media \(max-width: 1100px\) \{[\s\S]*?\.timeline article:nth-of-type\(4\)::before \{[\s\S]*?background: var\(--orange\);[\s\S]*?\}/,
  )
})
