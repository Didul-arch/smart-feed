-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sapi" (
    "id" SERIAL NOT NULL,
    "jenis" TEXT NOT NULL,
    "bobot" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "tanggalKematian" TIMESTAMP(3),

    CONSTRAINT "Sapi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pakan" (
    "id" SERIAL NOT NULL,
    "jenis" TEXT NOT NULL,
    "banyakStok" DOUBLE PRECISION NOT NULL,
    "harga" DOUBLE PRECISION,
    "image" TEXT NOT NULL,

    CONSTRAINT "Pakan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JadwalMakan" (
    "id" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "sapiId" INTEGER NOT NULL,
    "pakanId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JadwalMakan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JadwalMakan" ADD CONSTRAINT "JadwalMakan_sapiId_fkey" FOREIGN KEY ("sapiId") REFERENCES "Sapi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalMakan" ADD CONSTRAINT "JadwalMakan_pakanId_fkey" FOREIGN KEY ("pakanId") REFERENCES "Pakan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalMakan" ADD CONSTRAINT "JadwalMakan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
