const jadwalService = require("./jadwal.service");
const { createJadwalSchema, updateJadwalSchema } = require("./jadwal.schema");
const catchAsync = require("../../core/helper/catchAsync");

class JadwalController {
  getAll = catchAsync(async (req, res) => {
    const data = await jadwalService.getAll();
    res.json(data);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await jadwalService.getById(id);
    if (!data) return res.status(404).json({ message: "Jadwal not found" });
    res.json(data);
  });

  create = catchAsync(async (req, res) => {
    const parse = createJadwalSchema.safeParse(req.body);
    if (!parse.success)
      return res.status(400).json({ error: parse.error.errors });
    const data = await jadwalService.create(parse.data);
    res.status(201).json(data);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const parse = updateJadwalSchema.safeParse(req.body);
    if (!parse.success)
      return res.status(400).json({ error: parse.error.errors });
    const data = await jadwalService.update(id, parse.data);
    if (!data) return res.status(404).json({ message: "Jadwal not found" });
    res.json(data);
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await jadwalService.delete(id);
    if (!result) return res.status(404).json({ message: "Jadwal not found" });
    res.status(204).send();
  });

  // GET /api/v1/jadwal/status/:sapiId?tanggal=2024-05-10
  getStatusBySapiId = catchAsync(async (req, res) => {
    const { sapiId } = req.params;
    const { tanggal } = req.query;
    const status = await jadwalService.getStatusBySapiId(
      Number(sapiId),
      tanggal
    );
    if (!status) return res.status(404).json({ message: "Sapi not found" });
    res.json(status);
  });

  // GET /api/v1/jadwal/status?kandangId=1&tanggal=2024-05-10
  getStatusAllSapi = catchAsync(async (req, res) => {
    const { kandangId, tanggal } = req.query;
    const statusList = await jadwalService.getStatusAllSapi({
      kandangId: kandangId ? Number(kandangId) : undefined,
      tanggal,
    });
    res.json(statusList);
  });
}

module.exports = new JadwalController();


