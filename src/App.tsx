import { useEffect, useMemo, useState } from 'react'
import './App.css'

import heroImage from './assets/figma/hero-optimized.jpeg'
import galleryOne from './assets/figma/photo-08.jpeg'
import galleryTwo from './assets/figma/photo-05.jpeg'
import personAna from './assets/figma/photo-11.jpeg'
import personManuel from './assets/figma/photo-07.jpeg'
import personMariana from './assets/figma/photo-09.jpeg'
import personNome from './assets/figma/photo-13.jpeg'
import personRicardo from './assets/figma/photo-02.jpeg'
import arrowNext from './assets/figma/vectors/arrow-next.svg'
import arrowPrev from './assets/figma/vectors/arrow-prev.svg'
import checkIcon from './assets/figma/vectors/check.svg'
import ecoCulture from './assets/figma/vectors/eco-culture.svg'
import ecoOffice from './assets/figma/vectors/eco-office.svg'
import ecoRestaurant from './assets/figma/vectors/eco-restaurant.svg'
import ecoSport from './assets/figma/vectors/eco-sport.svg'
import facebookIcon from './assets/figma/vectors/facebook.svg'
import footerMark from './assets/figma/vectors/footer-mark.svg'
import hamburgerIcon from './assets/figma/vectors/hamburger.svg'
import instagramIcon from './assets/figma/vectors/instagram.svg'
import logo from './assets/figma/vectors/logo.svg'
import menuCloseIcon from './assets/figma/vectors/menu-close.svg'
import statBuilding from './assets/figma/vectors/stat-building.svg'
import statCalendar from './assets/figma/vectors/stat-calendar.svg'
import statPeople from './assets/figma/vectors/stat-people.svg'
import statRestaurant from './assets/figma/vectors/stat-restaurant.svg'
import xIcon from './assets/figma/vectors/x.svg'
import { content, type LanguageCode, languages } from './content'
import { lockDocumentScroll, restoreDocumentScroll } from './scrollLock'

const peopleImages = [
  personMariana,
  personRicardo,
  personNome,
  personManuel,
  personAna,
] as const

const statIcons = [statPeople, statBuilding, statRestaurant, statCalendar] as const
const ecosystemIcons = [ecoOffice, ecoRestaurant, ecoSport, ecoCulture] as const
const galleryImages = [galleryOne, galleryTwo] as const

function ArrowButton({
  direction,
  label,
  onClick,
  className = '',
}: {
  direction: 'prev' | 'next'
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
      <img alt="" src={direction === 'next' ? arrowNext : arrowPrev} />
    </button>
  )
}

function CampaignButton({
  children,
  href,
  variant = 'primary',
}: {
  children: string
  href: string
  variant?: 'primary' | 'outline'
}) {
  return (
    <a className={`campaign-button campaign-button--${variant}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true" className="button-arrow">
        →
      </span>
    </a>
  )
}

function DesktopMenuOverlay({
  copy,
  locale,
  onClose,
  onLocaleChange,
}: {
  copy: (typeof content)[LanguageCode]
  locale: LanguageCode
  onClose: () => void
  onLocaleChange: (locale: LanguageCode) => void
}) {
  return (
    <div className="desktop-menu-overlay" role="dialog" aria-modal="true" aria-label={copy.nav.menu}>
      <div className="menu-overlay-nav">
        <a aria-label="Transparente Vivo" className="wordmark" href="#top" onClick={onClose}>
          <img alt="" src={logo} />
        </a>
        <div className="header-actions">
          <label className="language-control">
            <span className="sr-only">Language</span>
            <select
              aria-label="Language"
              value={locale}
              onChange={(event) => onLocaleChange(event.target.value as LanguageCode)}
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>
          </label>
          <button aria-label={copy.nav.close} className="menu-close-button" type="button" onClick={onClose}>
            <img alt="" src={menuCloseIcon} />
          </button>
        </div>
      </div>
      <div className="desktop-menu-content">
        <nav className="desktop-menu-list" aria-label={copy.nav.menu}>
          {copy.nav.menuItems.map((item) => (
            <a
              className={item.active ? 'active' : ''}
              href={item.href}
              key={item.label}
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <CampaignButton href="#sign">{copy.nav.petition}</CampaignButton>
      </div>
    </div>
  )
}

function App() {
  const [locale, setLocale] = useState<LanguageCode>('pt')
  const [menuOpen, setMenuOpen] = useState(false)
  const [peopleIndex, setPeopleIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const copy = content[locale]

  const shareUrl = useMemo(() => {
    const text = encodeURIComponent(copy.cta.shareMessage)
    return `https://wa.me/?text=${text}`
  }, [copy.cta.shareMessage])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const snapshot = lockDocumentScroll(document, window.scrollY)

    return () => {
      restoreDocumentScroll(document, snapshot, (scrollY) => window.scrollTo(0, scrollY))
    }
  }, [menuOpen])

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

  return (
    <div className="site-shell">
      <header className="site-header">
        <a aria-label="Transparente Vivo" className="wordmark" href="#top">
          <img alt="" src={logo} />
        </a>
        <div className="header-actions">
          <label className="language-control">
            <span className="sr-only">Language</span>
            <select
              aria-label="Language"
              value={locale}
              onChange={(event) => setLocale(event.target.value as LanguageCode)}
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>
          </label>
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
        {menuOpen && (
          <DesktopMenuOverlay
            copy={copy}
            locale={locale}
            onClose={() => setMenuOpen(false)}
            onLocaleChange={setLocale}
          />
        )}
      </header>

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
                    <span>{stat.value}</span>
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
              {copy.history.timeline.map((item) => (
                <article className={item.active ? 'active' : ''} key={item.year}>
                  <span className="timeline-dot" />
                  <h3>{item.year}</h3>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="people-section" id="people">
          <div className="wrap people-wrap">
            <h2 className="people-title">{copy.peopleSection.title}</h2>
            <div className="people-viewport">
              <div
                className="people-track"
                style={{ transform: `translateX(${-peopleIndex * 313}px)` }}
              >
                {copy.people.map((person, index) => (
                  <article className="person-card" key={`${person.name}-${person.role}`}>
                    <div className="portrait-frame">
                      <img alt="" src={peopleImages[index]} />
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
              {copy.ecosystem.nodes.map((node, index) => (
                <article className={`orbit-node orbit-node-${index}`} key={node}>
                  <img alt="" src={ecosystemIcons[index]} />
                  <span>{node}</span>
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
                  {copy.beliefs.preserve.items.map((item) => (
                    <li key={item}>
                      <img alt="" src={checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="belief-card belief-card--demolish">
                <h3>{copy.beliefs.demolish.title}</h3>
                <ul>
                  {copy.beliefs.demolish.items.map((item) => (
                    <li key={item}>
                      <img alt="" src={xIcon} />
                      <span>{item}</span>
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
              label="Previous image"
              onClick={() => rotateGallery('prev')}
            />
            <ArrowButton
              className="gallery-next"
              direction="next"
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
            <CampaignButton href="https://www.transparentevivo.pt/" variant="primary">
              {copy.cta.primary}
            </CampaignButton>
            <a className="campaign-button campaign-button--whatsapp" href={shareUrl}>
              <span>{copy.cta.whatsapp}</span>
              <span aria-hidden="true" className="whatsapp-dot">
                ◉
              </span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-layout">
          <p className="footer-about">{copy.footer.about}</p>
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
