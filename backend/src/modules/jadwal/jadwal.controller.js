const jadwalService = require('./jadwal.service');
const { createJadwalHarianSchema, updateJadwalHarianSapiSchema } = require('./jadwal.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/appError');
const { Hari } = require('../../../generated/prisma'); // Pastikan path benar

class JadwalController {
  // Membuat atau mengupdate jadwal harian untuk satu sapi
  setJadwal = catchAsync(async (req, res) => {
    const parse = createJadwalHarianSchema.safeParse(req.body);
    if (!parse.success) {
      // Mengambil pesan error pertama dari Zod
      const errorMessage = parse.error.errors[0]?.message || "Input tidak valid";
      throw new AppError(errorMessage, 400);
    }

    const jadwal = await jadwalService.setJadwalHarian(parse.data);
    res.status(201).json({ message: "Jadwal berhasil diatur/diupdate", data: jadwal });
  });

  // Mendapatkan semua jadwal mingguan untuk satu sapi
  getJadwalSapi = catchAsync(async (req, res) => {
    const { sapiId } = req.params;
    if (isNaN(parseInt(sapiId))) throw new AppError("sapiId harus berupa angka", 400);

    const jadwal = await jadwalService.getJadwalMingguanBySapi(parseInt(sapiId));
    res.json({ message: "Jadwal mingguan sapi berhasil diambil", data: jadwal });
  });

  // Menampilkan status makan sapi di kandang pada tanggal tertentu
  getJadwalDisplay = catchAsync(async (req, res) => {
    const { kandangId } = req.params;
    const { date } = req.query; // Format YYYY-MM-DD

    if (isNaN(parseInt(kandangId))) throw new AppError("kandangId harus berupa angka", 400);
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new AppError("Parameter 'date' dengan format YYYY-MM-DD diperlukan", 400);
    }

    const displayData = await jadwalService.getJadwalDisplayForKandang(parseInt(kandangId), date);
    res.json({ message: "Data display jadwal kandang berhasil diambil", data: displayData });
  });

  // Mengupdate detail jadwal satu hari untuk sapi tertentu
  updateJadwalSapiHari = catchAsync(async (req, res) => {
    const { sapiId, hari } = req.params; // hari adalah string nama Enum, misal "SENIN"

    if (isNaN(parseInt(sapiId))) throw new AppError("sapiId harus berupa angka", 400);
    if (!Hari[hari.toUpperCase()]) throw new AppError("Parameter 'hari' tidak valid", 400);

    const parse = updateJadwalHarianSapiSchema.safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.errors[0]?.message || "Input tidak valid";
      throw new AppError(errorMessage, 400);
    }
    if (Object.keys(parse.data).length === 0) {
      throw new AppError("Tidak ada data untuk diupdate", 400);
    }

    const jadwal = await jadwalService.updateJadwalHarianSapi(parseInt(sapiId), Hari[hari.toUpperCase()], parse.data);
    res.json({ message: `Jadwal sapi ID ${sapiId} untuk hari ${hari} berhasil diupdate`, data: jadwal });
  });

  // Menghapus jadwal satu hari untuk sapi tertentu
  deleteJadwalSapiHari = catchAsync(async (req, res) => {
    const { sapiId, hari } = req.params;

    if (isNaN(parseInt(sapiId))) throw new AppError("sapiId harus berupa angka", 400);
    if (!Hari[hari.toUpperCase()]) throw new AppError("Parameter 'hari' tidak valid", 400);

    await jadwalService.deleteJadwalHarianSapi(parseInt(sapiId), Hari[hari.toUpperCase()]);
    res.status(200).json({ message: `Jadwal sapi ID ${sapiId} untuk hari ${hari} berhasil dihapus` });
  });
}
module.exports = new JadwalController();