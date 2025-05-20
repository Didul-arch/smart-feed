const recordRepository = require('./record.repository');
const prisma = require('../../db');
const AppError = require('../../core/helper/appError');

class RecordService {
  async createRecord(data) {
    const { sapiId, tanggalPemberian, sesi } = data;

    const sapi = await prisma.sapi.findUnique({ where: { id: sapiId } });
    if (!sapi) throw new AppError("Sapi tidak ditemukan", 404);

    const targetDate = new Date(tanggalPemberian);
    targetDate.setUTCHours(0, 0, 0, 0); // Normalisasi ke awal hari UTC

    const existingRecord = await recordRepository.findBySapiDateSesi(sapiId, targetDate, sesi);
    if (existingRecord) {
      throw new AppError(`Sapi ini sudah diberi makan pada ${sesi} tanggal ${tanggalPemberian}`, 409);
    }
    
    const recordData = {
      ...data,
      tanggalPemberian: targetDate, // Gunakan tanggal yang sudah dinormalisasi
      kandangId: sapi.kandangId, // Ambil kandangId dari sapi
      waktuPemberianActual: new Date(), // Waktu server saat ini
    };
    return recordRepository.create(recordData);
  }

  async getRecords(filters) {
    // filters: { kandangId?: number, dateString?: string (YYYY-MM-DD), sesi?: SesiPemberianMakan }
    return recordRepository.findByFilters(filters);
  }
}
module.exports = new RecordService();