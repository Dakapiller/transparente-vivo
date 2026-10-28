import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const app = readFileSync(join(process.cwd(), 'src', 'App.tsx'), 'utf8')
const motion = readFileSync(join(process.cwd(), 'src', 'motion', 'gsap.ts'), 'utf8')
const css = readFileSync(join(process.cwd(), 'src', 'App.css'), 'utf8')

// ScrollTrigger.refresh() scrolls the window to 0 and back. Running it while the
// visitor scrolls or swipes made the page jump to the top, so it must only run
// for real layout changes, deferred until scrolling stops.
test('ScrollTrigger is never refreshed from image load events', () => {
  assert.doesNotMatch(app, /addEventListener\('load', refresh/)
  assert.doesNotMatch(app, /ScrollTrigger\.refresh\(\)/)
  assert.match(app, /new ResizeObserver\(/)
  assert.match(app, /ScrollTrigger\.refresh\(true\)/)
})

test('GSAP does not auto-refresh on window load', () => {
  assert.match(motion, /autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize'/)
  assert.match(motion, /ignoreMobileResize: true/)
})

test('mobile sign photo reserves its box before it loads', () => {
  assert.match(css, /aspect-ratio: 1067 \/ 1600;/)
  assert.match(app, /className="sign-image" height=\{1600\} src=\{signCtaImage\} width=\{1067\}/)
})
