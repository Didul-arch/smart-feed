const { z } = require('zod');

const CreateSapiBodySchema = z.object({
  bobot: z.number(),
  jenis: z.string(),
  image: z.string().optional(),
  tanggalLahir: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).transform((val) => new Date(val).toISOString()),
});

const PatchSapiBodySchema = z.object({
  bobot: z.number().optional(),
  jenis: z.string().optional(),
  image: z.string().optional(),
  tanggalLahir: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).transform((val) => new Date(val).toISOString()).optional(),
});

module.exports = { CreateSapiBodySchema, PatchSapiBodySchema };