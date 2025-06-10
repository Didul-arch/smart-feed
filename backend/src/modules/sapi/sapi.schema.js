const { z } = require("zod");

const baseSapiSchema = z.object({
  jenis: z.string().min(1, { message: "Jenis sapi harus diisi" }), // Mengubah 'nama' menjadi 'jenis' dan memperbarui pesan
  kandangId: z.coerce
    .number()
    .int()
    .positive({ message: "Kandang harus dipilih" }),
  bobot: z.preprocess((val) => {
    // Handle empty string or undefined by converting to undefined
    if (val === "" || val === null || val === undefined) return undefined;
    return Number(val);
  }, z.number().positive({ message: "Bobot harus lebih dari 0" }).optional()),
  tanggalLahir: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Format tanggal tidak valid",
    })
    .optional(),
  tanggalKematian: z.preprocess(
    (val) => {
      // Handle empty string by converting to null
      if (val === "" || val === undefined) return null;
      return val;
    },
    z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Format tanggal tidak valid",
      })
      .nullable()
      .optional()
  ),
  jenisKelamin: z.enum(["JANTAN", "BETINA"], {
    errorMap: () => ({ message: "Jenis kelamin harus JANTAN atau BETINA" }),
  }),
  status: z
    .enum(["AKTIF", "TIDAK_AKTIF"], {
      errorMap: () => ({ message: "Status harus AKTIF atau TIDAK_AKTIF" }),
    })
    .optional(),
  image: z.string().optional(), // Changed from 'gambar' to 'image' to match database field
});

const createSapiSchema = baseSapiSchema;

const updateSapiSchema = baseSapiSchema.partial();

module.exports = {
  createSapiSchema,
  updateSapiSchema,
};
