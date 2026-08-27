import { useState } from 'react'
import { useLanguage } from './LanguageContext.jsx'
import { content } from './content.js'
import { CornerMarks, DiagonalLine } from './Decor.jsx'
import { IconMail, IconInstagram, IconYoutube, IconXiaohongshu } from './icons.jsx'

const contactIcons = {
  mail: IconMail,
  instagram: IconInstagram,
  youtube: IconYoutube,
  xiaohongshu: IconXiaohongshu,
}

export default function Profile() {
  const { lang } = useLanguage()
  const t = content[lang].profile
  const [tab, setTab] = useState('about')

  return (
    <section id="profile" className="section profile">
      <div className="wrap">
        <div className="work-head">
          <div className="eyebrow">{t.eyebrow}</div>
          <div className="section-index">{t.location}</div>
        </div>

        <DiagonalLine style={{ top: '-6%', left: '34%', height: '55%', transform: 'rotate(-14deg)' }} />

        <div className="profile-grid">
          <div className="portrait arch">
            <img
              className="portrait-img"
              src="/profile/portrait-web.jpg"
              alt={content[lang].siteName}
              decoding="async"
            />
            <CornerMarks inset={14} />
            <span className="portrait-tag">{t.availability}</span>
            <span className="portrait-corner">FIG. 01</span>
          </div>

          <div>
            <div className="profile-tabs">
              <button
                type="button"
                className={`profile-tab ${tab === 'about' ? 'active' : ''}`}
                onClick={() => setTab('about')}
              >
                {t.tabAbout}
              </button>
              <button
                type="button"
                className={`profile-tab ${tab === 'cv' ? 'active' : ''}`}
                onClick={() => setTab('cv')}
              >
                {t.tabCv}
              </button>
            </div>

            <div className="profile-panels">
              <div className={`profile-panel ${tab === 'about' ? 'active' : ''}`}>
                <h2 className="profile-title">{t.aboutTitle}</h2>
                {t.aboutParagraphs.map((p, i) => (
                  <p className="profile-para" key={i}>
                    {p}
                  </p>
                ))}

                <div className="fact-list">
                  {t.facts.map((f) => (
                    <div className="fact-row" key={f.label}>
                      <span className="fact-label">{f.label}</span>
                      <span className="fact-value">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`profile-panel ${tab === 'cv' ? 'active' : ''}`}>
                <h2 className="profile-title">{t.cvTitle}</h2>
                <div className="cv-list">
                  {t.cvItems.map((item) => (
                    <div className="cv-row" key={item.desc}>
                      <span className="cv-year">{item.year}</span>
                      {item.href ? (
                        <a className="cv-desc cv-link" href={item.href} target="_blank" rel="noreferrer">
                          {item.desc}
                        </a>
                      ) : (
                        <span className="cv-desc">{item.desc}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="link-list">
              {t.contacts.map((c) => {
                const Icon = contactIcons[c.icon]
                return (
                  <a
                    className="link-row"
                    href={c.href}
                    key={c.label}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {Icon && <Icon className="link-icon" />}
                    <span className="link-value">{c.value}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
