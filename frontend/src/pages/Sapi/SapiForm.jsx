import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import komponen Select

export default function SapiForm({
  initial = {},
  onSubmit,
  loading,
  isEditMode = false,
  initialKandangId, // Prop ini akan digunakan untuk set nilai awal kandangId
  isKandangIdFixed = false, // Prop ini menentukan apakah field kandangId bisa diedit
}) {
  const [form, setForm] = useState(() => {
    // Inisialisasi form state dengan nilai awal yang lebih bersih
    const initialData = {
      jenis: "",
      bobot: "",
      image: "",
      kandangId: "",
      tanggalLahir: "",
      tanggalKematian: "",
      jenisKelamin: "", // Tambahkan jenisKelamin ke initialData
      ...initial, // Timpa dengan nilai dari prop 'initial'
    };

    // Format tanggal jika ada
    if (initialData.tanggalLahir) {
      initialData.tanggalLahir = initialData.tanggalLahir.slice(0, 10);
    }
    if (initialData.tanggalKematian) {
      initialData.tanggalKematian = initialData.tanggalKematian.slice(0, 10);
    }

    // Set kandangId dari initialKandangId jika disediakan dan form belum punya kandangId
    if (initialKandangId !== undefined && !initialData.kandangId) {
      initialData.kandangId = String(initialKandangId);
    }
    // Pastikan jenisKelamin memiliki nilai default jika tidak ada di initial
    if (!initialData.jenisKelamin) {
      initialData.jenisKelamin = "JANTAN"; // Atau "BETINA", atau biarkan kosong jika ingin user memilih
    }
    return initialData;
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(form.image || "");
  const [uploadMethod, setUploadMethod] = useState(
    form.image && !isEditMode ? "url" : "file"
  );

  useEffect(() => {
    // Sinkronisasi imagePreview jika initial.image berubah (misalnya setelah fetch data di edit mode)
    if (initial.image !== imagePreview && !imageFile) {
      setImagePreview(initial.image || "");
      // Jika initial.image ada, dan kita di edit mode, prefer method URL jika itu adalah URL
      if (initial.image && initial.image.startsWith("http")) {
        setUploadMethod("url");
      }
    }
  }, [initial.image, imageFile]);

  useEffect(() => {
    // Update form kandangId jika isKandangIdFixed dan initialKandangId berubah
    if (isKandangIdFixed && initialKandangId !== undefined) {
      setForm((f) => ({ ...f, kandangId: String(initialKandangId) }));
    }
  }, [initialKandangId, isKandangIdFixed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handler khusus untuk Select component
  const handleSelectChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Hanya file gambar yang diperbolehkan.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        alert("Ukuran file maksimal 5MB.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result); // Menghilangkan 'as string'
      reader.readAsDataURL(file);
      setForm((prev) => ({ ...prev, image: "" })); // Kosongkan field image URL jika file dipilih
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm((prev) => ({ ...prev, image: "" }));
    const fileInput = document.getElementById("imageFile"); // Menghilangkan 'as HTMLInputElement'
    if (fileInput) fileInput.value = "";
  };

  const internalHandleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append semua field dari form state
    Object.keys(form).forEach((key) => {
      if (key === "bobot" || key === "kandangId") {
        // Pastikan bobot dan kandangId dikirim sebagai angka jika ada nilainya
        if (form[key]) formDataToSend.append(key, Number(form[key]).toString());
        else if (key === "kandangId" && form[key] === null) {
          // Backend mungkin mengharapkan null eksplisit untuk kandangId yang kosong
          formDataToSend.append(key, ""); // atau handle sesuai kebutuhan backend
        }
      } else if (form[key] !== null && form[key] !== undefined) {
        formDataToSend.append(key, form[key]);
      }
    });

    let finalContentType = "json";

    if (imageFile) {
      formDataToSend.append("image", imageFile); // File fisik
      finalContentType = "multipart";
    } else if (form.image) {
      // Jika tidak ada imageFile tapi ada form.image (URL), backend harus bisa handle ini
      // Jika backend hanya terima multipart untuk image, maka URL harus dikirim sebagai field biasa
      // dan tidak sebagai file. Jika backend bisa terima URL sebagai string, maka ini sudah benar.
      // Untuk konsistensi, jika ada image URL dan tidak ada file, kita tetap kirim sebagai field 'image'
      formDataToSend.set("image", form.image); // Pastikan field image di FormData adalah URL string
    } else {
      // Jika tidak ada image sama sekali (baik file maupun URL)
      formDataToSend.delete("image"); // Hapus field image jika kosong
    }

    // Hapus field yang tidak perlu dikirim jika kosong, misal tanggalKematian
    if (!form.tanggalKematian) {
      formDataToSend.delete("tanggalKematian");
    }

    onSubmit(formDataToSend, finalContentType);
  };

  return (
    <form className="space-y-6" onSubmit={internalHandleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jenis">Jenis Sapi</Label>
          <Input
            id="jenis"
            name="jenis"
            value={form.jenis}
            onChange={handleChange}
            required
            placeholder="contoh: Sapi Limousin"
          />
        </div>
        <div>
          <Label htmlFor="bobot">Bobot (kg)</Label>
          <Input
            id="bobot"
            name="bobot"
            type="number"
            value={form.bobot}
            onChange={handleChange}
            required
            min="0"
            placeholder="contoh: 400"
          />
        </div>
      </div>

      {/* Jenis Kelamin */}
      <div>
        <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
        <Select
          name="jenisKelamin"
          value={form.jenisKelamin}
          onValueChange={(value) => handleSelectChange("jenisKelamin", value)}
          required
        >
          <SelectTrigger id="jenisKelamin">
            <SelectValue placeholder="Pilih jenis kelamin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JANTAN">Jantan</SelectItem>
            <SelectItem value="BETINA">Betina</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="kandangId">
          ID Kandang
          {isKandangIdFixed && " (Otomatis dari kandang saat ini)"}
        </Label>
        <Input
          id="kandangId"
          name="kandangId"
          type="number"
          value={form.kandangId}
          onChange={handleChange}
          required={!isKandangIdFixed} // Wajib jika tidak fixed
          readOnly={isKandangIdFixed} // Hanya bisa dibaca jika fixed
          disabled={isKandangIdFixed} // Nonaktifkan jika fixed
          className={isKandangIdFixed ? "bg-muted/50" : ""}
          placeholder="contoh: 12"
        />
      </div>

      <div className="space-y-4">
        <Label>Foto Sapi</Label>
        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant={uploadMethod === "file" ? "default" : "outline"}
            size="sm"
            onClick={() => setUploadMethod("file")}
          >
            Upload File
          </Button>
          <Button
            type="button"
            variant={uploadMethod === "url" ? "default" : "outline"}
            size="sm"
            onClick={() => setUploadMethod("url")}
          >
            Gunakan URL
          </Button>
        </div>

        {uploadMethod === "file" ? (
          <div>
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Max 5MB. Format: JPG, PNG, GIF, WebP.
            </p>
          </div>
        ) : (
          <div>
            <Input
              id="imageUrl"
              name="image" // Pastikan name adalah 'image' agar handleChange mengupdate form.image
              value={form.image} // Bind ke form.image
              onChange={handleImageUrlChange} // Gunakan handler spesifik untuk URL
              placeholder="https://example.com/gambar-sapi.jpg"
            />
          </div>
        )}

        {imagePreview && (
          <Card className="relative mt-4">
            <CardContent className="p-2">
              <div className="relative aspect-video">
                <img
                  src={imagePreview}
                  alt="Preview Foto Sapi"
                  className="w-full h-full object-cover rounded"
                  onError={() => {
                    setImagePreview(""); // Kosongkan preview jika URL error
                    // Mungkin tambahkan notifikasi error ke pengguna
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={clearImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {imageFile && (
                <p className="text-sm text-muted-foreground mt-2">
                  File: {imageFile.name}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {!imagePreview && uploadMethod === "file" && (
          <Card className="border-dashed mt-4">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Pilih file gambar untuk diupload.
              </p>
            </CardContent>
          </Card>
        )}
        {!imagePreview && uploadMethod === "url" && (
          <Card className="border-dashed mt-4">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Masukkan URL gambar.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input
            id="tanggalLahir"
            name="tanggalLahir"
            type="date"
            value={form.tanggalLahir}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="tanggalKematian">Tanggal Kematian (Opsional)</Label>
          <Input
            id="tanggalKematian"
            name="tanggalKematian"
            type="date"
            value={form.tanggalKematian}
            onChange={handleChange}
            min={form.tanggalLahir} // Tanggal kematian tidak boleh sebelum tanggal lahir
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full text-base py-3"
      >
        {loading
          ? "Menyimpan Data..."
          : isEditMode
          ? "Simpan Perubahan Sapi"
          : "Tambah Sapi Baru"}
      </Button>
    </form>
  );
}
