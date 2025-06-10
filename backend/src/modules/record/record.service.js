const recordRepository = require("./record.repository");
const sapiRepository = require("../sapi/sapi.repository");
const AppError = require("../../core/helper/appError");
const prisma = require("../../db");

class RecordService {
  async createRecord(data) {
    const {
      sapiId,
      pakanDiberikanId,
      jumlahDiberikan,
      tanggalPemberian,
      sesi,
    } = data;

    const sapi = await sapiRepository.findById(sapiId);
    if (!sapi) {
      throw new AppError("Sapi tidak ditemukan", 404);
    }

    return prisma.$transaction(async (tx) => {
      const pakan = await tx.pakan.findUnique({
        where: { id: pakanDiberikanId },
      });

      if (!pakan) {
        throw new AppError("Pakan tidak ditemukan", 404);
      }

      if (pakan.banyakStok < jumlahDiberikan) {
        throw new AppError(
          `Stok pakan "${pakan.nama}" tidak mencukupi. Tersisa: ${pakan.banyakStok}`,
          400
        );
      }

      await tx.pakan.update({
        where: { id: pakanDiberikanId },
        data: {
          banyakStok: {
            decrement: jumlahDiberikan,
          },
        },
      });

      const recordData = {
        sapiId,
        kandangId: sapi.kandangId,
        pakanDiberikanId,
        jumlahDiberikan,
        tanggalPemberian,
        sesi,
        // waktuPemberianActual akan default dari Prisma
      };
      const newRecord = await tx.recordPemberianMakan.create({
        // Gunakan tx
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

  async updateRecord(id, data) {
    const existingRecord = await recordRepository.findById(id);
    if (!existingRecord) {
      return null;
    }

    const {
      sapiId,
      pakanDiberikanId,
      jumlahDiberikan,
      tanggalPemberian,
      sesi,
    } = data;

    return prisma.$transaction(async (tx) => {
      // If pakan is being changed, restore old stock and check new stock
      if (
        pakanDiberikanId !== existingRecord.pakanDiberikanId ||
        jumlahDiberikan !== existingRecord.jumlahDiberikan
      ) {
        // Restore old pakan stock
        await tx.pakan.update({
          where: { id: existingRecord.pakanDiberikanId },
          data: {
            banyakStok: {
              increment: existingRecord.jumlahDiberikan,
            },
          },
        });

        // Check new pakan stock
        const newPakan = await tx.pakan.findUnique({
          where: { id: pakanDiberikanId },
        });

        if (!newPakan) {
          throw new AppError("Pakan tidak ditemukan", 404);
        }

        if (newPakan.banyakStok < jumlahDiberikan) {
          throw new AppError(
            `Stok pakan "${newPakan.nama}" tidak mencukupi. Tersisa: ${newPakan.banyakStok}`,
            400
          );
        }

        // Decrease new pakan stock
        await tx.pakan.update({
          where: { id: pakanDiberikanId },
          data: {
            banyakStok: {
              decrement: jumlahDiberikan,
            },
          },
        });
      }

      // Update the record
      return await tx.recordPemberianMakan.update({
        where: { id: parseInt(id) },
        data: {
          sapiId,
          pakanDiberikanId,
          jumlahDiberikan,
          tanggalPemberian,
          sesi,
        },
      });
    });
  }

  async deleteRecord(id) {
    const existingRecord = await recordRepository.findById(id);
    if (!existingRecord) {
      return null;
    }

    return prisma.$transaction(async (tx) => {
      // Restore pakan stock
      await tx.pakan.update({
        where: { id: existingRecord.pakanDiberikanId },
        data: {
          banyakStok: {
            increment: existingRecord.jumlahDiberikan,
          },
        },
      });

      // Delete the record
      return await tx.recordPemberianMakan.delete({
        where: { id: parseInt(id) },
      });
    });
  }
}

module.exports = new RecordService();
