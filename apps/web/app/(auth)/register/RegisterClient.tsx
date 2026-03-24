"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTranslations } from "../../../../../packages/../packages/shared/i18n/useTranslations";
import { useI18n } from "@../../../../packages/shared/i18n/useI18n";
import { getRegisterSchema } from "@../../../../../packages/shared/validation";

export default function RegisterClient() {
  const { locale } = useI18n();
  const { t } = useTranslations("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uloga, setUloga] = useState("user");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const schema = await getRegisterSchema(locale);
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0]?.message || t("error"));
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, ime, uloga }),
    });
    if (res.ok) {
      setSuccess(t("register_success"));
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError(t("register_error"));
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">{t("register")}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t("email")}
          className="border p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder={t("password")}
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={ime}
          onChange={e => setIme(e.target.value)}
          placeholder={t("ime")}
          className="border p-2 rounded"
        />
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {t("register")}
        </button>
      </form>
    </div>
  );
}
