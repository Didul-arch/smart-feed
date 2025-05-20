import { useNavigate, useSearchParams } from "react-router-dom"; // Tambahkan useSearchParams
import { useSubmitData } from "@/hooks/useAPI";
import SapiForm from "./SapiForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddSapi() {
  const { submitData, loading, error } = useSubmitData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Untuk membaca query params
  const kandangIdFromUrl = searchParams.get("kandangId");

  const handleSubmit = async (formData) => {
    const dataToSubmit = {
      ...formData,
      bobot: Number(formData.bobot),
      // Pastikan kandangId dikirim sebagai angka
      // Jika kandangIdFromUrl ada, gunakan itu, jika tidak, ambil dari form (untuk kasus tambah global)
      kandangId: kandangIdFromUrl ? Number(kandangIdFromUrl) : Number(formData.kandangId),
      // tanggalLahir sudah string YYYY-MM-DD dari form
      // tanggalKematian juga string YYYY-MM-DD atau null/undefined
    };

    try {
      const result = await submitData("/sapi", "POST", dataToSubmit);
      if (result) { // Asumsi submitData mengembalikan data jika sukses
        // Navigasi kembali ke daftar sapi di kandang yang relevan jika ada, atau ke daftar kandang umum
        if (kandangIdFromUrl) {
          navigate(`/sapi/${kandangIdFromUrl}`);
        } else {
          // Jika tidak ada kandangIdFromUrl, mungkin navigasi ke halaman utama sapi atau daftar kandang
          navigate("/sapi"); // Sesuaikan ini jika perlu (misalnya ke halaman daftar semua kandang)
        }
      }
    } catch (err) {
      // Error sudah ditangani oleh useSubmitData dan akan ada di variabel `error`
      console.error("Gagal menambah sapi:", err);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">Tambah Sapi Baru</h1>
      </div>
      <SapiForm
        onSubmit={handleSubmit}
        loading={loading}
        // Kirim kandangId dari URL dan tandai sebagai fixed jika ada
        initialKandangId={kandangIdFromUrl ? Number(kandangIdFromUrl) : undefined}
        isKandangIdFixed={!!kandangIdFromUrl}
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}