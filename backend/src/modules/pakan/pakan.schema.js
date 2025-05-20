const { z } = require("zod");

const createPakanSchema = z.object({
  nama: z.string().min(1),
  jenis: z.string().min(1),
  banyakStok: z.coerce.number().min(0), // ini auto parsing string ke number
  harga: z.coerce.number().optional(),  // ini juga
  image: z.string().optional(),
});

const updatePakanSchema = z.object({
  nama: z.string().min(1).optional(),
  jenis: z.string().min(1).optional(),
  banyakStok: z.coerce.number().min(0).optional(),
  harga: z.coerce.number().optional(),
  image: z.string().optional(),
});

module.exports = { createPakanSchema, updatePakanSchema };