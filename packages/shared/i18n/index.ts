import { loadLocale } from './loadLocale';
// Centralized i18n helpers and types for monorepo (NO React code)
export type Locale = 'en' | 'sr';

export const locales: Record<Locale, string> = {
  en: 'English',
  sr: 'Srpski',
};

export const defaultLocale: Locale = 'en';

// Universal async loader for locale JSON (browser only)
// For server-side loading, import { loadLocale } from '../server/loadLocale' direktno u server kodu (API route, server action, getServerSideProps, itd.)
export async function loadLocaleJson(locale: Locale, page: string): Promise<Record<string, string>> {
  // Browser: use in-memory translations (should be provided by I18nProvider)
  if (translations[locale] && translations[locale][page]) {
    return translations[locale][page];
  }
  // If not found, warn and return empty object
  console.warn('Translations not found in memory for', locale, page);
  return {};
}

// Helper for sync fallback (for static imports or tests)
export let translations: Record<string, any> = {};

export function t(locale: Locale, key: string, page: string = 'login'): string {
  if (translations[locale] && translations[locale][page]) {
    return translations[locale][page][key] || key;
  }
  return key;
}

export { setLocaleCookie } from './cookie';
