import { useLanguage } from './LanguageContext.jsx'
import { content, social } from './content.js'
import { IconArrowRight } from './icons.jsx'
import { CornerMarks } from './Decor.jsx'

export default function ContactFooter() {
  const { lang } = useLanguage()
  const t = content[lang].contact

  return (
    <section id="contact" className="section footer-section">
      <CornerMarks inset={26} />
      <div className="wrap footer-main">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2 className="footer-headline">
          {t.titleTop} <span className="accent">{t.titleBottom}</span>
        </h2>
        <p className="footer-sub">{t.subtitle}</p>

        <div className="footer-actions">
          <a className="btn btn-solid btn-lg" href="contact.html">
            {t.inquiryBtn}
            <IconArrowRight style={{ width: 14, height: 14 }} aria-hidden="true" />
          </a>
          <div className="footer-email-row">
            <span>{t.emailLabel}</span>
            <a href={`mailto:${social.email}`}>{social.email}</a>
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} {content[lang].siteName}. ALL RIGHTS RESERVED.</span>
        <a className="back-top" href="#top">
          {t.back}
        </a>
      </div>
    </section>
  )
}
