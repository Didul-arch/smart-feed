import { useNavigate } from "react-router-dom";
import { useSubmitData } from "@/hooks/useAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function AddKandang() {
  const { submitData, loading, error } = useSubmitData();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    kapasitas: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitData("/kandang", "POST", {
      ...form,
      kapasitas: Number(form.kapasitas),
    });
    navigate("/sapi");
  };

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" type="button" onClick={() => navigate("/sapi")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">Tambah Kandang</h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}