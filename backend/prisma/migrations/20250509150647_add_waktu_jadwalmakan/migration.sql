/*
  Warnings:

  - Added the required column `waktu` to the `JadwalMakan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JadwalMakan" ADD COLUMN     "waktu" TEXT NOT NULL;
