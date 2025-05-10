const prisma = require("../../db/");

class JadwalRepository {
  async findAllSapi(kandangId) {
    return prisma.sapi.findMany({
      where: kandangId ? { kandangId } : {},
      include: { kandang: true },
    });
  }

  async findSapiById(sapiId) {
    return prisma.sapi.findUnique({
      where: { id: sapiId },
      include: { kandang: true },
    });
  }

  async getJadwalMakan(sapiId, start, end, waktu) {
    return prisma.jadwalMakan.findFirst({
      where: {
        sapiId,
        tanggal: { gte: start, lte: end },
        waktu,
      },
      include: {
        user: true,
        pakan: true,
      },
    });
  }
}

module.exports = new JadwalRepository();