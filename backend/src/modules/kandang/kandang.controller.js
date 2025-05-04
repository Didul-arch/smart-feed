const kandangService = require('./kandang.service');
const { createKandangSchema, updateKandangSchema } = require('./kandang.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/appError');

class KandangController {
  getAll = catchAsync(async (req, res) => {
    const data = await kandangService.getAll();
    res.json(data);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await kandangService.getById(id);
    if (!data) throw new AppError('Kandang not found', 404);
    res.json(data);
  });

  create = catchAsync(async (req, res) => {
    const parse = createKandangSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || 'Invalid input', 400);
    const data = await kandangService.create(parse.data);
    res.status(201).json(data);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const parse = updateKandangSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || 'Invalid input', 400);
    const data = await kandangService.update(id, parse.data);
    if (!data) throw new AppError('Kandang not found', 404);
    res.json(data);
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await kandangService.delete(id);
    if (!deleted) throw new AppError('Kandang not found', 404);
    res.status(204).send();
  });
}

module.exports = new KandangController();