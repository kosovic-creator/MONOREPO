"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center gap-4 p-4 border-b">
      <Link href="/">Početna</Link>
      {session ? (
        <button onClick={() => signOut()} className="ml-auto">Odjava</button>
      ) : (
        <div className="ml-auto flex gap-2">
          <Link href="/login">Prijava</Link>
          <Link href="/register">Registracija</Link>
        </div>
      )}
    </nav>
  );
}
