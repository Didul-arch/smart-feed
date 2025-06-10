const recordService = require("./record.service");
const { createRecordSchema } = require("./record.schema");
const catchAsync = require("../../core/helper/catchAsync");
const AppError = require("../../core/helper/appError");

class RecordController {
  create = catchAsync(async (req, res) => {
    const parse = createRecordSchema.safeParse(req.body);
    if (!parse.success)
      throw new AppError(
        parse.error.errors[0]?.message || "Input tidak valid",
        400
      );

    const record = await recordService.createRecord(parse.data);
    res.status(201).json(record);
  });

  getAll = catchAsync(async (req, res) => {
    const { kandangId, date, sesi } = req.query;
    const filters = {};
    if (kandangId) filters.kandangId = parseInt(kandangId);
    if (date) filters.dateString = date;
    if (sesi) filters.sesi = sesi; // Pastikan sesi valid (PAGI/SORE)

    const records = await recordService.getAllRecords(filters);
    res.json(records);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const record = await recordService.getRecordById(id);
    if (!record) throw new AppError("Record not found", 404);
    res.json(record);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const parse = createRecordSchema.safeParse(req.body);
    if (!parse.success)
      throw new AppError(
        parse.error.errors[0]?.message || "Input tidak valid",
        400
      );

    const record = await recordService.updateRecord(id, parse.data);
    if (!record) throw new AppError("Record not found", 404);
    res.json(record);
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await recordService.deleteRecord(id);
    if (!deleted) throw new AppError("Record not found", 404);
    res.status(204).send();
  });
}
module.exports = new RecordController();
