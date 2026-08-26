import { useLanguage } from './LanguageContext.jsx'
import { content, social } from './content.js'
import { IconPaypal } from './icons.jsx'
import { CornerMarks, DiagonalLine } from './Decor.jsx'

export default function Support() {
  const { lang } = useLanguage()
  const t = content[lang].support

  return (
    <section id="support" className="section support">
      <div className="wrap">
        <div className="support-card">
          <CornerMarks inset={18} />
          <DiagonalLine style={{ top: '-10%', left: '18%', height: '60%', transform: 'rotate(-10deg)' }} />
          <div className="eyebrow support-eyebrow">{t.eyebrow}</div>
          <h2 className="support-title">
            {t.titleTop} <span className="accent">{t.titleBottom}</span>
          </h2>
          <p className="support-body">{t.body}</p>

          <div className="support-actions">
            <a
              className="btn btn-solid btn-lg"
              href={social.paypal}
              target="_blank"
              rel="noreferrer"
            >
              <IconPaypal style={{ width: 16, height: 16 }} />
              {t.paypalLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
