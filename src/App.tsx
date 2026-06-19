import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

import heroImage from './assets/figma/hero-optimized.jpeg'
import galleryOne from './assets/figma/photo-08.jpeg'
import galleryTwo from './assets/figma/photo-05.jpeg'
import galleryArrowNext from './assets/figma/vectors/gallery-arrow-next.svg'
import galleryArrowPrev from './assets/figma/vectors/gallery-arrow-prev.svg'
import personAna from './assets/figma/photo-11.jpeg'
import personManuel from './assets/figma/photo-07.jpeg'
import personMariana from './assets/figma/photo-09.jpeg'
import personNome from './assets/figma/photo-13.jpeg'
import personRicardo from './assets/figma/photo-02.jpeg'
import arrowNext from './assets/figma/vectors/arrow-next.svg'
import arrowPrev from './assets/figma/vectors/arrow-prev.svg'
import campaignArrow from './assets/figma/vectors/campaign-arrow.svg'
import checkIcon from './assets/figma/vectors/check.svg'
import ecoCultureBookLeft from './assets/figma/vectors/eco-culture-book-left.svg'
import ecoCultureBookRight from './assets/figma/vectors/eco-culture-book-right.svg'
import ecoOffice from './assets/figma/vectors/eco-office.svg'
import ecoConnectorBottomRight from './assets/figma/vectors/eco-orbit-connector-bottom-right.svg'
import ecoConnectorRight from './assets/figma/vectors/eco-orbit-connector-right.svg'
import ecoConnectorSmall from './assets/figma/vectors/eco-orbit-connector-small.svg'
import ecoOrbitMobileConnectors from './assets/figma/vectors/ecosystem-orbit-mobile-connectors.svg'
import ecoRestaurant from './assets/figma/vectors/eco-restaurant.svg'
import ecoRing from './assets/figma/vectors/eco-ring.svg'
import ecoSport from './assets/figma/vectors/eco-sport.svg'
import facebookIcon from './assets/figma/vectors/facebook.svg'
import footerMark from './assets/figma/vectors/footer-mark.svg'
import hamburgerIcon from './assets/figma/vectors/hamburger.svg'
import instagramIcon from './assets/figma/vectors/instagram.svg'
import logo from './assets/figma/vectors/logo.svg'
import menuCloseIcon from './assets/figma/vectors/menu-close.svg'
import menuSeparator from './assets/figma/vectors/menu-separator.svg'
import personCardFrame from './assets/figma/vectors/person-card-frame.svg'
import statBuilding from './assets/figma/vectors/stat-building.svg'
import statCalendar from './assets/figma/vectors/stat-calendar.svg'
import statPeople from './assets/figma/vectors/stat-people.svg'
import statRestaurant from './assets/figma/vectors/stat-restaurant.svg'
import whatsappIcon from './assets/figma/vectors/whatsapp.svg'
import xIcon from './assets/figma/vectors/x.svg'
import { content, type LanguageCode, languages } from './content'
import {
  countUpTween,
  dur,
  ease,
  gsap,
  Observer,
  prefersReduced,
  ScrollTrigger,
  SplitText,
  useGSAP,
} from './motion/gsap'
import { lockDocumentScroll, restoreDocumentScroll } from './scrollLock'
import { timelineMilestones, timelineSegments, toTimelinePercent } from './timelineLayout'

type TimelineMilestoneStyle = CSSProperties &
  Record<'--timeline-dot-left' | '--timeline-text-left' | '--timeline-text-width', string>

type TimelineSegmentStyle = CSSProperties &
  Record<'--timeline-segment-left' | '--timeline-segment-width', string>

type PeopleImageStyle = CSSProperties &
  Record<
    '--portrait-image-height' | '--portrait-image-left' | '--portrait-image-top' | '--portrait-image-width',
    string
  >

const peopleImages = [
  personMariana,
  personRicardo,
  personNome,
  personManuel,
  personAna,
] as const

const peopleImageLayouts = [
  { left: -32.816, top: -65.632, width: 270.994, height: 406.292 },
  { left: -3.128, top: -49.128, width: 254, height: 380 },
  { left: -0.128, top: -71.128, width: 260, height: 390 },
  { left: -2.128, top: -46.128, width: 250, height: 376 },
  { left: -32.816, top: -65.632, width: 270.994, height: 406.292 },
] as const

const statIcons = [statPeople, statBuilding, statRestaurant, statCalendar] as const
const ecosystemConnectors = [
  { className: 'orbit-link-tl', src: ecoConnectorSmall },
  { className: 'orbit-link-tr', src: ecoConnectorRight },
  { className: 'orbit-link-bl', src: ecoConnectorSmall },
  { className: 'orbit-link-br', src: ecoConnectorBottomRight },
] as const
const galleryImages = [galleryOne, galleryTwo] as const

function EcosystemIcon({ index }: { index: number }) {
  if (index === 0) {
    return <img alt="" aria-hidden="true" className="orbit-icon" src={ecoOffice} />
  }

  if (index === 1) {
    return <img alt="" aria-hidden="true" className="orbit-icon" src={ecoRestaurant} />
  }

  if (index === 2) {
    return <img alt="" aria-hidden="true" className="orbit-icon" src={ecoSport} />
  }

  return (
    <span aria-hidden="true" className="orbit-culture-icon">
      <img alt="" src={ecoCultureBookLeft} />
      <img alt="" src={ecoCultureBookRight} />
    </span>
  )
}

