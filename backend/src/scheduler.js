const cron = require('node-cron');
const prisma = require('./db');

// Format waktu cron: * * * * * (menit, jam, hari, bulan, hari_minggu)

// Cek setiap 30 menit untuk jadwal makan yg belum dilaksanakan
const checkFeedingSchedule = async () => {
  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const today = days[now.getDay()];
  const jam = now.getHours();
  const menit = now.getMinutes();
  
  console.log(`[${now.toLocaleTimeString()}] Checking feeding schedules...`);
  
  // Ambil semua jadwal untuk hari ini
  const jadwals = await prisma.jadwalMakan.findMany({
    where: { hari: today },
    include: {
      sapi: true,
      records: {
        where: {
          waktu: {
            gte: new Date(now.setHours(0, 0, 0, 0)),
            lt: new Date(now.setHours(23, 59, 59, 999))
          }
        }
      }
    }
  });
  
  for (const jadwal of jadwals) {
    // Cek jadwal pagi (misal, 1 jam sebelum & sesudah jadwal)
    const [pagiJam, pagiMenit] = jadwal.pagiJam.split(':').map(Number);
    // Pagi: Jika sudah waktunya tapi belum ada record
    if (jam >= pagiJam - 1 && jam <= pagiJam + 1 && 
        !jadwal.records.some(r => r.sesi === 'pagi')) {
      console.log(`⚠️ Reminder: Sapi ${jadwal.sapi.jenis} (ID: ${jadwal.sapi.id}) belum diberi makan PAGI!`);
      // TODO: Send notification via websocket, email, or push notification
    }
    
    // Cek jadwal sore
    const [soreJam, soreMenit] = jadwal.soreJam.split(':').map(Number);
    // Sore: Jika sudah waktunya tapi belum ada record
    if (jam >= soreJam - 1 && jam <= soreJam + 1 && 
        !jadwal.records.some(r => r.sesi === 'sore')) {
      console.log(`⚠️ Reminder: Sapi ${jadwal.sapi.jenis} (ID: ${jadwal.sapi.id}) belum diberi makan SORE!`);
      // TODO: Send notification via websocket, email, or push notification
    }
  }
};

// Jalankan cek setiap 30 menit
cron.schedule('*/30 * * * *', checkFeedingSchedule);

// Generate report harian (jam 11 malam)
cron.schedule('0 23 * * *', async () => {
  console.log('Generating daily report...');
  // TODO: Generate report logic
});

module.exports = {
  startScheduler: () => {
    console.log('Scheduler started!');
    // Run immediately on start
    checkFeedingSchedule();
  }
};