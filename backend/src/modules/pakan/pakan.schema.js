const { z } = require('zod');

const createPakanSchema = z.object({
  jenis: z.string().min(1),
  banyakStok: z.number().positive(),
  harga: z.number().positive().optional().nullable(),
  image: z.string().min(1),
});

const updatePakanSchema = z.object({
  jenis: z.string().min(1).optional(),
  banyakStok: z.number().positive().optional(),
  harga: z.number().positive().optional().nullable(),
  image: z.string().min(1).optional(),
});

module.exports = {
  createPakanSchema,
  updatePakanSchema,
};