// Central GSAP setup for the Transparente Vivo motion system.
// Follows the official GSAP React skill: register plugins once at module level,
// use useGSAP() for scoped animations + automatic cleanup, animate transform/opacity,
// and gate everything behind gsap.matchMedia() for prefers-reduced-motion.
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Observer, CustomEase)

// One shared easing language so the whole site moves like a single hand.
CustomEase.create('arrival', '0.16, 1, 0.3, 1') // expo-out: entrances settling into place
CustomEase.create('lift', '0.22, 0.61, 0.36, 1') // soft-out: hovers and small nudges

export const ease = {
  arrival: 'arrival',
  lift: 'lift',
  glide: 'power3.out',
  snap: 'back.out(1.6)',
} as const

// Global motion speed. < 1 makes every time-based GSAP animation slower
// (load sequence, scroll reveals, count-ups, orbit float, carousel, menu).
// Scroll-scrubbed effects stay tied to scroll position and are unaffected.
// Tune this single value: 1 = original, 0.7 ≈ 40% slower, 0.5 = half speed.
export const MOTION_SPEED = 0.7
gsap.globalTimeline.timeScale(MOTION_SPEED)

// Duration scale (seconds). Hard ceiling ~0.7s for entrances; count-up is the exception.
export const dur = {
  micro: 0.18,
  short: 0.32,
  medium: 0.5,
  expressive: 0.7,
} as const

export function prefersReduced(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Animate a number element from 0 to its rendered value when scrolled into view.
// Preserves any non-numeric prefix/suffix (e.g. the "+" in "600+").
export function countUp(el: HTMLElement, trigger: Element | string): void {
  // Cache the original target the first time. On re-runs (React StrictMode
  // double-mount, locale changes) the DOM text may already be the animating "0",
  // so reading textContent again would make the target 0 and it would stay there.
  const raw = (el.dataset.countTo ?? el.textContent ?? '').trim()
  if (!raw) {
    return
  }
  el.dataset.countTo = raw

  const match = raw.match(/\d[\d.,\s]*/)
  if (!match) {
    return
  }

  const numStr = match[0]
  const index = match.index ?? 0
  const prefix = raw.slice(0, index)
  const suffix = raw.slice(index + numStr.length)
  const target = Number.parseInt(numStr.replace(/[.,\s]/g, ''), 10)
  if (!Number.isFinite(target)) {
    return
  }

  const counter = { value: 0 }
  el.textContent = `${prefix}0${suffix}`

  gsap.to(counter, {
    value: target,
    duration: 1.6,
    ease: 'power2.out',
    snap: { value: 1 },
    scrollTrigger: { trigger, start: 'top 85%', once: true },
    onUpdate: () => {
      el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`
    },
  })
}

// Like countUp, but returns a (scroll-agnostic) tween to embed inside a scrubbed
// timeline, so the number counts as the user scrolls. Caches the target the same
// way countUp does, so re-runs never read the already-zeroed text.
export function countUpTween(el: HTMLElement, duration = 1): gsap.core.Tween {
  const raw = (el.dataset.countTo ?? el.textContent ?? '').trim()
  const match = raw.match(/\d[\d.,\s]*/)
  if (!match) {
    return gsap.to({}, { duration })
  }
  el.dataset.countTo = raw

  const numStr = match[0]
  const index = match.index ?? 0
  const prefix = raw.slice(0, index)
  const suffix = raw.slice(index + numStr.length)
  const target = Number.parseInt(numStr.replace(/[.,\s]/g, ''), 10)
  if (!Number.isFinite(target)) {
    return gsap.to({}, { duration })
  }

  const counter = { value: 0 }
  el.textContent = `${prefix}0${suffix}`

  return gsap.to(counter, {
    value: target,
    duration,
    ease: 'none',
    snap: { value: 1 },
    onUpdate: () => {
      el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`
    },
  })
}

export { gsap, useGSAP, ScrollTrigger, SplitText, Observer }
