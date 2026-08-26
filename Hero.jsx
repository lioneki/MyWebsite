import { useLanguage } from './LanguageContext.jsx'
import { content } from './content.js'
import { IconCompass, IconStar } from './icons.jsx'
import { CornerMarks, DiagonalLine, VerticalRule } from './Decor.jsx'

export default function Hero() {
  const { lang } = useLanguage()
  const t = content[lang].hero

  return (
    <section id="top" className="section hero">
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
                <br />
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
