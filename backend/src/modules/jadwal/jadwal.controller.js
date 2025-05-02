const jadwalService = require('./jadwal.service');
const  { createJadwalSchema, updateJadwalSchema } = require('./jadwal.schema');
const catchAsync = require('../../core/helper/catchAsync');

class jadwalController {  
  getAll = catchAsync(async(req, res) => {
      const data = await jadwalService.getAll();
      res.json(data);
  });
  
  getById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const data = await jadwalService.getById(id);
    if (!data) return res.status(404).json({ message:"Jadwal not found" });
    res.json(data);
  });

  create = catchAsync(async(req, res) => {
    const parse = createJadwalSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: parse.error.errors });
    const data = await jadwalService.create(parse.data);
    res.status(201).json(data);
  });
  
  update = catchAsync(async(req, res) => {
    const { id } = req.params;
    const parse = updateJadwalSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: parse.error.errors });
    const data = await jadwalService.update(id, parse.data);    
  })
  delete
}