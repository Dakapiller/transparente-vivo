import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

import { timelineMilestones, timelineSegments } from '../src/timelineLayout.ts'

const app = readFileSync(join(process.cwd(), 'src', 'App.tsx'), 'utf8')
const css = readFileSync(join(process.cwd(), 'src', 'App.css'), 'utf8')

function blockFor(selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`${escapedSelector} \\{([\\s\\S]*?)\\n\\}`))

  assert.ok(match, `Missing CSS block for ${selector}`)

  return match[1]
}

test('desktop timeline follows the Figma milestone coordinates', () => {
  assert.deepEqual(
    timelineMilestones.map((milestone) => ({
      dotLeft: milestone.dotLeft,
      textLeft: milestone.textLeft,
      textWidth: milestone.textWidth,
    })),
    [
      { dotLeft: 0, textLeft: 0, textWidth: 181 },
      { dotLeft: 248, textLeft: 248, textWidth: 181 },
      { dotLeft: 506, textLeft: 506, textWidth: 194 },
      { dotLeft: 765, textLeft: 765, textWidth: 181 },
      { dotLeft: 1011, textLeft: 1021, textWidth: 181 },
    ],
  )
})

test('desktop timeline uses Figma line segments instead of one generated rail', () => {
  assert.deepEqual(timelineSegments, [
    { variant: 'blue', left: 16, width: 243 },
    { variant: 'dashed', left: 247, width: 264 },
    { variant: 'blue', left: 522, width: 243 },
    { variant: 'orange', left: 784, width: 229 },
  ])
})

test('desktop timeline emits proportional coordinates so the terminal item stays visible', () => {
  const timeline = blockFor('.timeline')

  assert.match(app, /toTimelinePercent\(milestone\.dotLeft\)/)
  assert.match(app, /toTimelinePercent\(milestone\.textLeft\)/)
  assert.match(app, /toTimelinePercent\(milestone\.textWidth\)/)
  assert.match(app, /toTimelinePercent\(segment\.left\)/)
  assert.match(app, /toTimelinePercent\(segment\.width\)/)
  assert.match(timeline, /width: min\(1202px, calc\(100vw - var\(--side\) - 105px - 24px\)\);/)
})

test('desktop timeline dashed separator follows the Figma stroke dash rhythm', () => {
  const dashed = blockFor('.timeline-segment--dashed')

  assert.match(dashed, /var\(--blue-dark\) 0 8px,/)
  assert.match(dashed, /transparent 8px 16px/)
})
