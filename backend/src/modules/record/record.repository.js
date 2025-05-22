const prisma = require('../../db'); // Pastikan path ke instance Prisma Client benar

class RecordRepository {
  async create(data) {
    return prisma.recordPemberianMakan.create({
      data,
      include: { pakanDiberikan: true, sapi: { select: { id: true, jenis: true } } },
    });
  }

  async findBySapiDateSesi(sapiId, date, sesi) {
    // 'date' harus objek Date yang dinormalisasi ke awal hari (UTC direkomendasikan)
    const startDate = new Date(date); // Asumsi date sudah UTC 00:00:00
    const endDate = new Date(startDate);
    endDate.setUTCDate(startDate.getUTCDate() + 1); // Awal hari berikutnya UTC

    return prisma.recordPemberianMakan.findFirst({
      where: {
        sapiId,
        tanggalPemberian: {
          gte: startDate,
          lt: endDate, // Menggunakan lt untuk mencakup hingga akhir hari startDate
        },
        sesi,
      },
      include: { pakanDiberikan: true },
    });
  }

  async findByFilters({ kandangId, dateString, sesi, sapiId }) {
    const whereClause = {};
    if (kandangId) whereClause.kandangId = kandangId;
    if (sesi) whereClause.sesi = sesi;
    if (sapiId) whereClause.sapiId = sapiId;

    if (dateString) {
      const targetDate = new Date(dateString);
      const startDate = new Date(Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate()));
      const endDate = new Date(startDate);
      endDate.setUTCDate(startDate.getUTCDate() + 1);

      whereClause.tanggalPemberian = {
        gte: startDate,
        lt: endDate,
      };
    }

    return prisma.recordPemberianMakan.findMany({
      where: whereClause,
      include: {
        sapi: { select: { id: true, jenis: true /*, nama: true */ } },
        pakanDiberikan: { select: { id: true, nama: true } },
      },
      orderBy: { waktuPemberianActual: 'desc' },
    });
  }
}
module.exports = new RecordRepository();