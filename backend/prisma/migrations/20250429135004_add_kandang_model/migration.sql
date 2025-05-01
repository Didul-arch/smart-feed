/*
  Warnings:

  - You are about to drop the column `idKandang` on the `Sapi` table. All the data in the column will be lost.
  - Added the required column `kandangId` to the `Sapi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sapi" DROP COLUMN "idKandang",
ADD COLUMN     "kandangId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Kandang" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "lokasi" TEXT,
    "kapasitas" INTEGER NOT NULL,

    CONSTRAINT "Kandang_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sapi" ADD CONSTRAINT "Sapi_kandangId_fkey" FOREIGN KEY ("kandangId") REFERENCES "Kandang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
