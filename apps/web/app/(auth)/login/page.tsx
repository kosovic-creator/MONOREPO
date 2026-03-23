"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useI18n, t } from "../../.././../../packages/shared/i18n";
import { getLoginSchema } from "../../../../../packages/shared/validation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { locale } = useI18n();
  const translate = (key: string) => t(locale, key);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const schema = getLoginSchema(locale);
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0]?.message || translate("error"));
      return;
    }
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/");
    } else {
      setError(translate("invalid_login"));
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">{translate("login")}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button type="submit" className="btn btn-primary">{translate("login")}</button>
      </form>
    </div>
  );
}
