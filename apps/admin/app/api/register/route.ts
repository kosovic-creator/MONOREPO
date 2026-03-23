import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, ime, uloga } = await req.json();
    if (!email || !password || !ime || !uloga) {
      return NextResponse.json({ error: "Sva polja su obavezna" }, { status: 400 });
    }
    let exists = await prisma.korisnik.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Email već postoji" }, { status: 400 });
    }
    const user = await prisma.korisnik.create({
      data: {
        email,
        lozinka: await hash(password, 10),
        ime,
        uloga,
      },
    });
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        ime: user.ime,
        prezime: 'prezime' in user ? (user as any).prezime : null,
        uloga: user.uloga,
      }
    });
  } catch (e) {
    return NextResponse.json({ error: "Greška na serveru" }, { status: 500 });
  }
}
