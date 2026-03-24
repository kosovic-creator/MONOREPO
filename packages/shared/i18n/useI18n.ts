import { useContext, createContext } from 'react';
import type { Locale } from './index';

export const I18nContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({
  locale: 'en',
  setLocale: () => {},
});

export function useI18n() {
  return useContext(I18nContext);
}