function ArrowButton({
  direction,
  iconSrc,
  label,
  onClick,
  className = '',
}: {
  direction: 'prev' | 'next'
  iconSrc?: string
  label: string
  onClick: () => void
  className?: string
}) {
  return (
    <button
      aria-label={label}
      className={`round-arrow ${className}`}
      type="button"
      onClick={onClick}
    >
      <img alt="" src={iconSrc ?? (direction === 'next' ? arrowNext : arrowPrev)} />
    </button>
  )
}

function CampaignButton({
  children,
  href,
  variant = 'primary',
  onClick,
}: {
  children: string
  href: string
  variant?: 'primary' | 'outline'
  onClick?: () => void
}) {
  return (
    <a className={`campaign-button campaign-button--${variant}`} href={href} onClick={onClick}>
      <span>{children}</span>
      <span aria-hidden="true" className="button-arrow">
        <img alt="" src={campaignArrow} />
      </span>
    </a>
  )
}

function LanguageDropdown({
  locale,
  onLocaleChange,
}: {
  locale: LanguageCode
  onLocaleChange: (locale: LanguageCode) => void
}) {
  const [open, setOpen] = useState(false)
  const controlRef = useRef<HTMLDivElement>(null)
  const activeLanguage = languages.find((language) => language.code === locale) ?? languages[0]

  useEffect(() => {
    if (!open) {
      return
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!controlRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div className="language-control" ref={controlRef}>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Language"
        className="language-toggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{activeLanguage.label}</span>
      </button>
      {open && (
        <div aria-label="Language" className="language-menu" role="listbox">
          {languages.map((language) => (
            <button
              aria-selected={language.code === locale}
              className="language-option"
              key={language.code}
              role="option"
              type="button"
              onClick={() => {
                onLocaleChange(language.code)
                setOpen(false)
              }}
            >
              <span>{language.label}</span>
              <span className="language-option-name">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function DesktopMenuOverlay({
  activeHref,
  copy,
  locale,
  onClose,
  onLocaleChange,
  onNavigate,
}: {
  activeHref: string
  copy: (typeof content)[LanguageCode]
  locale: LanguageCode
  onClose: () => void
  onLocaleChange: (locale: LanguageCode) => void
  onNavigate: (href: string) => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<ReturnType<typeof gsap.timeline> | null>(null)

  const { contextSafe } = useGSAP(
    () => {
      if (prefersReduced()) {
        return
      }

      // The overlay's top bar is identical to the sticky header sitting behind it.
      // We must NOT fade the overlay's opacity — that would cross-fade the two
      // logos and make the header blink. Keep the overlay (and its top bar) fully
      // opaque, and fade only the backdrop COLOUR + the menu content.
      gsap.set(overlayRef.current, { autoAlpha: 1 })
      const tl = gsap.timeline({ defaults: { ease: ease.arrival } })
      tl.from(overlayRef.current, { backgroundColor: 'rgba(229, 243, 255, 0)', duration: 0.3, ease: 'power2.out' })
        .from('.desktop-menu-item', { y: 32, autoAlpha: 0, stagger: 0.07, duration: 0.5 }, 0.15)
        .from(
          '.desktop-menu-content > .campaign-button',
          { y: 24, autoAlpha: 0, duration: 0.45 },
          '-=0.2',
        )
      timelineRef.current = tl
    },
    { scope: overlayRef },
  )

  // contextSafe defers this to a click handler — the ref is read at click time, not render.
  // eslint-disable-next-line react-hooks/refs
  const handleClose = contextSafe(() => {
    const tl = timelineRef.current
    if (!tl) {
      onClose()
      return
    }

    tl.eventCallback('onReverseComplete', onClose)
    tl.timeScale(1.9).reverse()
  })

  // Record the requested section, then animate the menu closed. App scrolls to it
  // once the overlay has unmounted and document scroll is unlocked again.
  const handleNavigate = (href: string) => {
    onNavigate(href)
    handleClose()
  }

  return (
    <div
      className="desktop-menu-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={copy.nav.menu}
    >
      <div className="menu-overlay-nav">
        <a
          aria-label="Transparente Vivo"
          className="wordmark"
          href="#top"
          onClick={() => handleNavigate('#top')}
        >
          <img alt="" src={logo} />
        </a>
        <div className="header-actions">
          <LanguageDropdown locale={locale} onLocaleChange={onLocaleChange} />
          <button aria-label={copy.nav.close} className="menu-close-button" type="button" onClick={handleClose}>
            <img alt="" src={menuCloseIcon} />
          </button>
        </div>
      </div>
      <div className="desktop-menu-content">
        <nav className="desktop-menu-list" aria-label={copy.nav.menu}>
          {copy.nav.menuItems.map((item) => (
            <div className="desktop-menu-item" key={item.label}>
              <a
                className={item.href === activeHref ? 'active' : ''}
                href={item.href}
                onClick={() => handleNavigate(item.href)}
              >
                {item.label}
              </a>
              <img alt="" aria-hidden="true" className="desktop-menu-separator" src={menuSeparator} />
            </div>
          ))}
        </nav>
        <CampaignButton href="#sign" onClick={() => handleNavigate('#sign')}>
          {copy.nav.petition}
        </CampaignButton>
      </div>
    </div>
  )
}

function App() {
  const [locale, setLocale] = useState<LanguageCode>('pt')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#top')
  const [peopleIndex, setPeopleIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const shellRef = useRef<HTMLDivElement>(null)
  const galleryReady = useRef(false)
  const pendingScrollRef = useRef<string | null>(null)
  // True while the burger menu is open. The scroll lock momentarily reports
  // scrollY as 0, which would otherwise flip the sticky header's condensed state
  // (and flash on close). The header trigger reads this to stay frozen meanwhile.
  const menuOpenRef = useRef(false)
  const copy = content[locale]
  const footerAboutBrand = 'Transparente Vivo'
  const [footerAboutPrefix, footerAboutSuffix = ''] = copy.footer.about.split(footerAboutBrand)

  const shareUrl = useMemo(() => {
    const text = encodeURIComponent(copy.cta.shareMessage)
    return `https://wa.me/?text=${text}`
  }, [copy.cta.shareMessage])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    menuOpenRef.current = true
    const snapshot = lockDocumentScroll(document, window.scrollY)

    return () => {
      menuOpenRef.current = false
      restoreDocumentScroll(document, snapshot, (scrollY) => window.scrollTo(0, scrollY))
    }
  }, [menuOpen])

  // After the menu closes (and scroll lock is released), perform any in-page
  // navigation that was requested from inside the overlay.
  useEffect(() => {
    if (menuOpen) {
      return
    }

    const target = pendingScrollRef.current
    if (!target) {
      return
    }

    pendingScrollRef.current = null
    requestAnimationFrame(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [menuOpen])

  // Scroll-spy: the active menu item follows the section currently in view, rather
  // than a hardcoded flag. The active section is the last one whose top has scrolled
  // above a header-height threshold.
  useEffect(() => {
    const hrefs = copy.nav.menuItems.map((item) => item.href)
    const onScroll = () => {
      const threshold = 140
      // Pick the section whose top is closest to the threshold from above — i.e.
      // the one we're currently inside. Menu order differs from page order
      // (ecosystem precedes beliefs on the page), so we compare positions, not order.
      let current = hrefs[0]
      let bestTop = -Infinity
      for (const href of hrefs) {
        const el = document.querySelector(href)
        if (!el) {
          continue
        }
        const top = el.getBoundingClientRect().top
        if (top <= threshold && top > bestTop) {
          bestTop = top
          current = href
        }
      }
      setActiveHref(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [copy])

  const rotatePeople = (direction: 'prev' | 'next') => {
    setPeopleIndex((current) => {
      if (direction === 'prev') {
        return current === 0 ? copy.people.length - 4 : current - 1
      }

      return current >= copy.people.length - 4 ? 0 : current + 1
    })
  }

  const rotateGallery = (direction: 'prev' | 'next') => {
    setGalleryIndex((current) =>
      direction === 'prev'
        ? (current + galleryImages.length - 1) % galleryImages.length
        : (current + 1) % galleryImages.length,
    )
  }

  // Main motion system: page-load hero sequence, scroll reveals, the timeline draw,
  // the orbit coming alive, count-ups, and the sticky-header condense. Re-runs on
  // locale change so SplitText + count-ups rebuild against the new copy.
  useGSAP(
    () => {
      const shell = shellRef.current
      if (!shell) {
        return
      }

      // Sticky-header elevation — independent of motion preference (it's a state, not motion).
      const header = shell.querySelector('.site-header')
      const headerTrigger = ScrollTrigger.create({
        start: 140,
        end: 'max',
        onToggle: (self) => {
          // Frozen while the menu is open so the scroll-lock's scrollY=0 doesn't
          // flip the condensed state and flash the header on close.
          if (menuOpenRef.current) {
            return
          }
          header?.classList.toggle('is-condensed', self.isActive)
        },
      })

      // Swipe affordance for the people carousel (touch + pointer).
      const peopleViewport = shell.querySelector('.people-viewport')
      const observer = peopleViewport
        ? Observer.create({
            target: peopleViewport,
            type: 'touch,pointer',
            tolerance: 40,
            // Commit to the dominant axis on gesture start so a vertical page
            // scroll that drifts sideways doesn't spuriously rotate the carousel.
            lockAxis: true,
            onLeft: () => rotatePeople('next'),
            onRight: () => rotatePeople('prev'),
          })
        : null

      const mm = gsap.matchMedia()

      // Shared on-enter reveals (all viewports): hero, people, beliefs, gallery,
      // sign, footer, ecosystem copy. Stats / timeline / orbit get size-specific
      // treatments registered after this block.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ---- Hero load sequence ----
        const split = SplitText.create('.hero-copy h1', { type: 'words', mask: 'words', aria: 'auto' })
        gsap.set(split.words, { yPercent: 110 })

        const heroTl = gsap.timeline({ defaults: { ease: ease.arrival } })
        heroTl
          .from('.site-header .wordmark, .site-header .header-actions', {
            y: -16,
            autoAlpha: 0,
            duration: dur.medium,
            stagger: 0.08,
          })
          .to(split.words, { yPercent: 0, duration: dur.expressive, stagger: 0.08 }, 0.1)
          .from('.hero-copy h1 strong', { color: '#ffaf8e', duration: dur.expressive }, 0.2)
          .from(
            '.hero-image',
            { autoAlpha: 0, scale: 1.08, clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9 },
            0.1,
          )
          .from('.hero-copy p', { y: 16, autoAlpha: 0, duration: dur.medium }, 0.5)
          .from(
            '.hero-copy .campaign-button',
            { y: 20, autoAlpha: 0, duration: dur.medium, clearProps: 'transform' },
            0.62,
          )

        // ---- People: title + cards reveal ----
        gsap.from('.people-title', {
          y: 40,
          autoAlpha: 0,
          duration: dur.medium,
          ease: ease.arrival,
          scrollTrigger: { trigger: '.people-section', start: 'top 70%', once: true },
        })
        gsap.from('.person-card', {
          y: 50,
          autoAlpha: 0,
          duration: dur.medium,
          stagger: 0.08,
          ease: ease.arrival,
          clearProps: 'transform',
          scrollTrigger: { trigger: '.people-viewport', start: 'top 82%', once: true },
        })
        gsap.from('.people-section .campaign-button, .helper-copy', {
          y: 24,
          autoAlpha: 0,
          duration: dur.medium,
          stagger: 0.1,
          ease: ease.arrival,
          clearProps: 'transform',
          scrollTrigger: { trigger: '.people-section .campaign-button', start: 'top 92%', once: true },
        })

        // ---- Ecosystem: copy slides in, orbit blooms, then floats forever ----
        gsap.from('.ecosystem-copy .kicker, .ecosystem-copy h2, .callout-copy', {
          x: -40,
          autoAlpha: 0,
          duration: dur.medium,
          stagger: 0.1,
          ease: ease.arrival,
          clearProps: 'transform',
          scrollTrigger: { trigger: '.ecosystem-section', start: 'top 70%', once: true },
        })
        // ---- Gallery reveal ----
        gsap.from('.gallery-track img', {
          autoAlpha: 0,
          scale: 1.06,
          duration: dur.medium,
          stagger: 0.1,
          ease: ease.arrival,
          clearProps: 'transform',
          scrollTrigger: { trigger: '.gallery-section', start: 'top 78%', once: true },
        })

        // ---- Sign / CTA ----
        gsap.from('.sign-title, .sign-layout > p, .sign-actions', {
          y: 36,
          autoAlpha: 0,
          duration: dur.medium,
          stagger: 0.12,
          ease: ease.arrival,
          clearProps: 'transform',
          scrollTrigger: { trigger: '.sign-section', start: 'top 74%', once: true },
        })

        // ---- Footer reveal + watermark parallax ----
        gsap.from('.footer-about, .site-footer address', {
          y: 40,
          autoAlpha: 0,
          duration: dur.medium,
          stagger: 0.12,
          ease: ease.arrival,
          clearProps: 'transform',
          scrollTrigger: { trigger: '.site-footer', start: 'top 82%', once: true },
        })
        gsap.to('.footer-mark', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom bottom', scrub: 1 },
        })
      })

      // ---- Desktop: pinned step-through. Each section locks and reveals one item
      // per scroll, snapping to each. ----
      mm.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference)', () => {
        const STEP = 320
        const snap = {
          snapTo: 'labels' as const,
          duration: { min: 0.2, max: 0.6 },
          delay: 0.04,
          ease: 'power1.inOut',
        }

        // Stats — title, then each counter reveals + counts up per scroll step.
        const statCards = gsap.utils.toArray<HTMLElement>('.stat-card')
        const statsTl = gsap.timeline({
          defaults: { duration: 1, ease: ease.arrival },
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 120px',
            end: `+=${STEP * (statCards.length + 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap,
          },
        })
        statsTl.from('.stats-title', { y: 40, autoAlpha: 0 }).addLabel('s0')
        statCards.forEach((card, index) => {
          statsTl.from(card, { y: 48, autoAlpha: 0, scale: 0.97 }, '>')
          const value = card.querySelector<HTMLElement>('.stat-value')
          if (value) {
            statsTl.add(countUpTween(value), '<')
          }
          statsTl.addLabel(`s${index + 1}`)
        })

        // History — each milestone draws its segment + dot + label per scroll step.
        const milestones = gsap.utils.toArray<HTMLElement>('.timeline article')
        const segments = gsap.utils.toArray<HTMLElement>('.timeline-segment')
        gsap.set(segments, { transformOrigin: 'left center' })
        const historyTl = gsap.timeline({
          defaults: { duration: 1, ease: ease.arrival },
          scrollTrigger: {
            trigger: '.history-section',
            start: 'top 120px',
            end: `+=${STEP * (milestones.length + 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap,
          },
        })
        historyTl.from('.history-title', { y: 40, autoAlpha: 0 }).addLabel('h0')
        milestones.forEach((milestone, index) => {
          const segment = segments[index - 1]
          if (segment) {
            historyTl.from(segment, { scaleX: 0, ease: 'none' }, '>')
          }
          historyTl.from(
            milestone.querySelector('.timeline-dot'),
            { scale: 0, transformOrigin: 'center', duration: 0.6, ease: ease.snap },
            segment ? '<0.25' : '>',
          )
          historyTl.from(
            milestone.querySelectorAll('h3, p'),
            { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.6 },
            '<',
          )
          historyTl.addLabel(`h${index + 1}`)
        })

        // Ecosystem — each node blooms one per step; after all four, the connectors
        // appear as one step, then the whole orbit starts rotating.
        const nodes = gsap.utils.toArray<HTMLElement>('.orbit-node')
        const links = gsap.utils.toArray<HTMLElement>('.orbit-link')
        // Fade only — the connectors carry CSS flips (scaleX/scaleY/rotate) to fit
        // each gap, so animating their transform here would clobber those flips.
        gsap.set(links, { autoAlpha: 0 })

        let rotationStarted = false
        const startOrbitRotation = () => {
          if (rotationStarted) {
            return
          }
          rotationStarted = true
          const spin = 42
          // Spin the orbit; counter-rotate each node by the same amount about its own
          // centre. The net effect translates each node (ring + icon + label) rigidly
          // to its orbited position with zero rotation — so icons/labels stay centred
          // in their rings and upright, while connectors stay attached.
          gsap.to('.ecosystem-orbit', {
            rotation: 360,
            transformOrigin: '50% 50%',
            duration: spin,
            ease: 'none',
            repeat: -1,
          })
          gsap.to('.orbit-node', {
            rotation: -360,
            transformOrigin: '50% 50%',
            duration: spin,
            ease: 'none',
            repeat: -1,
          })
        }

        const orbitTl = gsap.timeline({
          defaults: { duration: 1, ease: ease.snap },
          scrollTrigger: {
            trigger: '.ecosystem-section',
            start: 'top 120px',
            end: `+=${STEP * (nodes.length + 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap,
          },
        })
        orbitTl.addLabel('o0')
        nodes.forEach((node, index) => {
          orbitTl.from(node, { scale: 0.5, autoAlpha: 0, transformOrigin: 'center' }, '>')
          orbitTl.addLabel(`o${index + 1}`)
        })
        // Step 5: connectors fade in once every node is present. The spin kicks off
        // on the SAME swipe via onStart — with scrub:1, waiting for onComplete lands
        // a hair short of the tween end and the spin would only fire on the next swipe.
        orbitTl.to(links, {
          autoAlpha: 1,
          stagger: 0.1,
          ease: ease.arrival,
          onStart: startOrbitRotation,
        }, '>')
        orbitTl.addLabel(`o${nodes.length + 1}`)

        // Beliefs — each pro/con row (preserve + demolish together) reveals per step.
        const preserveItems = gsap.utils.toArray<HTMLElement>('.belief-card--preserve li')
        const demolishItems = gsap.utils.toArray<HTMLElement>('.belief-card--demolish li')
        const beliefRows = Math.max(preserveItems.length, demolishItems.length)
        gsap.set([...preserveItems, ...demolishItems], { autoAlpha: 0, x: -20 })
        gsap.set('.belief-card li img', { scale: 0, transformOrigin: 'center' })
        const beliefsTl = gsap.timeline({
          defaults: { duration: 1, ease: ease.arrival },
          scrollTrigger: {
            trigger: '.beliefs-section',
            start: 'top top',
            end: `+=${STEP * (beliefRows + 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap,
          },
        })
        beliefsTl
          .from('.beliefs-kicker, .beliefs-title', { y: 30, autoAlpha: 0, stagger: 0.08 })
          .from('.belief-card', { y: 56, autoAlpha: 0, stagger: 0.12 }, '<0.1')
          .addLabel('b0')
        for (let row = 0; row < beliefRows; row += 1) {
          const items = [preserveItems[row], demolishItems[row]].filter(Boolean)
          const icons = items
            .map((item) => item.querySelector('img'))
            .filter((icon): icon is HTMLImageElement => Boolean(icon))
          beliefsTl.to(items, { autoAlpha: 1, x: 0, duration: 1, ease: ease.arrival }, '>')
          if (icons.length) {
            beliefsTl.to(icons, { scale: 1, duration: 0.6, ease: ease.snap }, '<')
          }
          beliefsTl.addLabel(`b${row + 1}`)
        }
      })

      // ---- Tablet / mobile: pinned step-through, mirroring desktop. Now that the
      // mobile layout is natural flow (content-sized sections) rather than an
      // absolute canvas, each section can lock and reveal one item per swipe with
      // snapping — the same model as desktop, with mobile-appropriate targets
      // (vertical timeline dots, mobile orbit lines, stacked belief cards). ----
      mm.add('(max-width: 1100px) and (prefers-reduced-motion: no-preference)', () => {
        const STEP = 220
        const snap = {
          snapTo: 'labels' as const,
          duration: { min: 0.2, max: 0.6 },
          delay: 0.04,
          ease: 'power1.inOut',
        }
        const pinStart = 'top 64px'

        // Stats — title, then each counter reveals + counts up per scroll step.
        const statCards = gsap.utils.toArray<HTMLElement>('.stat-card')
        const statsTl = gsap.timeline({
          defaults: { duration: 1, ease: ease.arrival },
          scrollTrigger: {
            trigger: '.stats-section',
            start: pinStart,
            end: `+=${STEP * (statCards.length + 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap,
          },
        })
        statsTl.from('.stats-title', { y: 40, autoAlpha: 0 }).addLabel('s0')
        statCards.forEach((card, index) => {
          statsTl.from(card, { y: 48, autoAlpha: 0, scale: 0.97 }, '>')
          const value = card.querySelector<HTMLElement>('.stat-value')
          if (value) {
            statsTl.add(countUpTween(value), '<')
          }
          statsTl.addLabel(`s${index + 1}`)
        })

        // History — each milestone (dot + label) reveals per step. The connector
        // line is a CSS pseudo-element on the article, so it appears with the dot.
        const milestones = gsap.utils.toArray<HTMLElement>('.timeline article')
        const historyTl = gsap.timeline({
          defaults: { duration: 1, ease: ease.arrival },
          scrollTrigger: {
            trigger: '.history-section',
            start: pinStart,
            end: `+=${STEP * (milestones.length + 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap,
          },
        })
        historyTl.from('.history-title', { y: 40, autoAlpha: 0 }).addLabel('h0')
        milestones.forEach((milestone, index) => {
          // Draw the connector line leading into this milestone (it lives on the
          // previous article's ::before), then pop the dot, then the label.
          const previous = milestones[index - 1]
          if (previous) {
            historyTl.from(previous, { '--line-scale': 0, ease: 'none', duration: 1 }, '>')
          }
          historyTl.from(
            milestone.querySelector('.timeline-dot'),
            { scale: 0, transformOrigin: 'center', duration: 0.6, ease: ease.snap },
            previous ? '<0.25' : '>',
          )
          historyTl.from(
            milestone.querySelectorAll('h3, p'),
            { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.6 },
            '<',
          )
          historyTl.addLabel(`h${index + 1}`)
        })

        // Ecosystem — each node blooms one per step; then the orbit lines fade in
        // and the whole ring starts rotating (matching desktop).
        const nodes = gsap.utils.toArray<HTMLElement>('.orbit-node')
        let rotationStarted = false
        const startOrbitRotation = () => {
          if (rotationStarted) {
            return
          }
          rotationStarted = true
          const spin = 42
          gsap.to('.ecosystem-orbit', {
            rotation: 360,
            transformOrigin: '50% 50%',
            duration: spin,
            ease: 'none',
            repeat: -1,
          })
          gsap.to('.orbit-node', {
            rotation: -360,
            transformOrigin: '50% 50%',
            duration: spin,
            ease: 'none',
            repeat: -1,
          })
        }
        // Match the desktop element order exactly: each node blooms as a whole unit
        // — its ring (a child .orbit-ring), icon and label scale in together — so a
        // bare ring is never shown. Only once every node is present do the
        // connectors appear, and the spin kicks off with them.
        gsap.set('.orbit-connectors-mobile', { autoAlpha: 0 })
        const orbitTl = gsap.timeline({
          defaults: { duration: 1, ease: ease.snap },
          scrollTrigger: {
            trigger: '.ecosystem-section',
            start: pinStart,
            end: `+=${STEP * (nodes.length + 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap,
          },
        })
        orbitTl.addLabel('o0')
        nodes.forEach((node, index) => {
          orbitTl.from(node, { scale: 0.5, autoAlpha: 0, transformOrigin: 'center' }, '>')
          orbitTl.addLabel(`o${index + 1}`)
        })
        orbitTl.to(
          '.orbit-connectors-mobile',
          { autoAlpha: 1, duration: 1, ease: ease.arrival, onStart: startOrbitRotation },
          '>',
        )
        orbitTl.addLabel(`o${nodes.length + 1}`)

        // Beliefs — each pro/con row (preserve + demolish together) reveals per
        // step. Both cards stay in natural flow (no translate) so there's no empty
        // gap left behind before the gallery; the lower card simply reveals as the
        // pin releases and it scrolls into view.
        const preserveItems = gsap.utils.toArray<HTMLElement>('.belief-card--preserve li')
        const demolishItems = gsap.utils.toArray<HTMLElement>('.belief-card--demolish li')
        const beliefRows = Math.max(preserveItems.length, demolishItems.length)
        gsap.set([...preserveItems, ...demolishItems], { autoAlpha: 0, x: -20 })
        gsap.set('.belief-card li img', { scale: 0, transformOrigin: 'center' })
        const beliefsTl = gsap.timeline({
          defaults: { duration: 1, ease: ease.arrival },
          scrollTrigger: {
            trigger: '.beliefs-section',
            start: 'top top',
            end: `+=${STEP * (beliefRows + 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap,
          },
        })
        beliefsTl
          .from('.beliefs-kicker, .beliefs-title', { y: 30, autoAlpha: 0, stagger: 0.08 })
          .from('.belief-card', { y: 56, autoAlpha: 0, stagger: 0.12 }, '<0.1')
          .addLabel('b0')
        for (let row = 0; row < beliefRows; row += 1) {
          const items = [preserveItems[row], demolishItems[row]].filter(Boolean)
          const icons = items
            .map((item) => item.querySelector('img'))
            .filter((icon): icon is HTMLImageElement => Boolean(icon))
          beliefsTl.to(items, { autoAlpha: 1, x: 0, duration: 1, ease: ease.arrival }, '>')
          if (icons.length) {
            beliefsTl.to(icons, { scale: 1, duration: 0.6, ease: ease.snap }, '<')
          }
          beliefsTl.addLabel(`b${row + 1}`)
        }
      })

      // Trigger positions are measured on mount, before images decode and fonts
      // swap. As that content loads the page grows and every cached start/end
      // shifts up — so reveals fire before their section reaches the viewport
      // (most visible on mobile, where images are large relative to the screen).
      // Re-measure once layout actually settles.
      const refresh = () => ScrollTrigger.refresh()
      const images = Array.from(shell.querySelectorAll('img'))
      const pending = images.filter((img) => !img.complete)
      pending.forEach((img) => {
        img.addEventListener('load', refresh, { once: true })
        img.addEventListener('error', refresh, { once: true })
      })
      window.addEventListener('load', refresh)
      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh).catch(() => {})
      }

      return () => {
        pending.forEach((img) => {
          img.removeEventListener('load', refresh)
          img.removeEventListener('error', refresh)
        })
        window.removeEventListener('load', refresh)
        headerTrigger.kill()
        observer?.kill()
        mm.revert()
      }
    },
    { scope: shellRef, dependencies: [locale], revertOnUpdate: true },
  )

  // People carousel track — GSAP-eased slide driven by the active index.
  // The per-card step (card width + flex gap) differs per breakpoint, so measure
  // it from the live DOM instead of hardcoding a desktop value — a fixed step
  // over-shifts on mobile, where cards are narrower, and drifts out of alignment.
  useGSAP(
    () => {
      const track = shellRef.current?.querySelector<HTMLElement>('.people-track')
      const first = track?.children[0] as HTMLElement | undefined
      if (!track || !first) {
        return
      }

      const stepOf = () =>
        first.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0)

      gsap.to(track, {
        x: -peopleIndex * stepOf(),
        duration: prefersReduced() ? 0 : 0.6,
        ease: ease.glide,
      })

      // The per-card step changes across breakpoints/orientation; re-snap to the
      // active index on resize so the track never drifts out of alignment.
      const onResize = () => gsap.set(track, { x: -peopleIndex * stepOf() })
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    },
    { scope: shellRef, dependencies: [peopleIndex] },
  )

  // Gallery — crossfade + scale-settle on swap instead of the old hard cut.
  useGSAP(
    () => {
      if (!galleryReady.current) {
        galleryReady.current = true
        return
      }
      if (prefersReduced()) {
        return
      }
      gsap.fromTo(
        '.gallery-track img',
        { autoAlpha: 0.3, scale: 1.04 },
        { autoAlpha: 1, scale: 1, duration: dur.medium, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' },
      )
    },
    { scope: shellRef, dependencies: [galleryIndex] },
  )

  return (
    <div className="site-shell" ref={shellRef}>
      <header className="site-header">
        <a aria-label="Transparente Vivo" className="wordmark" href="#top">
          <img alt="" src={logo} />
        </a>
        <div className="header-actions">
          <LanguageDropdown locale={locale} onLocaleChange={setLocale} />
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.nav.close : copy.nav.menu}
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <img alt="" src={hamburgerIcon} />
          </button>
        </div>
      </header>

      {/* Rendered OUTSIDE the header: the header's backdrop-filter establishes a
          containing block, which would anchor the fixed overlay to the header
          (and the scroll-locked body offset) instead of the viewport. */}
      {menuOpen && (
        <DesktopMenuOverlay
          activeHref={activeHref}
          copy={copy}
          locale={locale}
          onClose={() => setMenuOpen(false)}
          onLocaleChange={setLocale}
          onNavigate={(href) => {
            pendingScrollRef.current = href
          }}
        />
      )}

      <main id="top">
        <section className="hero-section">
          <div className="wrap hero-layout">
            <div className="hero-copy">
              <h1>
                <span>{copy.hero.titleStart} </span>
                <strong>{copy.hero.titleEmphasis}</strong>
                <span> {copy.hero.titleEnd}</span>
              </h1>
              <p>{copy.hero.body}</p>
              <CampaignButton href="#sign">{copy.hero.cta}</CampaignButton>
            </div>
            <img alt="" className="hero-image" src={heroImage} />
          </div>
        </section>

        <section className="stats-section" id="community">
          <div className="wrap">
            <h2 className="blue-title stats-title">
              {copy.intro.titleStart}{' '}
              <strong>{copy.intro.titleEmphasis}</strong> {copy.intro.titleEnd}
            </h2>
            <div className="stats-grid">
              {copy.stats.map((stat, index) => (
                <article className="stat-card" key={stat.emphasis}>
                  <img alt="" src={statIcons[index]} />
                  <h3>
                    <span className="stat-value">{stat.value}</span>
                    <strong>{stat.emphasis}</strong>
                  </h3>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="history-section" id="history">
          <div className="wrap history-layout">
            <h2 className="muted-title history-title">
              {copy.history.titleStart} <strong>{copy.history.titleEmphasis}</strong>
            </h2>
            <div className="timeline">
              {timelineSegments.map((segment, index) => (
                <span
                  aria-hidden="true"
                  className={`timeline-segment timeline-segment--${segment.variant}`}
                  key={`${segment.variant}-${index}`}
                  style={
                    {
                      '--timeline-segment-left': toTimelinePercent(segment.left),
                      '--timeline-segment-width': toTimelinePercent(segment.width),
                    } as TimelineSegmentStyle
                  }
                />
              ))}
              {copy.history.timeline.map((item, index) => {
                const milestone = timelineMilestones[index]

                return (
                  <article
                    className={item.active ? 'active' : ''}
                    key={item.year}
                    style={
                      {
                        '--timeline-dot-left': toTimelinePercent(milestone.dotLeft),
                        '--timeline-text-left': toTimelinePercent(milestone.textLeft),
                        '--timeline-text-width': toTimelinePercent(milestone.textWidth),
                      } as TimelineMilestoneStyle
                    }
                  >
                  <span className="timeline-dot" />
                  <h3>{item.year}</h3>
                  <p>{item.label}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="people-section" id="people">
          <div className="wrap people-wrap">
            <h2 className="people-title">
              {copy.peopleSection.titleParts.map((part, index) =>
                part.emphasis ? (
                  <strong key={`${part.text}-${index}`}>{part.text}</strong>
                ) : (
                  <span key={`${part.text}-${index}`}>{part.text}</span>
                ),
              )}
            </h2>
            <div className="people-viewport">
              <div className="people-track">
                {copy.people.map((person, index) => (
                  <article className="person-card" key={`${person.name}-${person.role}`}>
                    <div className="portrait-frame">
                      <img alt="" aria-hidden="true" className="portrait-frame-lines" src={personCardFrame} />
                      <div className="portrait-mask">
                        <img
                          alt=""
                          className="portrait-image"
                          src={peopleImages[index]}
                          style={
                            {
                              '--portrait-image-height': `${peopleImageLayouts[index].height}px`,
                              '--portrait-image-left': `${peopleImageLayouts[index].left}px`,
                              '--portrait-image-top': `${peopleImageLayouts[index].top}px`,
                              '--portrait-image-width': `${peopleImageLayouts[index].width}px`,
                            } as PeopleImageStyle
                          }
                        />
                      </div>
                    </div>
                    <blockquote>“{person.quote}”</blockquote>
                    <div className="person-meta">
                      <h3>{person.name}</h3>
                      <span>{person.role}</span>
                      <span>{person.since}</span>
                    </div>
                  </article>
                ))}
              </div>
              <div aria-hidden="true" className="people-fade people-fade--left" />
              <div aria-hidden="true" className="people-fade" />
              <ArrowButton
                className="people-prev"
                direction="prev"
                label="Previous person"
                onClick={() => rotatePeople('prev')}
              />
              <ArrowButton
                className="people-next"
                direction="next"
                label="Next person"
                onClick={() => rotatePeople('next')}
              />
            </div>
            <CampaignButton href="#sign">{copy.peopleSection.cta}</CampaignButton>
            <p className="helper-copy">{copy.peopleSection.helper}</p>
          </div>
        </section>

        <section className="ecosystem-section" id="ecosystem">
          <div className="wrap ecosystem-layout">
            <div className="ecosystem-copy">
              <p className="kicker">{copy.ecosystem.kicker}</p>
              <h2 className="muted-title">
                {copy.ecosystem.titleStart}{' '}
                <strong>{copy.ecosystem.titleEmphasis}</strong> {copy.ecosystem.titleEnd}
              </h2>
              <p className="callout-copy">
                {copy.ecosystem.bodyStart}{' '}
                <strong>{copy.ecosystem.bodyEmphasis}</strong>
                {copy.ecosystem.bodyEnd}
              </p>
            </div>
            <div className="ecosystem-orbit" aria-label={copy.ecosystem.kicker}>
              <img
                alt=""
                aria-hidden="true"
                className="orbit-connectors-mobile"
                src={ecoOrbitMobileConnectors}
              />
              {ecosystemConnectors.map((connector) => (
                <span
                  aria-hidden="true"
                  className={`orbit-link ${connector.className}`}
                  key={connector.className}
                >
                  <img alt="" className="orbit-link-image" src={connector.src} />
                </span>
              ))}
              {copy.ecosystem.nodes.map((node, index) => (
                <article className={`orbit-node orbit-node-${index}`} key={node}>
                  <img alt="" aria-hidden="true" className="orbit-ring" src={ecoRing} />
                  <EcosystemIcon index={index} />
                  <span className="orbit-label">{node}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="beliefs-section" id="beliefs">
          <div className="wrap">
            <p className="kicker beliefs-kicker">{copy.beliefs.kicker}</p>
            <h2 className="blue-title beliefs-title">
              {copy.beliefs.titleStart} <strong>{copy.beliefs.titleEmphasis}</strong>
            </h2>
            <div className="belief-cards">
              <article className="belief-card belief-card--preserve">
                <h3>{copy.beliefs.preserve.title}</h3>
                <ul>
                  {copy.beliefs.preserve.items.map((item, index) => (
                    <li key={item}>
                      <img alt="" src={checkIcon} />
                      <span>{item}</span>
                      {index < copy.beliefs.preserve.items.length - 1 && (
                        <span aria-hidden="true" className="belief-separator" />
                      )}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="belief-card belief-card--demolish">
                <h3>{copy.beliefs.demolish.title}</h3>
                <ul>
                  {copy.beliefs.demolish.items.map((item, index) => (
                    <li key={item}>
                      <img alt="" src={xIcon} />
                      <span>{item}</span>
                      {index < copy.beliefs.demolish.items.length - 1 && (
                        <span aria-hidden="true" className="belief-separator" />
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="gallery-section" aria-label="Community gallery">
          <div className="gallery-wrap">
            <div className="gallery-track">
              <img alt="" src={galleryImages[galleryIndex]} />
              <img alt="" src={galleryImages[(galleryIndex + 1) % galleryImages.length]} />
            </div>
            <div className="gallery-fade" />
            <ArrowButton
              className="gallery-prev"
              direction="prev"
              iconSrc={galleryArrowPrev}
              label="Previous image"
              onClick={() => rotateGallery('prev')}
            />
            <ArrowButton
              className="gallery-next"
              direction="next"
              iconSrc={galleryArrowNext}
              label="Next image"
              onClick={() => rotateGallery('next')}
            />
          </div>
        </section>

        <section className="sign-section" id="sign">
          <div className="wrap sign-layout">
            <h2 className="blue-title sign-title">
              {copy.cta.titleStart} <strong>{copy.cta.titleEmphasis}</strong>{' '}
              {copy.cta.titleEnd}
            </h2>
            <p>{copy.cta.body}</p>
            <div className="sign-actions">
              <CampaignButton href="https://www.transparentevivo.pt/" variant="primary">
                {copy.cta.primary}
              </CampaignButton>
              <a className="campaign-button campaign-button--whatsapp" href={shareUrl}>
                <span>{copy.cta.whatsapp}</span>
                <img alt="" src={whatsappIcon} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-layout">
          <p className="footer-about">
            {footerAboutPrefix}
            <strong className="footer-about-brand">{footerAboutBrand}</strong>
            {footerAboutSuffix}
          </p>
          <address>
            <p>
              <strong>{copy.footer.contactLabel}</strong>
              <a href={`mailto:${copy.footer.contact}`}>{copy.footer.contact}</a>
            </p>
            <p>
              <strong>{copy.footer.addressLabel}</strong>
              <span>{copy.footer.address}</span>
            </p>
            <div className="social-links">
              <strong>{copy.footer.socialLabel}</strong>
              <a href="https://www.instagram.com/" aria-label={copy.footer.instagram}>
                <img alt="" src={instagramIcon} />
                {copy.footer.instagram}
              </a>
              <a href="https://www.facebook.com/" aria-label={copy.footer.facebook}>
                <img alt="" src={facebookIcon} />
                {copy.footer.facebook}
              </a>
            </div>
          </address>
        </div>
        <img alt="" className="footer-mark" src={footerMark} />
      </footer>
    </div>
  )
}

export default App
