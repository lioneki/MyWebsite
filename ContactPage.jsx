import { useEffect, useState } from 'react'
import Nav from './Nav.jsx'
import { useLanguage } from './LanguageContext.jsx'
import { content, social } from './content.js'
import { IconArrowRight } from './icons.jsx'

export default function ContactPage() {
  const { lang } = useLanguage()
  const t = content[lang].contactPage
  const back = content[lang].portfolioPage.back
  const [sent, setSent] = useState(false)

  // FormSubmit 提交后会带着 ?sent=1 跳回这个页面，这里用它来判断要不要显示"已发送"状态，
  // 而不是让用户停留在 formsubmit.co 那个没有品牌感的默认确认页上
  useEffect(() => {
    setSent(new URLSearchParams(window.location.search).get('sent') === '1')
  }, [])

  const nextUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?sent=1` : ''

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="section contact-page-section">
          <div className="wrap">
            <a href="index.html" className="portfolio-back">
              {back}
            </a>
            <div className="eyebrow">{t.eyebrow}</div>

            {sent ? (
              <>
                <h1 className="contact-page-title">{t.sentTitle}</h1>
                <p className="contact-page-desc">{t.sentDesc}</p>
                <div className="form-submit-row">
                  <a href="index.html" className="btn">
                    {t.sentBack}
                  </a>
                </div>
              </>
            ) : (
              <>
                <h1 className="contact-page-title">{t.title}</h1>
                <p className="contact-page-desc">{t.desc}</p>

                <form className="inquiry-form" action={`https://formsubmit.co/${social.email}`} method="POST">
                  <input type="hidden" name="_subject" value="新的项目咨询 / New project inquiry" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}

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
                      <IconArrowRight style={{ width: 14, height: 14 }} aria-hidden="true" />
                    </button>
                  </div>

                  <p className="form-note">{t.note}</p>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
