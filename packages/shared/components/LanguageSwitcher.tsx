import React, { useTransition } from 'react';
import { locales, useI18n } from '../i18n';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={locale}
      onChange={e => {
        const newLocale = e.target.value as keyof typeof locales;
        startTransition(() => setLocale(newLocale));
      }}
      disabled={isPending}
      className="border rounded px-2 py-1 ml-2"
    >
      {Object.entries(locales).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}
