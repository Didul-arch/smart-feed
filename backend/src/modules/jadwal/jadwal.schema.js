const { z } = require('zod');

const createJadwalSchema = z.object({
  tanggal: z.string().datetime(),
  sapiId: z.number().int().positive(),
  pakanId: z.number().int().positive(),
  userId: z.number().int().positive(),
});

const updateJadwalSchema = z.object({
  tanggal: z.string().datetime().optional(),
  sapiId: z.number().int().positive().optional(),
  pakanId: z.number().int().positive().optional(),
  userId: z.number().int().positive().optional(),
});

module.exports = { createJadwalSchema, updateJadwalSchema };