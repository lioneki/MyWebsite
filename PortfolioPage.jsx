import { useEffect, useState } from 'react'
import Nav from './Nav.jsx'
import { useLanguage } from './LanguageContext.jsx'
import { content, mainWorks, dailyWorks } from './content.js'
import { CornerMarks, DiagonalLine } from './Decor.jsx'

const TAB_KEYS = ['video', 'static', 'game', 'music', 'painting']

export default function PortfolioPage() {
  const { lang } = useLanguage()
  const t = content[lang].portfolioPage
  const workT = content[lang].work
  const [tab, setTab] = useState('video')

  const titleFor = (w) => (lang === 'zh' ? w.titleZh : w.titleEn)
  const catFor = (w) => (lang === 'zh' ? w.categoryZh : w.categoryEn)
  const labelFor = {
    video: workT.tabVideo,
    static: workT.tabStatic,
    game: workT.tabGame,
    music: workT.tabMusic,
    painting: workT.tabPainting,
  }

  // 作品集页不要噪点材质干扰看图
  useEffect(() => {
    document.body.classList.add('no-grain')
    return () => document.body.classList.remove('no-grain')
  }, [])

  const renderEditorial = (key) => {
    const items = mainWorks.filter((w) => w.type === key)
    return (
      <div className="editorial-list">
        {items.map((w, i) => (
          <a
            className={`editorial-row ${i % 2 === 1 ? 'reverse' : ''}`}
            href={w.image ? `work.html?id=${w.id}` : '#'}
            key={w.id}
          >
            <div className="editorial-visual">
              {w.image && (
                <img className="work-media" src={w.image} alt={titleFor(w)} loading="lazy" decoding="async" />
              )}
              <span className="work-media-overlay editorial-overlay" />
              <CornerMarks inset={14} />
            </div>
            <div className="editorial-info">
              <h3 className="editorial-title">{titleFor(w)}</h3>
              <div className="editorial-meta">
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
    <>
      <Nav />
      <main id="main-content">
        <section className="portfolio-page-head">
          <CornerMarks inset={20} />
          <DiagonalLine style={{ top: '2%', right: '12%', height: '90%', transform: 'rotate(8deg)' }} />
          <div className="wrap">
            <a href="index.html" className="portfolio-back">
              {t.back}
            </a>
            <div className="eyebrow">{t.eyebrow}</div>
            <h1 className="portfolio-page-title">{t.title}</h1>
          </div>
        </section>

        <section className="portfolio-block">
          <div className="wrap">
            <div className="portfolio-block-head">
              <h2 className="portfolio-block-title">{t.mainLabel}</h2>
              <p className="portfolio-block-desc">{t.mainDesc}</p>
            </div>

            <div className="work-tabs">
              {TAB_KEYS.map((key) => (
                <button type="button" className={tab === key ? 'active' : ''} onClick={() => setTab(key)} key={key}>
                  {labelFor[key]}
                </button>
              ))}
            </div>

            <div className="work-tabs-panels">
              {TAB_KEYS.map((key) => (
                <div className={`work-tab-panel ${tab === key ? 'active' : ''}`} key={key}>
                  {renderEditorial(key)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-block">
          <div className="wrap">
            <div className="portfolio-block-head">
              <h2 className="portfolio-block-title">{t.dailyLabel}</h2>
              <p className="portfolio-block-desc">{t.dailyDesc}</p>
            </div>
            <div className="daily-grid">
              {dailyWorks.map((w) => (
                <div className="daily-card" key={w.id}>
                  <span>{w.id}</span>
                  <span>{w.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
