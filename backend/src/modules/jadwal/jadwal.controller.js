const jadwalService = require('./jadwal.service');
const { createJadwalSchema, updateJadwalSchema } = require('./jadwal.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/appError');

class JadwalController {
  getAll = catchAsync(async (req, res) => {
    const filters = {
      hari: req.query.hari,
      sapiId: req.query.sapiId,
      kandangId: req.query.kandangId
    };

    const data = await jadwalService.getAll(filters);
    res.json(data);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await jadwalService.getById(id);
    res.json(data);
  });

  create = catchAsync(async (req, res) => {
    const result = createJadwalSchema.safeParse(req.body);
    if (!result.success) {
      throw new AppError(result.error.errors[0]?.message || 'Invalid input', 400);
    }

    const data = await jadwalService.create(result.data);
    res.status(201).json(data);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = updateJadwalSchema.safeParse(req.body);
    if (!result.success) {
      throw new AppError(result.error.errors[0]?.message || 'Invalid input', 400);
    }

    const data = await jadwalService.update(id, result.data);
    res.json(data);
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    await jadwalService.delete(id);
    res.status(204).send();
  });

  getDashboard = catchAsync(async (req, res) => {
    const { date } = req.query;
    const data = await jadwalService.getDashboardData(date);
    res.json(data);
  });

  getSummaryByKandang = catchAsync(async (req, res) => {
    const { date } = req.query;
    const data = await jadwalService.getSummaryByKandang(date);
    res.json(data);
  });
}

module.exports = new JadwalController();