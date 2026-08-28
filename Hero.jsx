import { useEffect, useState } from 'react'
import { useLanguage } from './LanguageContext.jsx'
import { content, mainWorks } from './content.js'
import { IconCompass, IconStar } from './icons.jsx'
import { CornerMarks, DiagonalLine, VerticalRule } from './Decor.jsx'

const SNAPSHOT_IDS = ['01', '02', '03', '04']

export default function Hero() {
  const { lang } = useLanguage()
  const t = content[lang].hero
  const snapshots = SNAPSHOT_IDS.map((id) => mainWorks.find((w) => w.id === id)).filter((w) => w && w.image)
  const [active, setActive] = useState(0)

  // 背景图每隔几秒轮换一张作品，做成模糊的氛围底图；对"减少动态效果"的用户就不自动轮播
  useEffect(() => {
    if (snapshots.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % snapshots.length)
    }, 5200)
    return () => clearInterval(timer)
  }, [snapshots.length])

  return (
    <section id="top" className="section hero">
      {snapshots.length > 0 && (
        <div className="hero-backdrop" aria-hidden="true">
          {snapshots.map((w, i) => (
            <img
              key={w.id}
              className={`hero-backdrop-img ${i === active ? 'active' : ''}`}
              src={w.image}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
          <div className="hero-backdrop-veil" />
        </div>
      )}

      <CornerMarks inset={28} />
      <DiagonalLine style={{ top: '4%', left: '58%', height: '92%', transform: 'rotate(9deg)' }} />
      <VerticalRule style={{ left: 12, top: '18%', bottom: '18%' }} />

      <div className="hero-decor">
        <IconCompass className="ico" />
        <IconStar className="ico" />
      </div>

      <div className="wrap hero-body">
        <div className="hero-top-row" style={{ justifyContent: 'flex-end' }}>
          <div className="hero-roles">{t.roles.join('  ·  ')}</div>
        </div>

        <h1 className="hero-title">
          <span className="stroke">{t.titleTop}</span>
          <br />
          <span className="accent">{t.titleBottom}</span>
        </h1>

        <div className="hero-bottom-row">
          <p className="hero-tagline">
            {t.tagline.map((line, i) => (
              <span key={i}>
                {line}
                {i < t.tagline.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="hero-scroll">
            <span className="hero-scroll-dot" />
            {t.scroll}
          </div>
        </div>
      </div>
    </section>
  )
}
