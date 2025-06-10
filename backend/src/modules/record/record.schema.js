const { z } = require("zod");
const { SesiPemberianMakan } = require("../../../generated/prisma"); // Pastikan path ini benar

const createRecordSchema = z.object({
  sapiId: z.coerce.number().int().positive({ message: "ID Sapi harus valid" }),
  pakanDiberikanId: z.coerce
    .number()
    .int()
    .positive({ message: "ID Pakan harus valid" }),
  jumlahDiberikan: z.coerce
    .number()
    .min(0.1, { message: "Jumlah pakan diberikan harus lebih dari 0" }), // Lebih spesifik untuk nilai minimum
  tanggalPemberian: z.coerce.date({ message: "Format tanggal tidak valid" }),
  sesi: z.nativeEnum(SesiPemberianMakan, { message: "Sesi tidak valid" }),
  // waktuPemberianActual akan di-default oleh Prisma atau diisi otomatis di service jika perlu logika khusus
});

const updateRecordSchema = z.object({
  sapiId: z.coerce
    .number()
    .int()
    .positive({ message: "ID Sapi harus valid" })
    .optional(),
  pakanDiberikanId: z.coerce
    .number()
    .int()
    .positive({ message: "ID Pakan harus valid" })
    .optional(),
  jumlahDiberikan: z.coerce
    .number()
    .min(0.1, { message: "Jumlah pakan diberikan harus lebih dari 0" })
    .optional(), // Izinkan nilai desimal
  tanggalPemberian: z.coerce
    .date({ message: "Format tanggal tidak valid" })
    .optional(),
  sesi: z
    .nativeEnum(SesiPemberianMakan, { message: "Sesi tidak valid" })
    .optional(),
});

const getRecordsSchema = z.object({
  date: z.string().optional(), // YYYY-MM-DD
  kandangId: z.string().optional(),
  sapiId: z.string().optional(),
  sesi: z.nativeEnum(SesiPemberianMakan).optional(),
});

module.exports = { createRecordSchema, updateRecordSchema, getRecordsSchema };
