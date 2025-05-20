const { z } = require('zod');
const { Hari } = require('../../../generated/prisma'); // Pastikan path ke client Prisma benar

const baseJadwalHarianSchema = z.object({
  pagiPakanId: z.number().int().positive().optional().nullable(),
  pagiWaktu: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format waktu pagi tidak valid (HH:MM)").optional().nullable(),
  sorePakanId: z.number().int().positive().optional().nullable(),
  soreWaktu: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format waktu sore tidak valid (HH:MM)").optional().nullable(),
});

const createJadwalHarianSchema = baseJadwalHarianSchema.extend({
  sapiId: z.number().int().positive({ message: "sapiId harus diisi dan berupa angka positif" }),
  hari: z.nativeEnum(Hari, { errorMap: () => ({ message: "Hari tidak valid" }) }),
});

const updateJadwalHarianSapiSchema = baseJadwalHarianSchema.partial(); // Semua field opsional untuk update

module.exports = {
  createJadwalHarianSchema,
  updateJadwalHarianSapiSchema,
};