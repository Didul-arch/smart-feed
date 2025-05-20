const sapiService = require('./sapi.service');
const { createSapiSchema, updateSapiSchema } = require('./sapi.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/appError');

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
    if (req.body.tanggalKematian === "") req.body.tanggalKematian = null;
    const parse = createSapiSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || "Invalid input", 400);

    // Transform tanggal ke Date (ISO)
    const dataToCreate = {
      ...parse.data,
      tanggalLahir: parse.data.tanggalLahir ? new Date(parse.data.tanggalLahir) : undefined,
      tanggalKematian: parse.data.tanggalKematian ? new Date(parse.data.tanggalKematian) : null,
    };

    const data = await sapiService.create(dataToCreate);
    res.status(201).json(data);
  });

  update = catchAsync(async (req, res) => {
    if (req.body.tanggalKematian === "") req.body.tanggalKematian = null;
    const parse = updateSapiSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || "Invalid input", 400);

    // Transform tanggal ke Date (ISO)
    const dataToUpdate = {
      ...parse.data,
      tanggalLahir: parse.data.tanggalLahir ? new Date(parse.data.tanggalLahir) : undefined,
      tanggalKematian: parse.data.tanggalKematian ? new Date(parse.data.tanggalKematian) : null,
    };

    const data = await sapiService.update(req.params.id, dataToUpdate);
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

