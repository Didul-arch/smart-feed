const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  // hapus semua data (cascading, dari anak ke induk)
  await prisma.jadwalMakan.deleteMany();
  await prisma.sapi.deleteMany();
  await prisma.pakan.deleteMany();
  await prisma.kandang.deleteMany();
  await prisma.user.deleteMany();

  // user dummy
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await prisma.user.create({
    data: {
      email: "user@mail.com",
      password: passwordHash,
      nama: "Peternak Satu",
    },
  });

  // Buat kandang dummy
  const kandang = await prisma.kandang.create({
    data: {
      nama: "Kandang A",
      lokasi: "Blok Timur",
      kapasitas: 10,
    },
  });

  // Buat sapi dummy
  const sapi = await prisma.sapi.create({
    data: {
      jenis: "Sapi Bali",
      bobot: 350,
      image: "sapi1.jpg",
      kandangId: kandang.id,
      tanggalLahir: new Date("2022-01-01"),
    },
  });

  // Buat pakan dummy
  const pakan = await prisma.pakan.create({
    data: {
      jenis: "Rumput Gajah",
      banyakStok: 100,
      harga: 5000,
      image: "pakan1.jpg",
    },
  });

  // Buat jadwal makan dummy
  await prisma.jadwalMakan.create({
    data: {
      tanggal: new Date(),
      sapiId: sapi.id,
      pakanId: pakan.id,
      userId: user.id,
    },
  });
}

main()
    .then(() => {
        console.log('Database direset, dummy data dah masuk!');
        process.exit(0);
    })
    .catch((e) =>{
        console.error(e);
        process.exit(1);
    })