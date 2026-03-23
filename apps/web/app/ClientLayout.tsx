"use client";
import { SessionProvider } from "next-auth/react";
import { I18nProvider } from "../../../packages/shared/i18n/I18nProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <I18nProvider>{children}</I18nProvider>
    </SessionProvider>
  );
}
