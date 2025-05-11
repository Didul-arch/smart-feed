const jadwalService = require('./jadwal.service');
const { createJadwalSchema, updateJadwalSchema } = require('./jadwal.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/appError');

class JadwalController {
  getAll = catchAsync(async (req, res) => {
    const data = await jadwalService.getAll();
    res.json(data);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await jadwalService.getById(id);
    if (!data) throw new AppError("Jadwal not found", 404);
    res.json(data);
  });

  create = catchAsync(async (req, res) => {
    const parse = createJadwalSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || "Invalid input", 400);
    const data = await jadwalService.create(parse.data);
    res.status(201).json(data);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const parse = updateJadwalSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || "Invalid input", 400);
    const data = await jadwalService.update(id, parse.data);
    if (!data) throw new AppError("Jadwal not found", 404);
    res.json(data);
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await jadwalService.delete(id);
    if (!deleted) throw new AppError("Jadwal not found", 404);
    res.status(204).send();
  });
}

module.exports = new JadwalController();