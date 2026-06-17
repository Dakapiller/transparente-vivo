export type ScrollLockDocument = {
  body: {
    style: {
      overflow: string
      position: string
      top: string
      width: string
    }
  }
  documentElement: {
    style: {
      overflow: string
    }
  }
}

export type ScrollLockSnapshot = {
  bodyOverflow: string
  bodyPosition: string
  bodyTop: string
  bodyWidth: string
  documentOverflow: string
  scrollY: number
}

export function lockDocumentScroll(
  targetDocument: ScrollLockDocument = document,
  scrollY = typeof window === 'undefined' ? 0 : window.scrollY,
): ScrollLockSnapshot {
  const snapshot = {
    bodyOverflow: targetDocument.body.style.overflow,
    bodyPosition: targetDocument.body.style.position,
    bodyTop: targetDocument.body.style.top,
    bodyWidth: targetDocument.body.style.width,
    documentOverflow: targetDocument.documentElement.style.overflow,
    scrollY,
  }

  targetDocument.body.style.overflow = 'hidden'
  targetDocument.body.style.position = 'fixed'
  targetDocument.body.style.top = `-${scrollY}px`
  targetDocument.body.style.width = '100%'
  targetDocument.documentElement.style.overflow = 'hidden'

  return snapshot
}

export function restoreDocumentScroll(
  targetDocument: ScrollLockDocument = document,
  snapshot: ScrollLockSnapshot,
  restoreScroll = typeof window === 'undefined'
    ? undefined
    : (scrollY: number) => window.scrollTo(0, scrollY),
) {
  targetDocument.body.style.overflow = snapshot.bodyOverflow
  targetDocument.body.style.position = snapshot.bodyPosition
  targetDocument.body.style.top = snapshot.bodyTop
  targetDocument.body.style.width = snapshot.bodyWidth
  targetDocument.documentElement.style.overflow = snapshot.documentOverflow
  restoreScroll?.(snapshot.scrollY)
}
