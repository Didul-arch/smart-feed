/*
  Warnings:

  - Added the required column `jenisKelamin` to the `Sapi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sapi" ADD COLUMN     "jenisKelamin" TEXT NOT NULL;
