const { z } = require('zod');
const { SesiPemberianMakan } = require('../../../generated/prisma');

const createRecordSchema = z.object({
  sapiId: z.number().int().positive(),
  pakanDiberikanId: z.number().int().positive(),
  tanggalPemberian: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  sesi: z.nativeEnum(SesiPemberianMakan),
  // kandangId akan diambil dari sapiId di service
});

module.exports = { createRecordSchema };