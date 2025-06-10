const sapiService = require("./sapi.service");
const uploadService = require("../../services/uploadService");
const { createSapiSchema, updateSapiSchema } = require("./sapi.schema");
const catchAsync = require("../../core/helper/catchAsync");
const AppError = require("../../core/helper/appError");

class SapiController {
  getAll = catchAsync(async (req, res) => {
    const data = await sapiService.getAll();
    res.json(data);
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await sapiService.getById(id);
    if (!data) throw new AppError("Sapi not found", 404);
    res.json(data);
  });

  create = catchAsync(async (req, res) => {
    if (req.body.tanggalKematian === "") req.body.tanggalKematian = null;

    const parse = createSapiSchema.safeParse(req.body);
    if (!parse.success)
      throw new AppError(
        parse.error.errors[0]?.message || "Invalid input",
        400
      );

    // Transform tanggal ke Date (ISO)
    const dataToCreate = {
      ...parse.data,
      tanggalLahir: parse.data.tanggalLahir
        ? new Date(parse.data.tanggalLahir)
        : undefined,
      tanggalKematian: parse.data.tanggalKematian
        ? new Date(parse.data.tanggalKematian)
        : null,
    };

    // Create sapi first to get ID
    const sapi = await sapiService.create(dataToCreate);

    // Upload image if file provided
    if (req.file) {
      try {
        const uploadResult = await uploadService.uploadSapiImage(
          req.file,
          sapi.id
        );

        // Update sapi with image URL
        const updatedSapi = await sapiService.update(sapi.id, {
          image: uploadResult.publicUrl,
        });

        res.status(201).json(updatedSapi);
      } catch (uploadError) {
        // If upload fails, delete the created sapi
        await sapiService.delete(sapi.id);
        throw new AppError(`Upload failed: ${uploadError.message}`, 400);
      }
    } else {
      res.status(201).json(sapi);
    }
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const existingSapi = await sapiService.getById(id);

    if (!existingSapi) {
      throw new AppError("Sapi not found", 404);
    }

    if (req.body.tanggalKematian === "") req.body.tanggalKematian = null;

    const parse = updateSapiSchema.safeParse(req.body);
    if (!parse.success)
      throw new AppError(
        parse.error.errors[0]?.message || "Invalid input",
        400
      );

    // Transform tanggal ke Date (ISO)
    let dataToUpdate = {
      ...parse.data,
      tanggalLahir: parse.data.tanggalLahir
        ? new Date(parse.data.tanggalLahir)
        : undefined,
      tanggalKematian: parse.data.tanggalKematian
        ? new Date(parse.data.tanggalKematian)
        : null,
    };

    // Handle image upload if new file provided
    if (req.file) {
      try {
        const uploadResult = await uploadService.uploadSapiImage(req.file, id);
        dataToUpdate.image = uploadResult.publicUrl;

        // Delete old image if exists and is from Supabase
        if (existingSapi.image && existingSapi.image.includes("supabase.co")) {
          const oldPath = existingSapi.image.split("/").slice(-2).join("/");
          await uploadService.deleteSapiImage(oldPath);
        }
      } catch (uploadError) {
        throw new AppError(`Upload failed: ${uploadError.message}`, 400);
      }
    }

    const updatedSapi = await sapiService.update(id, dataToUpdate);
    res.json(updatedSapi);
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const existingSapi = await sapiService.getById(id);

    if (!existingSapi) throw new AppError("Sapi not found", 404);

    // Delete image from storage if exists
    if (existingSapi.image && existingSapi.image.includes("supabase.co")) {
      try {
        const imagePath = existingSapi.image.split("/").slice(-2).join("/");
        await uploadService.deleteSapiImage(imagePath);
      } catch (error) {
        console.error("Failed to delete image:", error.message);
        // Continue with sapi deletion even if image deletion fails
      }
    }

    const deleted = await sapiService.delete(id);
    res.status(204).send();
  });
}

module.exports = new SapiController();
