const { z } = require('zod');

const createKandangSchema = z.object({
  nama: z.string().min(1),
  lokasi: z.string().optional().nullable(),
  kapasitas: z.number().int().positive(),
});

const updateKandangSchema = z.object({
  nama: z.string().min(1).optional(),
  lokasi: z.string().optional().nullable(),
  kapasitas: z.number().int().positive().optional(),
});

module.exports = {
  createKandangSchema,
  updateKandangSchema,
};