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

test('localized content does not ship placeholder text', () => {
  const textValues = JSON.stringify(content)

  assert.doesNotMatch(textValues, /\.\.\./)
  assert.doesNotMatch(textValues, /\b(?:TODO|TBD|placeholder|lorem ipsum)\b/i)
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

test('people testimonials match the portrait list source', () => {
  const expectedPortuguesePeople = [
    {
      id: 'alex',
      name: 'Alex',
      role: 'Sales Manager',
      since: 'Aqui desde 2026',
      quote: 'Aqui nasceram amizades para a vida.',
    },
    {
      id: 'mariana',
      name: 'Mariana',
      role: 'Consultora',
      since: 'Aqui desde 2023',
      quote: 'Aqui encontrei a minha comunidade.',
    },
    {
      id: 'ricardo',
      name: 'Ricardo',
      role: 'CEO',
      since: 'Aqui desde 2022',
      quote: 'Aqui encontrei a minha vibe profissional.',
    },
    {
      id: 'fernando',
      name: 'Fernando',
      role: 'Estratega de Transformacao Digital, Fundador',
      since: 'Aqui desde 2022',
      quote: 'Aqui o meu horizonte tornou-se mais horizontal.',
    },
    {
      id: 'raquel',
      name: 'Raquel',
      role: 'Fundadora',
      since: 'Aqui desde 2025',
      quote: 'Aqui cresci, pessoal e profissionalmente.',
    },
    {
      id: 'manuel',
      name: 'Manuel',
      role: 'Porteiro',
      since: 'Aqui desde',
      quote: 'Aqui encontrei o meu lugar.',
    },
    {
      id: 'diogo',
      name: 'Diogo',
      role: 'Marketing',
      since: 'Aqui desde 2014',
      quote: 'Este lugar abriu-me novas oportunidades.',
    },
    {
      id: 'ines-consultora',
      name: 'Inês',
      role: 'Consultora',
      since: 'Aqui desde 2021',
      quote: 'Este lugar deu-me novas perspectivas.',
    },
    {
      id: 'catia',
      name: 'Cátia',
      role: 'Marketing',
      since: 'Aqui desde 2025',
      quote: 'Este espaço faz-me sentir parte de algo.',
    },
    {
      id: 'marlon',
      name: 'Marlon',
      role: 'Vidéografo',
      since: 'Aqui desde 2025',
      quote: 'Este espaço ligou-me a pessoas incríveis.',
    },
    {
      id: 'patricia',
      name: 'Patrícia',
      role: 'People Partner',
      since: 'Aqui desde 2026',
      quote: 'Este lugar trouxe mais cor ao meu dia a dia.',
    },
    {
      id: 'guilherme',
      name: 'Guilherme',
      role: 'Developer',
      since: 'Aqui desde 2026',
      quote: 'Este espaço tornou o Porto mais meu.',
    },
    {
      id: 'ines-designer',
      name: 'Inês',
      role: 'Graphic Designer',
      since: 'Aqui desde 2026',
      quote: 'Aqui conheci pessoas que me inspiram.',
    },
    {
      id: 'joana',
      name: 'Joana',
      role: 'People and Culture',
      since: 'Aqui desde 2023',
      quote: 'Este lugar mostrou-me o valor da comunidade.',
    },
    {
      id: 'jane',
      name: 'Jane',
      role: 'Sales Development Rep',
      since: 'Aqui desde 2026',
      quote: 'Aqui construí relações que importam.',
    },
    {
      id: 'vanessa',
      name: 'Vanessa',
      role: 'Space Manager',
      since: 'Aqui desde 2024',
      quote: 'Aqui encontrei mais do que um local de trabalho.',
    },
    {
      id: 'jose-maria',
      name: 'José Maria',
      role: 'Designer',
      since: 'Aqui desde 2024',
      quote: 'Aqui encontrei energia para criar e crescer.',
    },
    {
      id: 'rebecca',
      name: 'Rebecca',
      role: 'Arquiteta',
      since: 'Aqui desde 2023',
      quote: 'Este lugar mudou a minha vida.',
    },
    {
      id: 'hellen',
      name: 'Hellen',
      role: 'Talent Manager',
      since: 'Aqui desde 2024',
      quote: 'Aqui criaram-se laços que continuam fora daqui.',
    },
    {
      id: 'tomas',
      name: 'Tomás',
      role: 'Product',
      since: 'Aqui desde 2024',
      quote: 'Este espaço tornou-se uma segunda casa.',
    },
    {
      id: 'daniel-product',
      name: 'Daniel',
      role: 'Product',
      since: 'Aqui desde 2024',
      quote: 'Aqui encontrei pessoas com quem cresci.',
    },
    {
      id: 'daniel-engenheiro',
      name: 'Daniel',
      role: 'Engenheiro de Software',
      since: 'Aqui desde 2025',
      quote: 'Aqui senti que não estava sozinho.',
    },
    {
      id: 'joao',
      name: 'João',
      role: 'Engenheiro de Software',
      since: 'Aqui desde',
      quote: 'Este espaço faz parte da minha rotina.',
    },
    {
      id: 'afonso',
      name: 'Afonso',
      role: 'Gerente do Frik',
      since: 'Aqui desde 2025',
      quote: 'Aqui encontrei pessoas que me fazem ficar.',
    },
    {
      id: 'carlos',
      name: 'Carlos',
      role: 'Empregado da mesa',
      since: 'Aqui desde 2023',
      quote: 'Este lugar tornou-se parte da minha história.',
    },
    {
      id: 'thomas',
      name: 'Thomas',
      role: 'Empregado da mesa',
      since: 'Aqui desde 2026',
      quote: 'Este lugar fez-me sentir bem-vindo desde o primeiro dia.',
    },
    {
      id: 'agatha',
      name: 'Ágatha',
      role: 'Empregada de balcão',
      since: 'Aqui desde 2026',
      quote: 'Aqui surgiram ligações que não esperava.',
    },
    {
      id: 'yazmin',
      name: 'Yazmin',
      role: 'Empregada da mesa',
      since: 'Aqui desde 2026',
      quote: 'Este espaço fez-me acreditar em novas possibilidades.',
    },
    {
      id: 'renata',
      name: 'Renata',
      role: 'Empregada da mesa',
      since: 'Aqui desde 2018',
      quote: 'Aqui sinto-me em casa.',
    },
    {
      id: 'malu',
      name: 'Malu',
      role: 'Empregada da mesa',
      since: 'Aqui desde 2026',
      quote: 'Aqui encontrei inspiração para seguir em frente.',
    },
    {
      id: 'juan',
      name: 'Juan',
      role: 'Ajudante de cozinha',
      since: 'Aqui desde 2025',
      quote: 'Este lugar ajudou-me a recomeçar.',
    },
  ]

  assert.deepEqual(content.pt.people, expectedPortuguesePeople)
  assert.deepEqual(
    content.en.people.map((person) => person.name),
    expectedPortuguesePeople.map((person) => person.name),
  )
  assert.doesNotMatch(content.pt.people.map((person) => person.name).join(' '), /\?/)

  assert.deepEqual(
    content.en.people.map((person) => person.id),
    expectedPortuguesePeople.map((person) => person.id),
  )
  // Unknown start years follow the existing convention (no year, no '?').
  for (const language of languages) {
    for (const person of content[language.code].people) {
      assert.doesNotMatch(person.since, /\?/)
    }
  }
})

test('people ids are unique so same-name colleagues stay distinct', () => {
  const ids = content.pt.people.map((person) => person.id)

  assert.equal(new Set(ids).size, ids.length)
  assert.equal(content.pt.people.filter((person) => person.name === 'Daniel').length, 2)
})

test('desktop menu content matches the Figma menu structure', () => {
  assert.deepEqual(content.pt.nav.menuItems.map((item) => item.label), [
    'Introdução',
    'Dados',
    'Comunidade',
    'No que acreditamos',
    'Ecossistema',
  ])
  assert.equal(content.pt.nav.petition, 'Assina a petição')
  assert.equal(content.en.nav.petition, 'Sign the petition')
})

test('requested English campaign wording is present', () => {
  assert.equal(content.en.cta.titleStart, 'Sign to')
  assert.equal(content.en.cta.titleEmphasis, 'protect')
  assert.equal(content.en.cta.titleEnd, 'this ecosystem')
  assert.equal(content.en.history.timeline[3].label, 'Building 100% occupied')
  assert.equal(content.en.hero.titleStart, 'A')
  assert.equal(content.en.hero.titleEmphasis, 'living community')
  assert.equal(content.en.hero.titleEnd, "is the city's heritage")
})
