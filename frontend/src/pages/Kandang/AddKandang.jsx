import { useNavigate, Link } from "react-router-dom";
import { useSubmitData } from "@/hooks/useAPI";
import KandangForm from "./KandangForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const initialValues = { nama: "", lokasi: "", kapasitas: "" };

export default function AddKandang() {
  const { submitData, loading, error } = useSubmitData();
  const navigate = useNavigate(); // useNavigate masih bisa dipertahankan jika diperlukan untuk submit

  const handleSubmit = async (form) => {
    try {
      await submitData("/kandang", "POST", {
        ...form,
        kapasitas: Number(form.kapasitas),
      });
      // Jika submitData berhasil, navigasi ke halaman daftar kandang
      navigate("/sapi");
    } catch (e) {
      // Jika terjadi error saat submitData, error tersebut akan ditangkap di sini
      // Pesan error juga sudah di-set di state `error` oleh hook `useSubmitData`
      // dan akan ditampilkan di UI.
      // Kita tambahkan console.error di sini untuk debugging lebih mudah.
      console.error("Gagal menambah kandang:", e.message || e);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        {/* Tombol Kembali yang sudah diubah sebelumnya */}
        <Button variant="ghost" asChild>
          <Link to="/sapi">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Tambah Kandang</h1>
      </div>
      <KandangForm
        initial={initialValues}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
