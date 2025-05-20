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
          className="w-full border rounded px-2 py-1"
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
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Harga (Rp)</label>
        <Input
          name="harga"
          type="number"
          value={form.harga}
          onChange={handleChange}
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
      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}