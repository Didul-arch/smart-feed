const { z } = require('zod');

const createJadwalSchema = z.object({
  hari: z.string().min(1),
  sapiId: z.number().int().positive(),
  pakanId: z.number().int().positive(),
  pagi: z.object({
    jam: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), // HH:mm format
    records: z.array(z.object({
      userId: z.number().int().positive(),
      waktu: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), // HH:mm format
    })).optional(),
  }),
  sore: z.object({
    jam: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), // HH:mm format
    records: z.array(z.object({
      userId: z.number().int().positive(),
      waktu: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), // HH:mm format
    })).optional(),
  }),
});

const updateJadwalSchema = z.object({
  hari: z.string().min(1).optional(),
  sapiId: z.number().int().positive().optional(),
  pakanId: z.number().int().positive().optional(),
  pagi: z.object({
    jam: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    records: z.array(z.object({
      userId: z.number().int().positive(),
      waktu: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    })).optional(),
  }).optional(),
  sore: z.object({
    jam: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    records: z.array(z.object({
      userId: z.number().int().positive(),
      waktu: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    })).optional(),
  }).optional(),
});

module.exports = {
  createJadwalSchema,
  updateJadwalSchema,
};