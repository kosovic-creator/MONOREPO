import { useEffect, useState } from "react";
import { loadLocaleJson } from "./index";
import { useI18n } from "./useI18n";

export function useTranslations(page: string) {
  const { locale } = useI18n();
  const [dict, setDict] = useState<Record<string, string> | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const handler = () => setReloadKey(Date.now());
    window.addEventListener('translationsLoaded', handler);
    return () => window.removeEventListener('translationsLoaded', handler);
  }, []);

  useEffect(() => {
    loadLocaleJson(locale, page).then(setDict);
  }, [locale, page, reloadKey]);

  function t(key: string) {
    if (!dict) return '';
    return dict[key] || key;
  }

  return { t, loading: dict === null };
}
