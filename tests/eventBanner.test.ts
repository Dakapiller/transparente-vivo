import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

import { content, languages } from '../src/content.ts'

const app = readFileSync(join(process.cwd(), 'src', 'App.tsx'), 'utf8')
const css = readFileSync(join(process.cwd(), 'src', 'App.css'), 'utf8')

test('event banner links to the Luma event in a new tab, safely', () => {
  assert.match(app, /const EVENT_URL = 'https:\/\/luma\.com\/nz74etab'/)
  assert.match(app, /href=\{EVENT_URL\}\s+rel="noopener noreferrer"\s+target="_blank"/)
})

test('event banner sits between the hero and the stats section', () => {
  assert.match(app, /<\/section>\s*<EventBanner copy=\{copy\.eventBanner\} \/>\s*<section className="stats-section"/)
})

test('event banner copy exists in both languages', () => {
  assert.equal(content.pt.eventBanner.label, 'Evento de lançamento no Edifício Transparente')
  assert.deepEqual(
    content.pt.eventBanner.titleParts.map((part) => part.text),
    ['Uma', 'comunidade', 'que faz', 'cidade'],
  )
  assert.equal(content.pt.eventBanner.cta, 'Inscreve-te aqui')
  for (const language of languages) {
    const banner = content[language.code].eventBanner
    assert.equal(banner.dateTime, '2026-12-05T14:30')
    assert.equal(banner.titleParts.filter((part) => part.emphasis).length, 2)
  }
})

test('event banner button turns #FF4C00 on desktop hover', () => {
  assert.match(css, /@media \(hover: hover\) \{\s*\.event-banner-cta:hover \{\s*background: #ff4c00;/)
})
