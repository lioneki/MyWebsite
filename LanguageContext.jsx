import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'site-lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'zh'
    // URL 上带 ?lang=en / ?lang=zh 时优先生效，方便分发"默认英文"或"默认中文"的链接
    const urlLang = new URLSearchParams(window.location.search).get('lang')
    if (urlLang === 'en' || urlLang === 'zh') {
      try {
        localStorage.setItem(STORAGE_KEY, urlLang)
      } catch (e) {
        // localStorage 不可用时忽略，不影响当前页面语言
      }
      return urlLang
    }
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'zh'
  })

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  function setLang(next) {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch (e) {
      // localStorage 不可用时静默失败，不影响当前页面语言
    }
  }

  function toggleLang() {
    setLang(lang === 'zh' ? 'en' : 'zh')
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage 必须在 LanguageProvider 内部使用')
  }
  return ctx
}
