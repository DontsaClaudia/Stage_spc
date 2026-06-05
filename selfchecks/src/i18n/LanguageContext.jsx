import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './languageContext'
import { en, fr } from './translations'

const STORAGE_KEY = 'selfchecks-lang'

const dictionaries = { fr, en }

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' ? 'en' : 'fr'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const dictionary = dictionaries[lang] ?? fr

    const t = (key) => {
      const result = getByPath(dictionary, key)
      if (result === undefined) {
        return getByPath(fr, key) ?? key
      }
      return result
    }

    const toggleLang = () => setLang((current) => (current === 'fr' ? 'en' : 'fr'))

    return { lang, setLang, toggleLang, t }
  }, [lang])

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}
