const pakanService = require('./pakan.service');
const { createPakanSchema, updatePakanSchema } = require('./pakan.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/appError');

class PakanController {
  getAll = catchAsync(async (req, res) => {
    const data = await pakanService.getAll();
    res.json(data);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await pakanService.getById(id);
    if (!data) throw new AppError('Pakan not found', 404);
    res.json(data);
  });

  create = catchAsync(async (req, res) => {
    const parse = createPakanSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || 'Invalid input', 400);
    const data = await pakanService.create(parse.data);
    res.status(201).json(data);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const parse = updatePakanSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || 'Invalid input', 400);
    const data = await pakanService.update(id, parse.data);
    if (!data) throw new AppError('Pakan not found', 404);
    res.json(data);
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await pakanService.delete(id);
    if (!deleted) throw new AppError('Pakan not found', 404);
    res.status(204).send();
  });
}

module.exports = new PakanController();