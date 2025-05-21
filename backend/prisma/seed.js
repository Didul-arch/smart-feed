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
  const pakanDataFromJSON = [
    { "nama": "Dedak Padi", "jenis": "Konsentrat", "bk": 86, "pk": 14.0, "sk": 8.2, "tdn": 67.9, "ca": 1.4, "p": 1.23, "harga": 4500, "banyakStok": 150, "image": "dedak_padi.jpg" },
    { "nama": "Jagung", "jenis": "Konsentrat", "bk": 86.3, "pk": 9.4, "sk": 2.2, "tdn": 80.8, "ca": 0.1, "p": 0.3, "harga": 6000, "banyakStok": 200, "image": "jagung.jpg" },
    { "nama": "Molases", "jenis": "Konsentrat", "bk": 73, "pk": 5.5, "sk": 0.0, "tdn": 70.7, "ca": 0.9, "p": 0.07, "harga": 18000, "banyakStok": 50, "image": "molases.jpg" },
    { "nama": "Bungkil Kelapa", "jenis": "Konsentrat", "bk": 89, "pk": 21.7, "sk": 16.3, "tdn": 66.4, "ca": 0.34, "p": 0.53, "harga": 4000, "banyakStok": 120, "image": "bungkil_kelapa.jpg" },
    { "nama": "Bungkil Kedelai", "jenis": "Konsentrat", "bk": 88.7, "pk": 46.5, "sk": 6.5, "tdn": 84.5, "ca": 0.23, "p": 0.63, "harga": 9500, "banyakStok": 100, "image": "bungkil_kedelai.jpg" },
    { "nama": "Pollard", "jenis": "Konsentrat", "bk": 88, "pk": 14.5, "sk": 6.1, "tdn": 75.2, "ca": 1.18, "p": 1.11, "harga": 5500, "banyakStok": 180, "image": "pollard.jpg" },
    { "nama": "Rumput Lapang", "jenis": "Hijauan", "bk": 17.9, "pk": 12.4, "sk": 22.5, "tdn": 60.0, "ca": 0.25, "p": 0.2, "harga": 250, "banyakStok": 500, "image": "rumput_lapang.jpg" },
    { "nama": "Rumput Odot", "jenis": "Hijauan", "bk": 19.6, "pk": 9.0, "sk": 33.0, "tdn": 51.0, "ca": 0.0, "p": 0.0, "harga": 200, "banyakStok": 600, "image": "rumput_odot.jpg" },
    { "nama": "Indigofera", "jenis": "Legum", "bk": 21.3, "pk": 23.7, "sk": 15.0, "tdn": 63.0, "ca": 1.34, "p": 0.22, "harga": 200, "banyakStok": 300, "image": "indigofera.jpg" },
    { "nama": "Daun Singkong", "jenis": "Legum", "bk": 21.4, "pk": 19.2, "sk": 18.2, "tdn": 60.0, "ca": 1.34, "p": 0.22, "harga": 180, "banyakStok": 250, "image": "daun_singkong.jpg" },
    { "nama": "Jerami", "jenis": "Hijauan Kering", "bk": 85.0, "pk": 3.0, "sk": 33.0, "tdn": 43.0, "ca": 0.36, "p": 0.29, "harga": 150, "banyakStok": 400, "image": "jerami.jpg" },
    { "nama": "Silase Rumput Gajah", "jenis": "Silase", "bk": 22.0, "pk": 8.9, "sk": 28.0, "tdn": 62.3, "ca": 0.18, "p": 0.13, "harga": 1200, "banyakStok": 100, "image": "silase_rumput_gajah.jpg" }
  ];

  const createdPakan = [];
  for (const pakan of pakanDataFromJSON) {
    const newPakan = await prisma.pakan.create({
      data: {
        nama: pakan.nama,
        jenis: pakan.jenis,
        banyakStok: pakan.banyakStok !== undefined ? pakan.banyakStok : 100, // Default stok jika tidak ada
        harga: pakan.harga,
        image: pakan.image !== undefined ? pakan.image : `${pakan.nama.toLowerCase().replace(/\s+/g, '_')}.jpg`, // Default image name
        // Nutrisi
        bk: pakan.bk,
        pk: pakan.pk,
        sk: pakan.sk,
        tdn: pakan.tdn,
        ca: pakan.ca,
        p: pakan.p,
      },
    });
    createdPakan.push(newPakan);
    console.log(`Created pakan with id: ${newPakan.id} - ${newPakan.nama}`);
  }

  const pakanRumputSegar = createdPakan.find(p => p.nama === "Rumput Lapang") || createdPakan[0]; // Ganti dengan nama yang sesuai atau fallback
  const pakanKonsentratSuper = createdPakan.find(p => p.nama === "Dedak Padi") || createdPakan[1]; // Ganti dengan nama yang sesuai atau fallback
  const pakanJeramiKering = createdPakan.find(p => p.nama === "Jerami") || createdPakan[2]; // Ganti dengan nama yang sesuai atau fallback

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
      { sapiId: sapi01.id, hari: Hari.SENIN, pagiPakanId: pakanRumputSegar.id, pagiWaktu: "07:00", sorePakanId: pakanKonsentratSuper.id, soreWaktu: "16:00" },
      { sapiId: sapi01.id, hari: Hari.SELASA, pagiPakanId: pakanRumputSegar.id, pagiWaktu: "07:05", sorePakanId: pakanKonsentratSuper.id, soreWaktu: "16:05" },
      { sapiId: sapi01.id, hari: Hari.RABU, pagiPakanId: pakanJeramiKering.id, pagiWaktu: "07:10", sorePakanId: pakanKonsentratSuper.id, soreWaktu: "16:10" },
      // Tambahkan hari lain untuk sapi01 jika perlu
    ],
  });
  // Jadwal untuk Sapi02
  await prisma.jadwalHarian.createMany({
    data: [
      { sapiId: sapi02.id, hari: Hari.SENIN, pagiPakanId: pakanJeramiKering.id, pagiWaktu: "07:30", sorePakanId: pakanRumputSegar.id, soreWaktu: "16:30" },
      { sapiId: sapi02.id, hari: Hari.SELASA, pagiPakanId: pakanJeramiKering.id, pagiWaktu: "07:35", sorePakanId: pakanRumputSegar.id, soreWaktu: "16:35" },
      // Tambahkan hari lain untuk sapi02 jika perlu
    ],
  });
  // Jadwal untuk Sapi03
  await prisma.jadwalHarian.createMany({
    data: [
      { sapiId: sapi03.id, hari: Hari.SENIN, pagiPakanId: pakanKonsentratSuper.id, pagiWaktu: "08:00", sorePakanId: pakanRumputSegar.id, soreWaktu: "17:00" },
      { sapiId: sapi03.id, hari: Hari.SELASA, pagiPakanId: pakanKonsentratSuper.id, pagiWaktu: "08:05", sorePakanId: pakanJeramiKering.id, soreWaktu: "17:05" },
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
      { sapiId: sapi01.id, pakanDiberikanId: pakanRumputSegar.id, jumlahDiberikan: 2.5, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.PAGI, waktuPemberianActual: new Date("2025-05-19T07:05:00.000Z"), kandangId: sapi01.kandangId },
      { sapiId: sapi01.id, pakanDiberikanId: pakanKonsentratSuper.id, jumlahDiberikan: 1.0, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.SORE, waktuPemberianActual: new Date("2025-05-19T16:10:00.000Z"), kandangId: sapi01.kandangId },

      // Sapi02 (Kandang A), Kemarin (Senin) - hanya pagi
      { sapiId: sapi02.id, pakanDiberikanId: pakanJeramiKering.id, jumlahDiberikan: 3.0, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.PAGI, waktuPemberianActual: new Date("2025-05-19T07:38:00.000Z"), kandangId: sapi02.kandangId },

      // Sapi01 (Kandang A), Hari Ini (Selasa) - hanya pagi
      { sapiId: sapi01.id, pakanDiberikanId: pakanRumputSegar.id, jumlahDiberikan: 2.5, tanggalPemberian: tanggalHariIni, sesi: SesiPemberianMakan.PAGI, waktuPemberianActual: new Date("2025-05-20T07:12:00.000Z"), kandangId: sapi01.kandangId },

      // Sapi03 (Kandang B), Kemarin (Senin)
      { sapiId: sapi03.id, pakanDiberikanId: pakanKonsentratSuper.id, jumlahDiberikan: 1.2, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.PAGI, waktuPemberianActual: new Date("2025-05-19T08:05:00.000Z"), kandangId: sapi03.kandangId },
      { sapiId: sapi03.id, pakanDiberikanId: pakanRumputSegar.id, jumlahDiberikan: 2.0, tanggalPemberian: tanggalKemarin, sesi: SesiPemberianMakan.SORE, waktuPemberianActual: new Date("2025-05-19T17:10:00.000Z"), kandangId: sapi03.kandangId },
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