"use client";


import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LanguageSwitcher } from "../../../../packages/shared/components/LanguageSwitcher";
import { useI18n } from "../../../../packages/shared/i18n";
const t = (key: string, locale: string) => require("../../../../packages/shared/i18n").t(locale, key);

export default function Navbar() {
  const { data: session } = useSession();
  const { locale } = useI18n();
  return (
    <nav className="flex items-center gap-4 p-4 border-b">
      <Link href="/">{t("home", locale)}</Link>
      {session ? (
        <button onClick={() => signOut()} className="ml-auto">{t("logout", locale)}</button>
      ) : (
        <div className="ml-auto flex gap-2">
            <Link href="/login">{t("login", locale)}</Link>
            <Link href="/register">{t("register", locale)}</Link>
        </div>
      )}
      <LanguageSwitcher />
    </nav>
  );
}
