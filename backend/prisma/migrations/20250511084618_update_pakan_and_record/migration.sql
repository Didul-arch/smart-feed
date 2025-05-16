/*
  Warnings:

  - You are about to drop the column `pakanId` on the `JadwalMakan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `JadwalMakan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `JadwalMakan` table. All the data in the column will be lost.
  - You are about to drop the column `waktu` on the `JadwalMakan` table. All the data in the column will be lost.
  - Added the required column `hari` to the `JadwalMakan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pagiJam` to the `JadwalMakan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pagiPakanId` to the `JadwalMakan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soreJam` to the `JadwalMakan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sorePakanId` to the `JadwalMakan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Pakan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipeMakan" AS ENUM ('PAGI', 'SORE');

-- DropForeignKey
ALTER TABLE "JadwalMakan" DROP CONSTRAINT "JadwalMakan_pakanId_fkey";

-- DropForeignKey
ALTER TABLE "JadwalMakan" DROP CONSTRAINT "JadwalMakan_userId_fkey";

-- AlterTable
ALTER TABLE "JadwalMakan" DROP COLUMN "pakanId",
DROP COLUMN "tanggal",
DROP COLUMN "userId",
DROP COLUMN "waktu",
ADD COLUMN     "hari" TEXT NOT NULL,
ADD COLUMN     "pagiJam" TEXT NOT NULL,
ADD COLUMN     "pagiPakanId" INTEGER NOT NULL,
ADD COLUMN     "soreJam" TEXT NOT NULL,
ADD COLUMN     "sorePakanId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pakan" ADD COLUMN     "nama" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "jadwalId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "pakanId" INTEGER NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JadwalMakan" ADD CONSTRAINT "JadwalMakan_pagiPakanId_fkey" FOREIGN KEY ("pagiPakanId") REFERENCES "Pakan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalMakan" ADD CONSTRAINT "JadwalMakan_sorePakanId_fkey" FOREIGN KEY ("sorePakanId") REFERENCES "Pakan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_jadwalId_fkey" FOREIGN KEY ("jadwalId") REFERENCES "JadwalMakan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
