"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uloga, setUloga] = useState("admin");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, ime, uloga }),
    });
    if (res.ok) {
      setSuccess("Registracija uspješna! Prijavite se.");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError("Greška pri registraciji");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">Registracija (Admin)</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ime"
          value={ime}
          onChange={e => setIme(e.target.value)}
          className="input input-bordered"
          required
        />

        <select
          value={uloga}
          onChange={e => setUloga(e.target.value)}
          className="input input-bordered"
          required
        >
          <option value="admin">Admin</option>
          <option value="user">Korisnik</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input input-bordered"
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input input-bordered"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="btn btn-primary">Registruj se</button>
      </form>
    </div>
  );
}
