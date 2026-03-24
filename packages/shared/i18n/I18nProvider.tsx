import React, { useState, useEffect } from 'react';
import { I18nContext } from './useI18n';
import { Locale, defaultLocale } from './index';
import { setLocaleCookie } from './cookie';

import { translations } from './index';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [translationsLoadedAt, setTranslationsLoadedAt] = useState(Date.now());


  // On mount, set locale from cookie if present
  useEffect(() => {
    const cookie = document.cookie.match(/locale=(en|sr)/);
    if (cookie) setLocale(cookie[1] as Locale);
  }, []);

  // On locale change, load all translation JSONs for that locale and populate global translations
  useEffect(() => {
    async function loadAllTranslations() {
      const pageNames = ["login", "register", "navbar", "home"];
      translations[locale] = translations[locale] || {};
      await Promise.all(
        pageNames.map(async (page) => {
          try {
            const res = await fetch(`/locale/${locale}/${page}.json`);
            if (res.ok) {
              translations[locale][page] = await res.json();
            }
          } catch (e) {
            // ignore
          }
        })
      );
      setTranslationsLoadedAt(Date.now());
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('translationsLoaded'));
      }
    }
    loadAllTranslations();
  }, [locale]);

  const handleSetLocale = (l: Locale) => {
    setLocale(l);
    setLocaleCookie(l);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
