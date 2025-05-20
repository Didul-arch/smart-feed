/*
  Warnings:

  - You are about to drop the `JadwalMakan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Record` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Hari" AS ENUM ('SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU');

-- CreateEnum
CREATE TYPE "SesiPemberianMakan" AS ENUM ('PAGI', 'SORE');

-- DropForeignKey
ALTER TABLE "JadwalMakan" DROP CONSTRAINT "JadwalMakan_pagiPakanId_fkey";

-- DropForeignKey
ALTER TABLE "JadwalMakan" DROP CONSTRAINT "JadwalMakan_sapiId_fkey";

-- DropForeignKey
ALTER TABLE "JadwalMakan" DROP CONSTRAINT "JadwalMakan_sorePakanId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_jadwalId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_pakanId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_userId_fkey";

-- DropTable
DROP TABLE "JadwalMakan";

-- DropTable
DROP TABLE "Record";

-- DropEnum
DROP TYPE "TipeMakan";

-- CreateTable
CREATE TABLE "JadwalHarian" (
    "id" TEXT NOT NULL,
    "kandangId" INTEGER NOT NULL,
    "hari" "Hari" NOT NULL,
    "pagiPakanId" INTEGER,
    "pagiWaktu" TEXT,
    "sorePakanId" INTEGER,
    "soreWaktu" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JadwalHarian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordPemberianMakan" (
    "id" TEXT NOT NULL,
    "sapiId" INTEGER NOT NULL,
    "pakanDiberikanId" INTEGER NOT NULL,
    "tanggalPemberian" TIMESTAMP(3) NOT NULL,
    "sesi" "SesiPemberianMakan" NOT NULL,
    "waktuPemberianActual" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kandangId" INTEGER NOT NULL,

    CONSTRAINT "RecordPemberianMakan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JadwalHarian_kandangId_hari_key" ON "JadwalHarian"("kandangId", "hari");

-- CreateIndex
CREATE INDEX "RecordPemberianMakan_kandangId_tanggalPemberian_idx" ON "RecordPemberianMakan"("kandangId", "tanggalPemberian");

-- CreateIndex
CREATE UNIQUE INDEX "RecordPemberianMakan_sapiId_tanggalPemberian_sesi_key" ON "RecordPemberianMakan"("sapiId", "tanggalPemberian", "sesi");

-- AddForeignKey
ALTER TABLE "JadwalHarian" ADD CONSTRAINT "JadwalHarian_kandangId_fkey" FOREIGN KEY ("kandangId") REFERENCES "Kandang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalHarian" ADD CONSTRAINT "JadwalHarian_pagiPakanId_fkey" FOREIGN KEY ("pagiPakanId") REFERENCES "Pakan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalHarian" ADD CONSTRAINT "JadwalHarian_sorePakanId_fkey" FOREIGN KEY ("sorePakanId") REFERENCES "Pakan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPemberianMakan" ADD CONSTRAINT "RecordPemberianMakan_sapiId_fkey" FOREIGN KEY ("sapiId") REFERENCES "Sapi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPemberianMakan" ADD CONSTRAINT "RecordPemberianMakan_pakanDiberikanId_fkey" FOREIGN KEY ("pakanDiberikanId") REFERENCES "Pakan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
