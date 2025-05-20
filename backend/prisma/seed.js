const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  // Hapus semua data
  await prisma.record.deleteMany();
  await prisma.jadwalMakan.deleteMany();
  await prisma.sapi.deleteMany();
  await prisma.pakan.deleteMany();
  await prisma.kandang.deleteMany();
  await prisma.user.deleteMany();

  // Reset auto increment (PostgreSQL)
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "User_id_seq" RESTART WITH 1');
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "Kandang_id_seq" RESTART WITH 1');
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "Sapi_id_seq" RESTART WITH 1');
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "Pakan_id_seq" RESTART WITH 1');
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "JadwalMakan_id_seq" RESTART WITH 1');
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "Record_id_seq" RESTART WITH 1');

  // User dummy
  const passwordHash = await bcrypt.hash("password123", 10);
  const user1 = await prisma.user.create({
    data: {
      email: "user@mail.com",
      password: passwordHash,
      nama: "Peternak Satu",
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: "peternak2@mail.com",
      password: passwordHash,
      nama: "Peternak Dua",
    },
  });

  // Kandang dummy
  const kandangA = await prisma.kandang.create({
    data: {
      nama: "Kandang A",
      lokasi: "Blok Timur",
      kapasitas: 10,
    },
  });
  const kandangB = await prisma.kandang.create({
    data: {
      nama: "Kandang B",
      lokasi: "Blok Barat",
      kapasitas: 8,
    },
  });

  // Sapi dummy
  const sapi1 = await prisma.sapi.create({
    data: {
      jenis: "Sapi Bali",
      bobot: 350,
      image: "sapi1.jpg",
      kandangId: kandangA.id,
      tanggalLahir: new Date("2022-01-01"),
    },
  });
  const sapi2 = await prisma.sapi.create({
    data: {
      jenis: "Sapi Limousin",
      bobot: 420,
      image: "sapi2.jpg",
      kandangId: kandangA.id,
      tanggalLahir: new Date("2021-06-15"),
    },
  });
  const sapi3 = await prisma.sapi.create({
    data: {
      jenis: "Sapi Madura",
      bobot: 300,
      image: "sapi3.jpg",
      kandangId: kandangB.id,
      tanggalLahir: new Date("2023-03-10"),
    },
  });
  const sapi4 = await prisma.sapi.create({
    data: {
      jenis: "Sapi Ongole",
      bobot: 390,
      image: "sapi4.jpg",
      kandangId: kandangB.id,
      tanggalLahir: new Date("2022-08-20"),
    },
  });

  // Pakan dummy
  const pakan1 = await prisma.pakan.create({
    data: {
      nama: "Rumput Gajah",
      jenis: "Hijauan",
      banyakStok: 100,
      harga: 5000,
      image: "pakan1.jpg",
    },
  });
  const pakan2 = await prisma.pakan.create({
    data: {
      nama: "Jerami",
      jenis: "Hijauan",
      banyakStok: 50,
      harga: 3000,
      image: "pakan2.jpg",
    },
  });
  const pakan3 = await prisma.pakan.create({
    data: {
      nama: "Konsentrat",
      jenis: "Konsentrat",
      banyakStok: 30,
      harga: 8000,
      image: "pakan3.jpg",
    },
  });

  // Jadwal makan untuk semua hari (Senin–Minggu), 1 sapi 1 hari
  const jadwalSenin = await prisma.jadwalMakan.create({
    data: {
      hari: "Senin",
      sapiId: sapi1.id,
      pagiJam: "07:00",
      soreJam: "16:00",
      pagiPakanId: pakan1.id,
      sorePakanId: pakan2.id,
    },
  });
  const jadwalSelasa = await prisma.jadwalMakan.create({
    data: {
      hari: "Selasa",
      sapiId: sapi2.id,
      pagiJam: "07:30",
      soreJam: "16:30",
      pagiPakanId: pakan2.id,
      sorePakanId: pakan3.id,
    },
  });
  const jadwalRabu = await prisma.jadwalMakan.create({
    data: {
      hari: "Rabu",
      sapiId: sapi3.id,
      pagiJam: "08:00",
      soreJam: "17:00",
      pagiPakanId: pakan3.id,
      sorePakanId: pakan1.id,
    },
  });
  const jadwalKamis = await prisma.jadwalMakan.create({
    data: {
      hari: "Kamis",
      sapiId: sapi4.id,
      pagiJam: "06:45",
      soreJam: "15:45",
      pagiPakanId: pakan1.id,
      sorePakanId: pakan2.id,
    },
  });
  const jadwalJumat = await prisma.jadwalMakan.create({
    data: {
      hari: "Jumat",
      sapiId: sapi1.id,
      pagiJam: "07:15",
      soreJam: "16:15",
      pagiPakanId: pakan2.id,
      sorePakanId: pakan3.id,
    },
  });
  const jadwalSabtu = await prisma.jadwalMakan.create({
    data: {
      hari: "Sabtu",
      sapiId: sapi2.id,
      pagiJam: "07:45",
      soreJam: "16:45",
      pagiPakanId: pakan3.id,
      sorePakanId: pakan1.id,
    },
  });
  const jadwalMinggu = await prisma.jadwalMakan.create({
    data: {
      hari: "Minggu",
      sapiId: sapi3.id,
      pagiJam: "08:15",
      soreJam: "17:15",
      pagiPakanId: pakan1.id,
      sorePakanId: pakan2.id,
    },
  });

  // Record dummy: hanya untuk Senin dan Selasa, hari lain kosong
  await prisma.record.createMany({
    data: [
      // Senin (2024-06-10)
      {
        jadwalId: jadwalSenin.id,
        userId: user1.id,
        waktu: new Date("2024-06-10T07:05:00"),
        pakanId: pakan1.id,
      },
      {
        jadwalId: jadwalSenin.id,
        userId: user2.id,
        waktu: new Date("2024-06-10T16:10:00"),
        pakanId: pakan2.id,
      },
      // Selasa (2024-06-11)
      {
        jadwalId: jadwalSelasa.id,
        userId: user1.id,
        waktu: new Date("2024-06-11T07:35:00"),
        pakanId: pakan2.id,
      },
      {
        jadwalId: jadwalSelasa.id,
        userId: user2.id,
        waktu: new Date("2024-06-11T16:40:00"),
        pakanId: pakan3.id,
      },
    ],
  });

  console.log("Database direset, auto increment direset, dummy data masuk!");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });