const { z } = require("zod");

const createPakanSchema = z.object({
  nama: z.string().min(1, { message: "Nama pakan harus diisi" }),
  jenis: z.string().min(1, { message: "Jenis pakan harus diisi" }),
  banyakStok: z.coerce.number().min(0, { message: "Stok tidak boleh negatif" }).default(0),
  harga: z.coerce.number().min(0, { message: "Harga tidak boleh negatif" }).optional().nullable().default(0),
  image: z.string().optional().nullable(),
  // Field Nutrisi Baru
  bk: z.coerce.number().optional().nullable(), // Bahan Kering (%)
  pk: z.coerce.number().optional().nullable(), // Protein Kasar (%)
  sk: z.coerce.number().optional().nullable(), // Serat Kasar (%)
  tdn: z.coerce.number().optional().nullable(), // Total Digestible Nutrient (%)
  ca: z.coerce.number().optional().nullable(), // Kalsium (%)
  p: z.coerce.number().optional().nullable(), // Fosfor (%)
});

const updatePakanSchema = createPakanSchema.partial(); // .partial() membuat semua field menjadi opsional

module.exports = { createPakanSchema, updatePakanSchema };