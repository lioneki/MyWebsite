import { useEffect, useState } from 'react'
import Nav from './Nav.jsx'
import { useLanguage } from './LanguageContext.jsx'
import { content, mainWorks } from './content.js'
import { CornerMarks } from './Decor.jsx'

export default function WorkDetailPage() {
  const { lang } = useLanguage()
  const t = content[lang].workPage
  const [id, setId] = useState(null)

  // 作品详情页也不要噪点材质干扰看图
  useEffect(() => {
    document.body.classList.add('no-grain')
    setId(new URLSearchParams(window.location.search).get('id'))
    return () => document.body.classList.remove('no-grain')
  }, [])

  const work = mainWorks.find((w) => w.id === id)

  if (id !== null && !work) {
    return (
      <>
        <Nav />
        <main>
          <section className="section work-detail-section">
            <div className="wrap">
              <a href="portfolio.html" className="portfolio-back">
                {t.backHome}
              </a>
              <p className="profile-para">{t.notFound}</p>
            </div>
          </section>
        </main>
      </>
    )
  }

  if (!work) {
    // 首次渲染时还没读到 URL 参数，避免闪一下"未找到"
    return (
      <>
        <Nav />
        <main />
      </>
    )
  }

  const title = lang === 'zh' ? work.titleZh : work.titleEn
  const category = lang === 'zh' ? work.categoryZh : work.categoryEn
  const desc = lang === 'zh' ? work.descZh : work.descEn

  return (
    <>
      <Nav />
      <main>
        <section className="work-detail-section">
          <div className="wrap">
            <a href="portfolio.html" className="portfolio-back">
              {t.back}
            </a>
            <div className="eyebrow">{category}</div>
            <h1 className="work-detail-title">{title}</h1>
            <div className="work-detail-meta">
              <span>{work.duration ? work.duration : work.year}</span>
            </div>
          </div>

          {work.images && work.images.length > 0 ? (
            work.images.map((src, i) => (
              <div className="work-detail-media" key={src}>
                <img src={src} alt={`${title} ${i + 1}`} />
                <CornerMarks inset={20} />
              </div>
            ))
          ) : (
            <div className="work-detail-media">
              {work.image && <img src={work.image} alt={title} />}
              <CornerMarks inset={20} />
            </div>
          )}

          <div className="wrap">
            {desc && <p className="work-detail-desc">{desc}</p>}
          </div>
        </section>
      </main>
    </>
  )
}
