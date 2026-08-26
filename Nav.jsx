import { useLanguage } from './LanguageContext.jsx'
import { content, nav } from './content.js'
import { IconCompass } from './icons.jsx'

export default function Nav() {
  const { lang, setLang } = useLanguage()
  const t = content[lang]
  const links = nav[lang]

  return (
    <header className="nav">
      <div className="wrap">
        <a href="index.html#top" className="nav-logo">
          <IconCompass className="ico" />
          {t.siteName}
        </a>

        <div className="nav-right">
          <nav>
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lang-toggle" role="group" aria-label="Language">
            <button type="button" className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>
              中
            </button>
            <span className="lang-sep">/</span>
            <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
              EN
            </button>
          </div>

          <a href="contact.html" className="btn">
            {t.navContactBtn}
          </a>
        </div>
      </div>
    </header>
  )
}
