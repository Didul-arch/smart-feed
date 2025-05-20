const { PrismaClient } = require("../generated/prisma"); 
const prisma = new PrismaClient();

async function main() {
  await prisma.recordPemberianMakan.deleteMany();
  await prisma.jadwalHarian.deleteMany();
  await prisma.sapi.deleteMany();
  await prisma.pakan.deleteMany();
  await prisma.kandang.deleteMany();
  await prisma.user.deleteMany();
  console.log("Old data deleted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });