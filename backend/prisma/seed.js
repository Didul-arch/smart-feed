const { PrismaClient, Hari, SesiPemberianMakan } = require("../generated/prisma"); // Pastikan path ke client benar
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  console.log("Start seeding ...");

  // Hapus semua data dengan urutan yang benar untuk menghindari konflik foreign key
  await prisma.recordPemberianMakan.deleteMany();
  await prisma.jadwalHarian.deleteMany();
  await prisma.sapi.deleteMany();
  await prisma.pakan.deleteMany();
  await prisma.kandang.deleteMany();
  await prisma.user.deleteMany();
  console.log("Old data deleted.");

  // Reset auto increment untuk tabel dengan ID integer (PostgreSQL)
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "User_id_seq" RESTART WITH 1;');
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "Kandang_id_seq" RESTART WITH 1;');
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "Sapi_id_seq" RESTART WITH 1;');
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "Pakan_id_seq" RESTART WITH 1;');
  console.log("Sequences reset.");

  // User dummy
  const passwordHash = await bcrypt.hash("password123", 10);
  const user1 = await prisma.user.create({
    data: {
      email: "peternak.utama@example.com",
      password: passwordHash,
      nama: "Peternak Utama",
    },
  });
  console.log(`Created user with id: ${user1.id}`);

  // Kandang dummy
  const kandangA = await prisma.kandang.create({
    data: {
      nama: "Kandang Alpha",
      lokasi: "Area Utara",
      kapasitas: 15,
    },
  });
  const kandangB = await prisma.kandang.create({
    data: {
      nama: "Kandang Beta",
      lokasi: "Area Selatan",
      kapasitas: 10,
    },
  });
  console.log(`Created kandang: ${kandangA.nama}, ${kandangB.nama}`);

  // Pakan dummy
  const pakanRumput = await prisma.pakan.create({
    data: {
      nama: "Rumput Segar",
      jenis: "Hijauan",
      banyakStok: 200,
      harga: 2000,
      image: "rumput.jpg",
    },
  });
  const pakanKonsentrat = await prisma.pakan.create({
    data: {
      nama: "Konsentrat Super",
      jenis: "Konsentrat",
      banyakStok: 100,
      harga: 7500,
      image: "konsentrat.jpg",
    },
  });
  const pakanJerami = await prisma.pakan.create({
    data: {
      nama: "Jerami Kering",
      jenis: "Hijauan Kering",
      banyakStok: 150,
      harga: 1500,
      image: "jerami.jpg",
    },
  });
  console.log(`Created pakan: ${pakanRumput.nama}, ${pakanKonsentrat.nama}, ${pakanJerami.nama}`);

  // Sapi dummy
  const sapi01 = await prisma.sapi.create({
    data: {
      jenis: "Sapi Limousin A1",
      bobot: 450,
      image: "sapi_limousin_a1.jpg",
      kandangId: kandangA.id,
      tanggalLahir: new Date("2022-03-10T00:00:00.000Z"),
    },
  });
  const sapi02 = await prisma.sapi.create({
    data: {
      jenis: "Sapi Brahman A2",
      bobot: 400,
      image: "sapi_brahman_a2.jpg",
      kandangId: kandangA.id,
      tanggalLahir: new Date("2022-07-20T00:00:00.000Z"),
    },
  });
  const sapi03 = await prisma.sapi.create({
    data: {
      jenis: "Sapi Simental B1",
      bobot: 500,
      image: "sapi_simental_b1.jpg",
      kandangId: kandangB.id,
      tanggalLahir: new Date("2021-11-05T00:00:00.000Z"),
    },
  });
  console.log(`Created sapi: ${sapi01.jenis} (ID: ${sapi01.id}), ${sapi02.jenis} (ID: ${sapi02.id}), ${sapi03.jenis} (ID: ${sapi03.id})`);

  // JadwalHarian dummy (PER SAPI)
  // Jadwal untuk Sapi01
  await prisma.jadwalHarian.createMany({
    data: [
      { sapiId: sapi01.id, hari: Hari.SENIN, pagiPakanId: pakanRumput.id, pagiWaktu: "07:00", sorePakanId: pakanKonsentrat.id, soreWaktu: "16:00" },
      { sapiId: sapi01.id, hari: Hari.SELASA, pagiPakanId: pakanRumput.id, pagiWaktu: "07:05", sorePakanId: pakanKonsentrat.id, soreWaktu: "16:05" },
      { sapiId: sapi01.id, hari: Hari.RABU, pagiPakanId: pakanJerami.id, pagiWaktu: "07:10", sorePakanId: pakanKonsentrat.id, soreWaktu: "16:10" },
      // Tambahkan hari lain untuk sapi01 jika perlu
    ],
  });
  // Jadwal untuk Sapi02
  await prisma.jadwalHarian.createMany({
    data: [
      { sapiId: sapi02.id, hari: Hari.SENIN, pagiPakanId: pakanJerami.id, pagiWaktu: "07:30", sorePakanId: pakanRumput.id, soreWaktu: "16:30" },
      { sapiId: sapi02.id, hari: Hari.SELASA, pagiPakanId: pakanJerami.id, pagiWaktu: "07:35", sorePakanId: pakanRumput.id, soreWaktu: "16:35" },
      // Tambahkan hari lain untuk sapi02 jika perlu
    ],
  });
  // Jadwal untuk Sapi03
  await prisma.jadwalHarian.createMany({
    data: [
      { sapiId: sapi03.id, hari: Hari.SENIN, pagiPakanId: pakanKonsentrat.id, pagiWaktu: "08:00", sorePakanId: pakanRumput.id, soreWaktu: "17:00" },
      { sapiId: sapi03.id, hari: Hari.SELASA, pagiPakanId: pakanKonsentrat.id, pagiWaktu: "08:05", sorePakanId: pakanJerami.id, soreWaktu: "17:05" },
      // Tambahkan hari lain untuk sapi03 jika perlu
    ],
  });
  console.log("Created JadwalHarian dummy data for each Sapi.");

  // RecordPemberianMakan dummy
  // Misal hari ini adalah 20 Mei 2025 (Selasa)
  const tanggalHariIni = new Date("2025-05-20T00:00:00.000Z"); // Selasa
  const tanggalKemarin = new Date("2025-05-19T00:00:00.000Z"); // Senin

  await prisma.recordPemberianMakan.createMany({
    data: [
      // Sapi01 (Kandang A), Kemarin (Senin)
      { sapiId: sapi01.id, pakanDiberikanId: pakanRumput.id, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.PAGI, waktuPemberianActual: new Date("2025-05-19T07:05:00.000Z"), kandangId: sapi01.kandangId },
      { sapiId: sapi01.id, pakanDiberikanId: pakanKonsentrat.id, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.SORE, waktuPemberianActual: new Date("2025-05-19T16:10:00.000Z"), kandangId: sapi01.kandangId },
      
      // Sapi02 (Kandang A), Kemarin (Senin) - hanya pagi
      { sapiId: sapi02.id, pakanDiberikanId: pakanJerami.id, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.PAGI, waktuPemberianActual: new Date("2025-05-19T07:38:00.000Z"), kandangId: sapi02.kandangId },

      // Sapi01 (Kandang A), Hari Ini (Selasa) - hanya pagi
      { sapiId: sapi01.id, pakanDiberikanId: pakanRumput.id, tanggalPemberian: tanggalHariIni, sesi: SesiPemberianMakan.PAGI, waktuPemberianActual: new Date("2025-05-20T07:12:00.000Z"), kandangId: sapi01.kandangId },

      // Sapi03 (Kandang B), Kemarin (Senin)
      { sapiId: sapi03.id, pakanDiberikanId: pakanKonsentrat.id, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.PAGI, waktuPemberianActual: new Date("2025-05-19T08:05:00.000Z"), kandangId: sapi03.kandangId },
      { sapiId: sapi03.id, pakanDiberikanId: pakanRumput.id, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.SORE, waktuPemberianActual: new Date("2025-05-19T17:10:00.000Z"), kandangId: sapi03.kandangId },
    ],
  });
  console.log("Created RecordPemberianMakan dummy data.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });