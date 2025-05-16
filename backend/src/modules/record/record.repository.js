const prisma = require('../../db');

class RecordRepository {
  async create(data) {
    return prisma.record.create({
      data,
      include: {
        jadwal: true,
        user: true,
        pakan: true
      }
    });
  }

  async findByJadwalDateSesi(jadwalId, date, sesi) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    return prisma.record.findFirst({
      where: {
        jadwalId: Number(jadwalId),
        sesi,
        waktu: {
          gte: startDate,
          lte: endDate
        }
      }
    });
  }

  async findAll(filters = {}) {
    const { jadwalId, sapiId, date, sesi } = filters;
    const where = {};

    if (jadwalId) where.jadwalId = Number(jadwalId);
    if (sesi) where.sesi = sesi;

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      where.waktu = {
        gte: startDate,
        lte: endDate
      };
    }

    // Untuk filter by sapiId
    if (sapiId) {
      return prisma.record.findMany({
        where: {
          ...where,
          jadwal: {
            sapiId: Number(sapiId)
          }
        },
        include: {
          jadwal: {
            include: {
              sapi: true
            }
          },
          user: true,
          pakan: true
        }
      });
    }

    return prisma.record.findMany({
      where,
      include: {
        jadwal: {
          include: {
            sapi: true
          }
        },
        user: true,
        pakan: true
      }
    });
  }
}

module.exports = new RecordRepository();