import { useState } from 'react'
import { useLanguage } from './LanguageContext.jsx'
import { content, mainWorks } from './content.js'
import { DiagonalLine } from './Decor.jsx'
import { IconArrowRight } from './icons.jsx'

const CATEGORY_KEYS = ['video', 'static', 'game', 'music', 'painting']

export default function Work() {
  const { lang } = useLanguage()
  const t = content[lang].work
  const [active, setActive] = useState('video')

  const titleFor = (w) => (lang === 'zh' ? w.titleZh : w.titleEn)
  const catFor = (w) => (lang === 'zh' ? w.categoryZh : w.categoryEn)
  const labelFor = {
    video: t.tabVideo,
    static: t.tabStatic,
    game: t.tabGame,
    music: t.tabMusic,
    painting: t.tabPainting,
  }

  const renderGrid = (key) => {
    const items = mainWorks.filter((w) => w.type === key)
    return (
      <div className="work-grid-uniform work-grid-large">
        {items.map((w) => (
          <a className="work-tile" href={w.image ? `work.html?id=${w.id}` : '#'} key={w.id}>
            {w.image && <img className="work-media" src={w.image} alt={titleFor(w)} />}
            <span className="work-media-overlay" />
            <div className="work-tile-meta">
              <h3 className="work-card-title">{titleFor(w)}</h3>
              <div className="work-card-sub">
                <span>{catFor(w)}</span>
                <span>{w.year}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    )
  }

  return (
    <section id="work" className="section work">
      <DiagonalLine style={{ top: '6%', left: '96%', height: '80%', transform: 'rotate(11deg)' }} />

      <div className="wrap">
        <div className="work-head">
          <div>
            <div className="eyebrow">{t.eyebrow}</div>
            <h2 className="work-title">{t.title}</h2>
          </div>
          <p className="work-desc">{t.desc}</p>
        </div>

        <nav className="work-tabs">
          {CATEGORY_KEYS.map((key) => (
            <button
              type="button"
              key={key}
              className={active === key ? 'active' : ''}
              onMouseEnter={() => setActive(key)}
            >
              {labelFor[key]}
            </button>
          ))}
        </nav>

        <div className="work-tabs-panels">
          {CATEGORY_KEYS.map((key) => (
            <div className={`work-tab-panel ${active === key ? 'active' : ''}`} key={key}>
              {renderGrid(key)}
            </div>
          ))}
        </div>

        <div className="work-cta-row">
          <a href="portfolio.html" className="btn btn-solid btn-xl">
            {t.cta}
            <IconArrowRight style={{ width: 18, height: 18 }} />
          </a>
        </div>
      </div>
    </section>
  )
}
