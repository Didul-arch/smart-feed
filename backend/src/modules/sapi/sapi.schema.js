const { z } = require('zod');

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD

const createSapiSchema = z.object({
  jenis: z.string().min(1),
  bobot: z.coerce.number().min(0),
  image: z.string().min(1),
  kandangId: z.coerce.number().int().positive(),
  tanggalLahir: dateString,
  tanggalKematian: dateString.nullable().optional(),
});

const updateSapiSchema = z.object({
  jenis: z.string().min(1).optional(),
  bobot: z.coerce.number().positive().optional(),
  image: z.string().min(1).optional(),
  kandangId: z.coerce.number().int().positive().optional(),
  tanggalLahir: dateString.optional(),
  tanggalKematian: dateString.nullable().optional(),
});

module.exports = {
  createSapiSchema,
  updateSapiSchema,
};