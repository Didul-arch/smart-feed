import { useState, useEffect } from 'react'; // Tambahkan useEffect
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Untuk dropdown kandang jika diperlukan (belum diimplementasikan penuh di sini)
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useFetchData } from "@/hooks/useAPI";

export default function SapiForm({
  initial = {},
  onSubmit,
  loading,
  isEditMode = false,
  initialKandangId, // ID kandang yang sudah ditentukan (dari URL atau data edit)
  isKandangIdFixed = false // Apakah field kandangId boleh diubah
}) {
  const [form, setForm] = useState({
    jenis: initial.jenis || "",
    bobot: initial.bobot || "",
    image: initial.image || "",
    // Prioritaskan initialKandangId (dari URL/edit), lalu initial.kandangId (dari data awal), baru string kosong
    kandangId: initialKandangId !== undefined ? String(initialKandangId) : (initial.kandangId !== undefined ? String(initial.kandangId) : ""),
    tanggalLahir: initial.tanggalLahir ? initial.tanggalLahir.slice(0, 10) : "", // Format YYYY-MM-DD
    tanggalKematian: initial.tanggalKematian ? initial.tanggalKematian.slice(0, 10) : "", // Format YYYY-MM-DD
  });

  // Sinkronkan form.kandangId jika initialKandangId (dari prop) berubah dan itu fixed
  useEffect(() => {
    if (isKandangIdFixed && initialKandangId !== undefined && String(form.kandangId) !== String(initialKandangId)) {
      setForm(f => ({ ...f, kandangId: String(initialKandangId) }));
    }
  }, [initialKandangId, isKandangIdFixed, form.kandangId]);


  // Jika Anda ingin dropdown untuk memilih kandang saat isKandangIdFixed=false dan tidak ada initialKandangId
  // const { data: kandangList, loading: loadingKandangList } = useFetchData(
  //   !isKandangIdFixed && !initialKandangId ? "/kandang" : null
  // );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const internalHandleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...form,
      bobot: form.bobot ? Number(form.bobot) : 0, // Pastikan bobot adalah angka
      kandangId: form.kandangId ? Number(form.kandangId) : null, // Pastikan kandangId adalah angka
      // tanggalLahir dan tanggalKematian sudah string YYYY-MM-DD
      // Backend akan mengubahnya ke Date object jika perlu
    };
    // Jika tanggal kematian kosong, kirim null atau jangan kirim fieldnya
    if (!dataToSubmit.tanggalKematian) {
      delete dataToSubmit.tanggalKematian;
    }
    onSubmit(dataToSubmit);
  };

  return (
    <form
      className="space-y-4"
      onSubmit={internalHandleSubmit}
    >
      <div>
        <label htmlFor="jenis" className="block mb-1 font-medium">Jenis Sapi</label>
        <Input id="jenis" name="jenis" value={form.jenis} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="bobot" className="block mb-1 font-medium">Bobot (kg)</label>
        <Input id="bobot" name="bobot" type="number" value={form.bobot} onChange={handleChange} required min="0" />
      </div>

      {/* Field Kandang ID */}
      <div>
        <label htmlFor="kandangId" className="block mb-1 font-medium">
          ID Kandang
          {isKandangIdFixed && initialKandangId !== undefined && " (Otomatis)"}
        </label>
        <Input
          id="kandangId"
          name="kandangId"
          type="number"
          value={form.kandangId}
          onChange={handleChange}
          required={!isKandangIdFixed} // Wajib jika tidak fixed
          readOnly={isKandangIdFixed && initialKandangId !== undefined} // ReadOnly jika fixed
          disabled={isKandangIdFixed && initialKandangId !== undefined} // Disabled jika fixed
          className={(isKandangIdFixed && initialKandangId !== undefined) ? "bg-muted/50" : ""}
        />
        {/* 
          TODO: Jika !isKandangIdFixed dan !initialKandangId, idealnya ini adalah Select dropdown.
          Contoh dengan Select (perlu import komponen Select dan useFetchData untuk kandangList):
          {(!isKandangIdFixed && initialKandangId === undefined) ? (
            loadingKandangList ? <p>Memuat kandang...</p> :
            <Select name="kandangId" value={form.kandangId} onValueChange={(value) => handleChange({ target: { name: 'kandangId', value }})}>
              <SelectTrigger><SelectValue placeholder="Pilih Kandang" /></SelectTrigger>
              <SelectContent>
                {kandangList?.map(k => <SelectItem key={k.id} value={String(k.id)}>{k.nama} (ID: {k.id})</SelectItem>)}
              </SelectContent>
            </Select>
          ) : (
            <Input ... /> // Input biasa seperti di atas
          )}
        */}
      </div>

      <div>
        <label htmlFor="image" className="block mb-1 font-medium">URL Gambar</label>
        <Input id="image" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/sapi.jpg" required />
      </div>
      <div>
        <label htmlFor="tanggalLahir" className="block mb-1 font-medium">Tanggal Lahir</label>
        <Input id="tanggalLahir" name="tanggalLahir" type="date" value={form.tanggalLahir} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="tanggalKematian" className="block mb-1 font-medium">Tanggal Kematian (Opsional)</label>
        <Input id="tanggalKematian" name="tanggalKematian" type="date" value={form.tanggalKematian} onChange={handleChange} />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : (isEditMode ? "Simpan Perubahan" : "Tambah Sapi")}
      </Button>
    </form>
  );
}