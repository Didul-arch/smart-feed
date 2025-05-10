const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  // Hapus semua data (urutan: anak ke induk)
  await prisma.jadwalMakan.deleteMany();
  await prisma.sapi.deleteMany();
  await prisma.pakan.deleteMany();
  await prisma.kandang.deleteMany();
  await prisma.user.deleteMany();

  // Reset auto increment (PostgreSQL)
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "User_id_seq" RESTART WITH 1');
  await prisma.$executeRawUnsafe(
    'ALTER SEQUENCE "Kandang_id_seq" RESTART WITH 1'
  );
  await prisma.$executeRawUnsafe('ALTER SEQUENCE "Sapi_id_seq" RESTART WITH 1');
  await prisma.$executeRawUnsafe(
    'ALTER SEQUENCE "Pakan_id_seq" RESTART WITH 1'
  );
  await prisma.$executeRawUnsafe(
    'ALTER SEQUENCE "JadwalMakan_id_seq" RESTART WITH 1'
  );

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
      jenis: "Rumput Gajah",
      banyakStok: 100,
      harga: 5000,
      image: "pakan1.jpg",
    },
  });
  const pakan2 = await prisma.pakan.create({
    data: {
      jenis: "Jerami",
      banyakStok: 50,
      harga: 3000,
      image: "pakan2.jpg",
    },
  });
  const pakan3 = await prisma.pakan.create({
    data: {
      jenis: "Konsentrat",
      banyakStok: 30,
      harga: 8000,
      image: "pakan3.jpg",
    },
  });

  // Jadwal makan dummy
  await prisma.jadwalMakan.createMany({
    data: [
      {
        tanggal: new Date(),
        waktu: "07:00",
        sapiId: sapi1.id,
        pakanId: pakan1.id,
        userId: user1.id,
      },
      {
        tanggal: new Date(),
        waktu: "12:00",
        sapiId: sapi2.id,
        pakanId: pakan2.id,
        userId: user1.id,
      },
      {
        tanggal: new Date(),
        waktu: "17:00",
        sapiId: sapi3.id,
        pakanId: pakan1.id,
        userId: user2.id,
      },
      {
        tanggal: new Date(),
        waktu: "07:00",
        sapiId: sapi4.id,
        pakanId: pakan3.id,
        userId: user2.id,
      },
    ],
  });
}

main()
  .then(() => {
    console.log(
      "Database direset, auto increment direset, dummy data banyak masuk!"
    );
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
