const { z } = require('zod');

const createJadwalSchema = z.object({
  hari: z.string().min(1),
  sapiId: z.number().int().positive(),
  pagiJam: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/), // HH:mm
  soreJam: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/), // HH:mm
  pagiPakanId: z.number().int().positive(),
  sorePakanId: z.number().int().positive(),
});

const updateJadwalSchema = createJadwalSchema.partial();

module.exports = {
  createJadwalSchema,
  updateJadwalSchema,
};