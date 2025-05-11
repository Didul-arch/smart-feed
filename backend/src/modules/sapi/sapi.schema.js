const { z } = require('zod');

const createSapiSchema = z.object({
  jenis: z.string().min(1),
  bobot: z.number().positive(),
  image: z.string().min(1),
  kandangId: z.number().int().positive(),
  tanggalLahir: z.string().datetime(),
  tanggalKematian: z.string().datetime().nullable().optional(),
});

const updateSapiSchema = z.object({
  jenis: z.string().min(1).optional(),
  bobot: z.number().positive().optional(),
  image: z.string().min(1).optional(),
  kandangId: z.number().int().positive().optional(),
  tanggalLahir: z.string().datetime().optional(),
  tanggalKematian: z.string().datetime().nullable().optional(),
});

module.exports = {
  createSapiSchema,
  updateSapiSchema,
}; 