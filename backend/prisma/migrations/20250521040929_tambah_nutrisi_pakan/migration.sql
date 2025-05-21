/*
  Warnings:

  - Added the required column `updatedAt` to the `Pakan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pakan" ADD COLUMN     "bk" DOUBLE PRECISION,
ADD COLUMN     "ca" DOUBLE PRECISION,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "p" DOUBLE PRECISION,
ADD COLUMN     "pk" DOUBLE PRECISION,
ADD COLUMN     "sk" DOUBLE PRECISION,
ADD COLUMN     "tdn" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
