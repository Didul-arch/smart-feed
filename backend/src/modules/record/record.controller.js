const recordService = require('./record.service');
const { createRecordSchema } = require('./record.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/appError');

class RecordController {
  create = catchAsync(async (req, res) => {
    const parse = createRecordSchema.safeParse(req.body);
    if (!parse.success) throw new AppError(parse.error.errors[0]?.message || "Input tidak valid", 400);

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
}
module.exports = new RecordController();