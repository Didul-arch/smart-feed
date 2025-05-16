const { z } = require('zod');

const createRecordSchema = z.object({
  jadwalId: z.number().int().positive(),
  userId: z.number().int().positive(),
  waktu: z.string().datetime(),
  pakanId: z.number().int().positive(),
  sesi: z.enum(['pagi', 'sore']),
});

module.exports = {
  createRecordSchema,
};