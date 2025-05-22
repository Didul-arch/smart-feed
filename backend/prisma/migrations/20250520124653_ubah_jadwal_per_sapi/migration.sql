/*
  Warnings:

  - You are about to drop the column `kandangId` on the `JadwalHarian` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sapiId,hari]` on the table `JadwalHarian` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sapiId` to the `JadwalHarian` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JadwalHarian" DROP CONSTRAINT "JadwalHarian_kandangId_fkey";

-- DropIndex
DROP INDEX "JadwalHarian_kandangId_hari_key";

-- AlterTable
ALTER TABLE "JadwalHarian" DROP COLUMN "kandangId",
ADD COLUMN     "sapiId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JadwalHarian_sapiId_hari_key" ON "JadwalHarian"("sapiId", "hari");

-- AddForeignKey
ALTER TABLE "JadwalHarian" ADD CONSTRAINT "JadwalHarian_sapiId_fkey" FOREIGN KEY ("sapiId") REFERENCES "Sapi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
