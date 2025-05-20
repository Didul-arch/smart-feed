import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function KandangForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    nama: initial.nama || "",
    lokasi: initial.lokasi || "",
    kapasitas: initial.kapasitas || "",
  });

  useEffect(() => {
    setForm({
      nama: initial.nama || "",
      lokasi: initial.lokasi || "",
      kapasitas: initial.kapasitas || "",
    });
  }, [initial]);

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
        <label className="block mb-1 font-medium">Nama Kandang</label>
        <Input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Lokasi</label>
        <Input
          name="lokasi"
          value={form.lokasi}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Kapasitas</label>
        <Input
          name="kapasitas"
          type="number"
          value={form.kapasitas}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}