import Nav from './Nav.jsx'
import { useLanguage } from './LanguageContext.jsx'
import { content, social } from './content.js'
import { IconArrowRight } from './icons.jsx'

export default function ContactPage() {
  const { lang } = useLanguage()
  const t = content[lang].contactPage
  const back = content[lang].portfolioPage.back

  return (
    <>
      <Nav />
      <main>
        <section className="section contact-page-section">
          <div className="wrap">
            <a href="index.html" className="portfolio-back">
              {back}
            </a>
            <div className="eyebrow">{t.eyebrow}</div>
            <h1 className="contact-page-title">{t.title}</h1>
            <p className="contact-page-desc">{t.desc}</p>

            <form className="inquiry-form" action={`https://formsubmit.co/${social.email}`} method="POST">
              <input type="hidden" name="_subject" value="新的项目咨询 / New project inquiry" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="form-field">
                <label htmlFor="email">{t.emailLabel}</label>
                <input id="email" type="email" name="email" placeholder={t.emailPlaceholder} required />
              </div>

              <div className="form-field">
                <label htmlFor="message">{t.messageLabel}</label>
                <textarea id="message" name="message" placeholder={t.messagePlaceholder} required />
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn btn-solid btn-lg">
                  {t.submit}
                  <IconArrowRight style={{ width: 14, height: 14 }} />
                </button>
              </div>

              <p className="form-note">{t.note}</p>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
