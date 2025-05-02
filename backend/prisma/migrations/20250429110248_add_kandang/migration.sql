/*
  Warnings:

  - Added the required column `idKandang` to the `Sapi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sapi" ADD COLUMN     "idKandang" TEXT NOT NULL;
