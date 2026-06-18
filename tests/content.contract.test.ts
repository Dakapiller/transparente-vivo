import assert from 'node:assert/strict'
import test from 'node:test'

import { content, languages } from '../src/content.ts'

test('content exposes Portuguese and English language modes', () => {
  assert.deepEqual(
    languages.map((language) => language.code),
    ['pt', 'en'],
  )
  assert.equal(content.pt.hero.titleEmphasis, 'comunidade')
  assert.equal(content.en.hero.titleEmphasis, 'living community')
})

test('campaign content covers the visible Figma sections', () => {
  for (const language of languages) {
    const copy = content[language.code]

    assert.equal(copy.stats.length, 4)
    assert.equal(copy.history.timeline.length, 5)
    assert.ok(copy.people.length >= 5)
    assert.equal(copy.beliefs.preserve.items.length, 4)
    assert.equal(copy.beliefs.demolish.items.length, 4)
    assert.match(copy.cta.primary, /Assina|Sign/)
  }
})

test('people heading preserves Figma color emphasis segments', () => {
  assert.deepEqual(content.pt.peopleSection.titleParts, [
    { text: 'Pessoas', emphasis: true },
    { text: ' que aqui ' },
    { text: 'trabalham', emphasis: true },
    { text: ' e tornam este lugar ' },
    { text: 'vivo', emphasis: true },
  ])

  assert.deepEqual(content.en.peopleSection.titleParts, [
    { text: 'People', emphasis: true },
    { text: ' who ' },
    { text: 'work', emphasis: true },
    { text: ' here and make this place ' },
    { text: 'alive', emphasis: true },
  ])
})

test('desktop menu content matches the Figma menu structure', () => {
  assert.deepEqual(content.pt.nav.menuItems.map((item) => item.label), [
    'Introdução',
    'Dados',
    'Comunidade',
    'Em que acreditamos',
    'Ecossistema',
  ])
  assert.equal(content.pt.nav.petition, 'Assina a petição')
  assert.equal(content.en.nav.petition, 'Sign the petition')
})
