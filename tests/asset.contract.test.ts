import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const assetPath = (...parts: string[]) => join(process.cwd(), 'src', 'assets', 'figma', ...parts)

test('slider arrow buttons use one white and muted normal state', () => {
  const arrowAssets = [
    'arrow-next.svg',
    'arrow-prev.svg',
    'gallery-arrow-next.svg',
    'gallery-arrow-prev.svg',
  ]

  for (const fileName of arrowAssets) {
    const svg = readFileSync(assetPath('vectors', fileName), 'utf8')

    assert.doesNotMatch(svg, /opacity="/, `${fileName} should not define faded states`)
    assert.match(svg, /<circle[^>]+fill="var\(--fill-0, white\)"/, `${fileName} should use a white button fill`)
    assert.match(svg, /<circle[^>]+stroke="var\(--stroke-0, #707899\)"/, `${fileName} should use muted circle stroke`)
    assert.match(svg, /fill="var\(--fill-0, #707899\)"/, `${fileName} should use muted arrow fill`)
  }
})

test('ecosystem office icon uses the Figma Group 202 symbol, not the orbit ring', () => {
  const svg = readFileSync(assetPath('vectors', 'eco-office.svg'), 'utf8')

  assert.match(svg, /<g id="Group 202">/)
  assert.doesNotMatch(svg, /Group 4563/)
})

test('belief preserve card uses the provided connected checkmark asset', () => {
  const svg = readFileSync(assetPath('vectors', 'check.svg'), 'utf8')

  assert.match(svg, /width="40" height="31" viewBox="0 0 40 31"/)
  assert.match(svg, /M38\.3457 2\.00061C39\.2417 2\.82162/)
  assert.match(svg, /M14\.6274 28\.3618C13\.6869 29\.1315/)
  assert.doesNotMatch(svg, /var\(--fill-0/)
})

test('belief demolish card uses the provided cross asset', () => {
  const svg = readFileSync(assetPath('vectors', 'x.svg'), 'utf8')

  assert.match(svg, /width="30" height="31" viewBox="0 0 30 31"/)
  assert.match(svg, /M1\.79859 1\.58238C2\.66885 0\.725336/)
  assert.match(svg, /M18\.0565 11\.9184C18\.9268 12\.7754/)
  assert.match(svg, /M1\.74942 28\.4418C2\.61968 29\.2988/)
  assert.doesNotMatch(svg, /var\(--fill-0/)
})
