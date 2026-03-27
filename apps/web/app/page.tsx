
"use client";

import { useTranslations } from '@monorepo/shared/i18n/useTranslations';

export default function Home() {
  const { t } = useTranslations("home");
  return (
    <main className="p-8 text-2xl font-bold">
      {t("title_web")}
    </main>
  );
}