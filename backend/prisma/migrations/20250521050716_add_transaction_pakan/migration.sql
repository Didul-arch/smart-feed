/*
  Warnings:

  - Added the required column `jumlahDiberikan` to the `RecordPemberianMakan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordPemberianMakan" ADD COLUMN     "jumlahDiberikan" DOUBLE PRECISION NOT NULL;
