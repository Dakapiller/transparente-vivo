import assert from 'node:assert/strict'
import test from 'node:test'

import { lockDocumentScroll, restoreDocumentScroll } from '../src/scrollLock.ts'

function createFakeDocument() {
  return {
    body: {
      style: {
        position: 'relative',
        overflow: 'auto',
        top: '12px',
        width: '50%',
      },
    },
    documentElement: {
      style: {
        overflow: 'scroll',
      },
    },
  }
}

test('locks document scrolling and restores previous body state', () => {
  const document = createFakeDocument()

  const snapshot = lockDocumentScroll(document, 123)

  assert.equal(document.body.style.overflow, 'hidden')
  assert.equal(document.body.style.position, 'fixed')
  assert.equal(document.body.style.top, '-123px')
  assert.equal(document.body.style.width, '100%')
  assert.equal(document.documentElement.style.overflow, 'hidden')

  restoreDocumentScroll(document, snapshot)

  assert.equal(document.body.style.overflow, 'auto')
  assert.equal(document.body.style.position, 'relative')
  assert.equal(document.body.style.top, '12px')
  assert.equal(document.body.style.width, '50%')
  assert.equal(document.documentElement.style.overflow, 'scroll')
})
