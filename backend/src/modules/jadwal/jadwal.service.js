const jadwalRepository = require('./jadwal.repository');
const recordRepository = require('../record/record.repository');
const prisma = require('../../db'); // Pastikan path ke instance Prisma Client benar
const AppError = require('../../core/helper/appError');
const { Hari } = require('../../../generated/prisma'); // Pastikan path ke client Prisma benar

// Helper untuk mendapatkan enum Hari dari string tanggal (YYYY-MM-DD)
function getHariEnumFromDateString(dateString) {
  const date = new Date(dateString);
  const dayIndex = date.getUTCDay(); // 0 (Minggu) - 6 (Sabtu) UTC
  const daysMap = [Hari.MINGGU, Hari.SENIN, Hari.SELASA, Hari.RABU, Hari.KAMIS, Hari.JUMAT, Hari.SABTU];
  return daysMap[dayIndex];
}

class JadwalService {
  async setJadwalHarian(data) {
    // data harus mengandung sapiId, hari, dan detail jadwal
    const sapi = await prisma.sapi.findUnique({ where: { id: data.sapiId } });
    if (!sapi) throw new AppError("Sapi tidak ditemukan", 404);

    if (data.pagiPakanId) {
      const pakan = await prisma.pakan.findUnique({ where: { id: data.pagiPakanId } });
      if (!pakan) throw new AppError(`Pakan pagi dengan ID ${data.pagiPakanId} tidak ditemukan`, 404);
    }
    if (data.sorePakanId) {
      const pakan = await prisma.pakan.findUnique({ where: { id: data.sorePakanId } });
      if (!pakan) throw new AppError(`Pakan sore dengan ID ${data.sorePakanId} tidak ditemukan`, 404);
    }

    return jadwalRepository.createOrUpdate(data);
  }

  async getJadwalMingguanBySapi(sapiId) {
    const sapi = await prisma.sapi.findUnique({ where: { id: sapiId } });
    if (!sapi) throw new AppError("Sapi tidak ditemukan", 404);
    return jadwalRepository.findBySapiId(sapiId);
  }

  async getJadwalDisplayForKandang(kandangId, dateString) {
    const targetDate = new Date(dateString); 
    const targetDateUTCStart = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));

    const hariEnum = getHariEnumFromDateString(dateString);
    if (!hariEnum) throw new AppError("Format tanggal tidak valid atau tanggal tidak bisa diproses", 400);

    const kandang = await prisma.kandang.findUnique({
      where: { id: kandangId },
      include: { sapi: { select: { id: true, jenis: true } } },
    });
    if (!kandang) throw new AppError("Kandang tidak ditemukan", 404);

    let totalDiberiMakanPagi = 0;
    let totalDiberiMakanSore = 0;
    const sapiListWithDetails = [];

    for (const sapi of kandang.sapi) {
      const jadwalSapiUntukHariIni = await jadwalRepository.findBySapiIdAndHari(sapi.id, hariEnum);
      const recordPagi = await recordRepository.findBySapiDateSesi(sapi.id, targetDateUTCStart, 'PAGI');
      const recordSore = await recordRepository.findBySapiDateSesi(sapi.id, targetDateUTCStart, 'SORE');

      if (recordPagi) totalDiberiMakanPagi++;
      if (recordSore) totalDiberiMakanSore++;

      sapiListWithDetails.push({
        id: sapi.id,
        jenis: sapi.jenis,
        statusPagi: recordPagi ? 'Sudah Makan' : 'Belum Makan',
        pakanPagiDiberikan: recordPagi ? recordPagi.pakanDiberikan.nama : null,
        statusSore: recordSore ? 'Sudah Makan' : 'Belum Makan',
        pakanSoreDiberikan: recordSore ? recordSore.pakanDiberikan.nama : null,
        jadwalDefaultUntukHariIni: jadwalSapiUntukHariIni ? {
          pagiPakanDefault: jadwalSapiUntukHariIni.pagiPakan?.nama,
          pagiWaktuDefault: jadwalSapiUntukHariIni.pagiWaktu,
          sorePakanDefault: jadwalSapiUntukHariIni.sorePakan?.nama,
          soreWaktuDefault: jadwalSapiUntukHariIni.soreWaktu,
        } : null, // Jika sapi tidak punya jadwal spesifik untuk hari itu
      });
    }

    return {
      kandang: { id: kandang.id, nama: kandang.nama, lokasi: kandang.lokasi },
      tanggal: dateString,
      hari: hariEnum,
      totalSapiDiKandang: kandang.sapi.length,
      totalDiberiMakanPagi: totalDiberiMakanPagi, 
      totalDiberiMakanSore: totalDiberiMakanSore, 
      sapiList: sapiListWithDetails,
    };
  }

  async updateJadwalHarianSapi(sapiId, hari, updateData) {
    const sapi = await prisma.sapi.findUnique({ where: { id: sapiId } });
    if (!sapi) throw new AppError("Sapi tidak ditemukan", 404);

    const existingJadwal = await jadwalRepository.findBySapiIdAndHari(sapiId, hari);
    if (!existingJadwal) throw new AppError(`Jadwal untuk sapi ID ${sapiId} pada hari ${hari} tidak ditemukan. Gunakan POST untuk membuat.`, 404);

    if (updateData.pagiPakanId) {
      const pakan = await prisma.pakan.findUnique({ where: { id: updateData.pagiPakanId } });
      if (!pakan) throw new AppError(`Pakan pagi dengan ID ${updateData.pagiPakanId} tidak ditemukan`, 404);
    }
    if (updateData.sorePakanId) {
      const pakan = await prisma.pakan.findUnique({ where: { id: updateData.sorePakanId } });
      if (!pakan) throw new AppError(`Pakan sore dengan ID ${updateData.sorePakanId} tidak ditemukan`, 404);
    }

    // Gabungkan sapiId dan hari dengan data update untuk upsert
    const dataToUpdate = { sapiId, hari, ...updateData };
    return jadwalRepository.createOrUpdate(dataToUpdate); // createOrUpdate akan menangani update jika ada
  }

  async deleteJadwalHarianSapi(sapiId, hari) {
    const sapi = await prisma.sapi.findUnique({ where: { id: sapiId } });
    if (!sapi) throw new AppError("Sapi tidak ditemukan", 404);

    const existingJadwal = await jadwalRepository.findBySapiIdAndHari(sapiId, hari);
    if (!existingJadwal) throw new AppError(`Jadwal untuk sapi ID ${sapiId} pada hari ${hari} tidak ditemukan.`, 404);

    return jadwalRepository.deleteBySapiIdAndHari(sapiId, hari);
  }
}
module.exports = new JadwalService();