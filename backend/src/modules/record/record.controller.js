const recordService = require('./record.service');
const { createRecordSchema } = require('./record.schema');
const catchAsync = require('../../core/helper/catchAsync');
const AppError = require('../../core/helper/appError');

class RecordController {
  create = catchAsync(async (req, res) => {
    const result = createRecordSchema.safeParse(req.body);
    if (!result.success) {
      throw new AppError(result.error.errors[0]?.message || 'Invalid input', 400);
    }
    
    const record = await recordService.create(result.data);
    res.status(201).json(record);
  });

  getAll = catchAsync(async (req, res) => {
    const filters = {
      jadwalId: req.query.jadwalId,
      sapiId: req.query.sapiId,
      date: req.query.date,
      sesi: req.query.sesi
    };
    
    const records = await recordService.getAll(filters);
    res.json(records);
  });
}

module.exports = new RecordController();