"use client";


import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LanguageSwitcher } from "../../../../packages/shared/components/LanguageSwitcher";
import { useTranslations } from "../../../../packages/shared/i18n/useTranslations";

export default function Navbar() {
  const { data: session } = useSession();
  const { t } = useTranslations("navbar");
  return (
    <nav className="flex items-center gap-4 p-4 border-b">
      <Link href="/">{t("home")}</Link>
      {session ? (
        <button onClick={() => signOut()} className="ml-auto">{t("logout")}</button>
      ) : (
        <div className="ml-auto flex gap-2">
            <Link href="/login">{t("login")}</Link>
            <Link href="/register">{t("register")}</Link>
        </div>
      )}
      <LanguageSwitcher />
    </nav>
  );
}
