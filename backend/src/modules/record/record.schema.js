const { z } = require("zod");
const { SesiPemberianMakan } = require("../../../generated/prisma"); // Pastikan path ini benar

const createRecordSchema = z.object({
  sapiId: z.coerce.number().int().positive({ message: "ID Sapi harus valid" }),
  pakanDiberikanId: z.coerce.number().int().positive({ message: "ID Pakan harus valid" }),
  jumlahDiberikan: z.coerce.number().positive({ message: "Jumlah pakan diberikan harus lebih dari 0" }), // TAMBAHKAN INI
  tanggalPemberian: z.coerce.date({ message: "Format tanggal tidak valid" }),
  sesi: z.nativeEnum(SesiPemberianMakan, { message: "Sesi tidak valid" }),
  // waktuPemberianActual akan di-default oleh Prisma atau diisi otomatis di service jika perlu logika khusus
});

const getRecordsSchema = z.object({
  date: z.string().optional(), // YYYY-MM-DD
  kandangId: z.string().optional(),
  sapiId: z.string().optional(),
  sesi: z.nativeEnum(SesiPemberianMakan).optional(),
});


module.exports = { createRecordSchema, getRecordsSchema };