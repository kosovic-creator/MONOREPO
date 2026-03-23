"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n, t } from "../../../../../packages/shared/i18n";
import { getRegisterSchema } from "../../../../../packages/shared/validation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uloga, setUloga] = useState("user");
  const router = useRouter();
  const { locale } = useI18n();
  const translate = (key: string) => t(locale, key);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const schema = getRegisterSchema(locale);
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0]?.message || translate("error"));
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, ime, uloga }),
    });
    if (res.ok) {
      setSuccess(translate("register_success"));
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError(translate("register_error"));
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">{translate("register")}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={translate("name")}
          value={ime}
          onChange={e => setIme(e.target.value)}
          className="input input-bordered"
        />
        <select
          value={uloga}
          onChange={e => setUloga(e.target.value)}
          className="input input-bordered"
        >
          <option value="user">{translate("user")}</option>
          <option value="admin">{translate("admin")}</option>
        </select>
        <input
          type="email"
          placeholder={translate("email")}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="password"
          placeholder={translate("password")}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input input-bordered"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="btn btn-primary">{translate("register")}</button>
      </form>
    </div>
  );
}
