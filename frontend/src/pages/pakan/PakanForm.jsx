import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const jenisOptions = ["Hijauan", "Konsentrat", "Silase", "Lainnya"];

export default function PakanForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    nama: initial.nama || "",
    jenis: initial.jenis || "",
    banyakStok: initial.banyakStok || "",
    harga: initial.harga || "",
    image: initial.image || "",
    // Tambahkan field nutrisi
    bk: initial.bk || "",
    pk: initial.pk || "",
    sk: initial.sk || "",
    tdn: initial.tdn || "",
    ca: initial.ca || "",
    p: initial.p || "",
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
        <label className="block mb-1 font-medium">Nama Pakan</label>
        <Input name="nama" value={form.nama} onChange={handleChange} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Jenis</label>
        <select
          name="jenis"
          value={form.jenis}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1 h-10" // Tambahkan h-10 agar sama tinggi dengan Input
          required
        >
          <option value="">Pilih Jenis</option>
          {jenisOptions.map(j => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Stok (kg)</label>
        <Input
          name="banyakStok"
          type="number"
          value={form.banyakStok}
          onChange={handleChange}
          required
          step="any" // Izinkan desimal jika perlu
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Harga (Rp)</label>
        <Input
          name="harga"
          type="number"
          value={form.harga}
          onChange={handleChange}
          step="any"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Nama File Gambar</label>
        <Input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="pakan1.jpg"
        />
      </div>

      {/* Field Nutrisi Baru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block mb-1 font-medium text-sm">Bahan Kering (BK%)</label>
          <Input name="bk" type="number" step="any" value={form.bk} onChange={handleChange} placeholder="Contoh: 86.0" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Protein Kasar (PK%)</label>
          <Input name="pk" type="number" step="any" value={form.pk} onChange={handleChange} placeholder="Contoh: 14.0" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Serat Kasar (SK%)</label>
          <Input name="sk" type="number" step="any" value={form.sk} onChange={handleChange} placeholder="Contoh: 8.2" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">TDN (%)</label>
          <Input name="tdn" type="number" step="any" value={form.tdn} onChange={handleChange} placeholder="Contoh: 67.9" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Kalsium (Ca%)</label>
          <Input name="ca" type="number" step="any" value={form.ca} onChange={handleChange} placeholder="Contoh: 1.4" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Fosfor (P%)</label>
          <Input name="p" type="number" step="any" value={form.p} onChange={handleChange} placeholder="Contoh: 1.23" />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}