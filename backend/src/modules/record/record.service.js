const recordRepository = require("./record.repository");
const sapiRepository = require("../sapi/sapi.repository");
const AppError = require("../../core/helper/appError");
const prisma = require("../../db");

class RecordService {
  async createRecord(data) {
    const { sapiId, pakanDiberikanId, jumlahDiberikan, tanggalPemberian, sesi } = data;

    const sapi = await sapiRepository.findById(sapiId);
    if (!sapi) {
      throw new AppError("Sapi tidak ditemukan", 404);
    }

    // Gunakan transaksi untuk memastikan konsistensi data
    return prisma.$transaction(async (tx) => {
      const pakan = await tx.pakan.findUnique({
        where: { id: pakanDiberikanId },
      });

      if (!pakan) {
        throw new AppError("Pakan tidak ditemukan", 404);
      }

      if (pakan.banyakStok < jumlahDiberikan) {
        throw new AppError(`Stok pakan "${pakan.nama}" tidak mencukupi. Tersisa: ${pakan.banyakStok}`, 400);
      }

      // Kurangi stok pakan
      await tx.pakan.update({
        where: { id: pakanDiberikanId },
        data: {
          banyakStok: {
            decrement: jumlahDiberikan,
          },
        },
      });

      // Buat record pemberian makan
      const recordData = {
        sapiId,
        kandangId: sapi.kandangId, // Ambil kandangId dari sapi
        pakanDiberikanId,
        jumlahDiberikan, // Simpan jumlah yang diberikan
        tanggalPemberian,
        sesi,
        // waktuPemberianActual akan default dari Prisma
      };
      const newRecord = await tx.recordPemberianMakan.create({ // Gunakan tx
        data: recordData,
      });
      return newRecord;
    });
  }

  async getAllRecords(filters) {
    return recordRepository.findByFilters(filters);
  }

  async getRecordById(id) {
    const record = await recordRepository.findById(id);
    if (!record) {
      throw new AppError("Record tidak ditemukan", 404);
    }
    return record;
  }
}

module.exports = new RecordService();