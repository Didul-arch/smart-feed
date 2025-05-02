const sapiService = require('./sapi.service');
const { createSapiSchema, updateSapiSchema } = require('./sapi.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/AppError');

class SapiController {
  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await sapiService.getById(id);
    if (!data) throw new AppError("Sapi not found", 404);
    res.json(data);
  });

  getAll = catchAsync(async (req, res) => {
    const data = await sapiService.getAll();
    res.json(data);
  });

  create = catchAsync(async (req, res) => {
    const parse = createSapiSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || "Invalid input", 400);
    const data = await sapiService.create(parse.data);
    res.status(201).json(data);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const parse = updateSapiSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || "Invalid input", 400);
    const data = await sapiService.update(id, parse.data);
    if (!data) throw new AppError("Sapi not found", 404);
    res.json(data);
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await sapiService.delete(id);
    if (!deleted) throw new AppError("Sapi not found", 404);
    res.status(204).send();
  });
}

module.exports = new SapiController();

