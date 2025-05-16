import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SapiForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    jenis: initial.jenis || "",
    bobot: initial.bobot || "",
    image: initial.image || "",
    kandangId: initial.kandangId || "",
    tanggalLahir: initial.tanggalLahir ? initial.tanggalLahir.slice(0, 10) : "",
    tanggalKematian: initial.tanggalKematian ? initial.tanggalKematian.slice(0, 10) : "",
  });

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div>
        <label className="block mb-1 font-medium">Jenis Sapi</label>
        <Input name="jenis" value={form.jenis} onChange={handleChange} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Bobot (kg)</label>
        <Input name="bobot" type="number" value={form.bobot} onChange={handleChange} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">ID Kandang</label>
        <Input name="kandangId" type="number" value={form.kandangId} onChange={handleChange} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Tanggal Lahir</label>
        <Input name="tanggalLahir" type="date" value={form.tanggalLahir} onChange={handleChange} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Tanggal Kematian</label>
        <Input name="tanggalKematian" type="date" value={form.tanggalKematian} onChange={handleChange} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Nama File Gambar</label>
        <Input name="image" value={form.image} onChange={handleChange} placeholder="sapi1.jpg" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}