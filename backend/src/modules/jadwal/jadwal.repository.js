const prisma = require('../../db'); // Pastikan path ke instance Prisma Client benar

class JadwalRepository {
  async createOrUpdate(data) {
    // data harus mengandung sapiId dan hari
    return prisma.jadwalHarian.upsert({
      where: { sapiId_hari: { sapiId: data.sapiId, hari: data.hari } },
      update: {
        pagiPakanId: data.pagiPakanId,
        pagiWaktu: data.pagiWaktu,
        sorePakanId: data.sorePakanId,
        soreWaktu: data.soreWaktu,
      },
      create: data,
      include: { pagiPakan: true, sorePakan: true, sapi: true },
    });
  }

  async findBySapiId(sapiId) {
    return prisma.jadwalHarian.findMany({
      where: { sapiId },
      include: { pagiPakan: true, sorePakan: true },
      orderBy: {
        // Untuk urutan hari yang benar (Senin, Selasa, ...),
        // Anda mungkin perlu menambahkan field 'urutanHari' (1-7) di model JadwalHarian
        // atau melakukan sorting di sisi aplikasi setelah data diambil.
        // Saat ini, akan diurutkan berdasarkan nama Enum Hari secara alfabetis.
        hari: 'asc',
      },
    });
  }

  async findBySapiIdAndHari(sapiId, hari) {
    return prisma.jadwalHarian.findUnique({
      where: { sapiId_hari: { sapiId, hari } },
      include: { pagiPakan: true, sorePakan: true },
    });
  }

  // Metode ini tidak lagi relevan karena jadwal sekarang per sapi,
  // tapi kita butuh cara untuk mendapatkan semua jadwal sapi dalam satu kandang pada hari tertentu
  // untuk fungsi getJadwalDisplayForKandang.
  // Ini bisa dilakukan dengan query yang lebih kompleks di service atau
  // dengan mengambil semua sapi di kandang lalu query jadwal masing-masing.
  // Untuk efisiensi, kita bisa query JadwalHarian yang sapinya ada di kandangId tertentu.
  async findAllJadwalInKandangForHari(kandangId, hari) {
    return prisma.jadwalHarian.findMany({
      where: {
        sapi: {
          kandangId: kandangId,
        },
        hari: hari,
      },
      include: {
        pagiPakan: true,
        sorePakan: true,
        sapi: { select: { id: true, jenis: true } }, // Hanya info sapi yang relevan
      },
    });
  }

  async deleteBySapiIdAndHari(sapiId, hari) {
    return prisma.jadwalHarian.delete({
      where: { sapiId_hari: { sapiId, hari } },
    });
  }
}
module.exports = new JadwalRepository();