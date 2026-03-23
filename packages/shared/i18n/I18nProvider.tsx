import React, { useState, useEffect } from 'react';
import { I18nContext, Locale, defaultLocale, setLocaleCookie } from './index';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const cookie = document.cookie.match(/locale=(en|sr)/);
    if (cookie) setLocale(cookie[1] as Locale);
  }, []);

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
