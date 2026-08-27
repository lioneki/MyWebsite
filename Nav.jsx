import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageContext.jsx'
import { content, nav } from './content.js'
import { IconCompass } from './icons.jsx'

// 滚动到首页的哪个板块，就高亮导航里对应的项；在作品集/作品详情页则固定高亮"作品"
function useActiveNav() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const file = window.location.pathname.split('/').pop() || 'index.html'

    if (file === 'portfolio.html' || file === 'work.html') {
      setActive('work')
      return
    }
    if (file !== 'index.html' && file !== '') {
      return
    }

    const sections = ['profile', 'work', 'support', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return active
}

// 页面顶部一条极细的滚动进度线
function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  )
}

export default function Nav() {
  const { lang, setLang } = useLanguage()
  const t = content[lang]
  const links = nav[lang]
  const active = useActiveNav()
  const isActive = (href) => active !== null && href === `index.html#${active}`

  return (
    <>
      <a href="#main-content" className="skip-link">
        {lang === 'zh' ? '跳到主要内容' : 'Skip to content'}
      </a>
      <ScrollProgress />
      <header className="nav">
        <div className="wrap">
          <a href="index.html#top" className="nav-logo">
            <IconCompass className="ico" aria-hidden="true" />
            {t.siteName}
          </a>

          <div className="nav-right">
            <nav aria-label={lang === 'zh' ? '主导航' : 'Primary'}>
              <ul className="nav-links">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={isActive(l.href) ? 'active' : ''}
                      aria-current={isActive(l.href) ? 'page' : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={lang === 'zh' ? 'active' : ''}
                aria-pressed={lang === 'zh'}
                onClick={() => setLang('zh')}
              >
                中
              </button>
              <span className="lang-sep">/</span>
              <button
                type="button"
                className={lang === 'en' ? 'active' : ''}
                aria-pressed={lang === 'en'}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>

            <a href="contact.html" className="btn">
              {t.navContactBtn}
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
