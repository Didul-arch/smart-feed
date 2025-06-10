const supabase = require("../config/supabase");
const AppError = require("../core/helper/appError");

class UploadService {
  async uploadSapiImage(file, sapiId) {
    try {
      const fileExt = file.originalname.split(".").pop();
      const fileName = `sapi-${sapiId}-${Date.now()}.${fileExt}`;
      const filePath = `sapi-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) throw new AppError(`Upload failed: ${error.message}`, 400);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      return {
        fileName,
        filePath,
        publicUrl: urlData.publicUrl,
      };
    } catch (error) {
      throw new AppError(`Upload service error: ${error.message}`, 500);
    }
  }

  async deleteSapiImage(filePath) {
    try {
      const { error } = await supabase.storage
        .from("images")
        .remove([filePath]);

      if (error) throw new AppError(`Delete failed: ${error.message}`, 400);
      return true;
    } catch (error) {
      throw new AppError(`Delete service error: ${error.message}`, 500);
    }
  }

  async uploadPakanImage(file, pakanId) {
    try {
      const fileExt = file.originalname.split(".").pop();
      const fileName = `pakan-${pakanId}-${Date.now()}.${fileExt}`;
      const filePath = `pakan-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) throw new AppError(`Upload failed: ${error.message}`, 400);

      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      return {
        fileName,
        filePath,
        publicUrl: urlData.publicUrl,
      };
    } catch (error) {
      throw new AppError(`Upload service error: ${error.message}`, 500);
    }
  }

  async deletePakanImage(filePath) {
    try {
      const { error } = await supabase.storage
        .from("images")
        .remove([filePath]);

      if (error) throw new AppError(`Delete failed: ${error.message}`, 400);
      return true;
    } catch (error) {
      throw new AppError(`Delete service error: ${error.message}`, 500);
    }
  }
}

module.exports = new UploadService();
