-- CreateTable
CREATE TABLE "Korisnik" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lozinka" TEXT,
    "ime" TEXT,
    "uloga" TEXT NOT NULL DEFAULT 'korisnik',
    "kreiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "azuriran" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Korisnik_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PodaciPreuzimanja" (
    "id" TEXT NOT NULL,
    "korisnikId" TEXT NOT NULL,
    "ime" TEXT NOT NULL,
    "prezime" TEXT NOT NULL,
    "adresa" TEXT NOT NULL,
    "drzava" TEXT NOT NULL,
    "grad" TEXT NOT NULL,
    "postanskiBroj" INTEGER NOT NULL,
    "telefon" TEXT NOT NULL,
    "kreiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "azuriran" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PodaciPreuzimanja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StavkaKorpe" (
    "id" TEXT NOT NULL,
    "korisnikId" TEXT NOT NULL,
    "proizvodId" TEXT NOT NULL,
    "kolicina" INTEGER NOT NULL DEFAULT 1,
    "boja" TEXT,
    "boja_en" TEXT,
    "velicina" TEXT,
    "kreiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "azuriran" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StavkaKorpe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Porudzbina" (
    "id" TEXT NOT NULL,
    "korisnikId" TEXT NOT NULL,
    "ukupno" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "email" TEXT,
    "kreiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "azuriran" TIMESTAMP(3) NOT NULL,
    "idPlacanja" TEXT,

    CONSTRAINT "Porudzbina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StavkaPorudzbine" (
    "id" TEXT NOT NULL,
    "porudzbinaId" TEXT NOT NULL,
    "proizvodId" TEXT NOT NULL,
    "kolicina" INTEGER NOT NULL,
    "cena" DOUBLE PRECISION NOT NULL,
    "opis" TEXT,
    "rating" INTEGER,
    "boja" TEXT,
    "velicina" TEXT,
    "kreiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "azuriran" TIMESTAMP(3) NOT NULL,
    "slika" TEXT,

    CONSTRAINT "StavkaPorudzbine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Omiljeni" (
    "id" TEXT NOT NULL,
    "korisnikId" TEXT NOT NULL,
    "proizvodId" TEXT NOT NULL,
    "kreiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Omiljeni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proizvod" (
    "id" TEXT NOT NULL,
    "cena" DOUBLE PRECISION NOT NULL,
    "slike" TEXT[],
    "kreiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "azuriran" TIMESTAMP(3) NOT NULL,
    "naziv_sr" TEXT NOT NULL,
    "opis_sr" TEXT,
    "karakteristike_sr" TEXT,
    "kategorija_sr" TEXT NOT NULL,
    "naziv_en" TEXT NOT NULL,
    "opis_en" TEXT,
    "karakteristike_en" TEXT,
    "kategorija_en" TEXT NOT NULL,
    "pol" TEXT,
    "pol_en" TEXT,
    "uzrast" TEXT,
    "uzrast_en" TEXT,
    "brend" TEXT,
    "boja" TEXT[],
    "boja_en" TEXT[],
    "materijal" TEXT,
    "materijal_en" TEXT,
    "popust" DOUBLE PRECISION,

    CONSTRAINT "Proizvod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProizvodVarijanta" (
    "id" TEXT NOT NULL,
    "proizvodId" TEXT NOT NULL,
    "boja" TEXT NOT NULL,
    "boja_en" TEXT NOT NULL DEFAULT '',
    "velicina" TEXT NOT NULL,
    "kolicina" INTEGER NOT NULL,
    "prodavnica_br" INTEGER NOT NULL DEFAULT 1,
    "kreiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "azuriran" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProizvodVarijanta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Korisnik_email_key" ON "Korisnik"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KorisnikAdmin_email_key" ON "KorisnikAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PodaciPreuzimanja_korisnikId_key" ON "PodaciPreuzimanja"("korisnikId");

-- CreateIndex
CREATE INDEX "StavkaKorpe_korisnikId_idx" ON "StavkaKorpe"("korisnikId");

-- CreateIndex
CREATE UNIQUE INDEX "StavkaKorpe_korisnikId_proizvodId_boja_velicina_key" ON "StavkaKorpe"("korisnikId", "proizvodId", "boja", "velicina");

-- CreateIndex
CREATE UNIQUE INDEX "Porudzbina_idPlacanja_key" ON "Porudzbina"("idPlacanja");

-- CreateIndex
CREATE INDEX "Porudzbina_korisnikId_idx" ON "Porudzbina"("korisnikId");

-- CreateIndex
CREATE INDEX "StavkaPorudzbine_porudzbinaId_idx" ON "StavkaPorudzbine"("porudzbinaId");

-- CreateIndex
CREATE INDEX "Omiljeni_korisnikId_idx" ON "Omiljeni"("korisnikId");

-- CreateIndex
CREATE UNIQUE INDEX "Omiljeni_korisnikId_proizvodId_key" ON "Omiljeni"("korisnikId", "proizvodId");

-- CreateIndex
CREATE INDEX "ProizvodVarijanta_proizvodId_idx" ON "ProizvodVarijanta"("proizvodId");

-- CreateIndex
CREATE UNIQUE INDEX "ProizvodVarijanta_proizvodId_boja_velicina_prodavnica_br_key" ON "ProizvodVarijanta"("proizvodId", "boja", "velicina", "prodavnica_br");

-- AddForeignKey
ALTER TABLE "PodaciPreuzimanja" ADD CONSTRAINT "PodaciPreuzimanja_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StavkaKorpe" ADD CONSTRAINT "StavkaKorpe_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StavkaKorpe" ADD CONSTRAINT "StavkaKorpe_proizvodId_fkey" FOREIGN KEY ("proizvodId") REFERENCES "Proizvod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Porudzbina" ADD CONSTRAINT "Porudzbina_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StavkaPorudzbine" ADD CONSTRAINT "StavkaPorudzbine_porudzbinaId_fkey" FOREIGN KEY ("porudzbinaId") REFERENCES "Porudzbina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StavkaPorudzbine" ADD CONSTRAINT "StavkaPorudzbine_proizvodId_fkey" FOREIGN KEY ("proizvodId") REFERENCES "Proizvod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Omiljeni" ADD CONSTRAINT "Omiljeni_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Omiljeni" ADD CONSTRAINT "Omiljeni_proizvodId_fkey" FOREIGN KEY ("proizvodId") REFERENCES "Proizvod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProizvodVarijanta" ADD CONSTRAINT "ProizvodVarijanta_proizvodId_fkey" FOREIGN KEY ("proizvodId") REFERENCES "Proizvod"("id") ON DELETE CASCADE ON UPDATE CASCADE;
