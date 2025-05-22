import { useParams, useNavigate, Link } from "react-router-dom"; // Tambahkan Link
import { useFetchData, useSubmitData } from "@/hooks/useAPI";
import SapiForm from "./SapiForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function EditSapi() {
  const { id } = useParams(); // ID Sapi
  const { data: sapiData, loading: loadingData, error: fetchError, refresh } = useFetchData(id ? `/sapi/${id}` : null);
  const { submitData, loading: submitting, error: submitError } = useSubmitData();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const dataToUpdate = {
      ...formData,
      bobot: Number(formData.bobot),
      // kandangId tidak perlu dikirim jika tidak diubah dan isKandangIdFixed true
    };
    // Hapus kandangId dari payload jika tidak diubah, agar tidak error jika backend tidak mengharapkannya
    if (sapiData && sapiData.kandangId && dataToUpdate.kandangId === sapiData.kandangId) {
      delete dataToUpdate.kandangId;
    }


    try {
      const result = await submitData(`/sapi/${id}`, "PATCH", dataToUpdate);
      if (result) {
        navigate(`/sapi/detail/${id}`); // Kembali ke detail sapi setelah update
      }
    } catch (err) {
      console.error("Gagal mengupdate sapi:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Yakin ingin menghapus sapi ini? Tindakan ini tidak dapat dibatalkan.")) {
      try {
        await submitData(`/sapi/${id}`, "DELETE");
        // Jika sapi ada di kandang tertentu, navigasi ke daftar sapi kandang itu
        // Jika tidak, navigasi ke halaman utama sapi/kandang
        if (sapiData && sapiData.kandangId) {
          navigate(`/sapi/${sapiData.kandangId}`);
        } else {
          navigate("/sapi"); // Fallback ke daftar kandang utama
        }
      } catch (err) {
        console.error("Gagal menghapus sapi:", err);
      }
    }
  };

  if (loadingData) return <div className="p-4">Memuat data sapi...</div>;
  if (fetchError || !sapiData) return <div className="p-4 text-red-500">Sapi tidak ditemukan atau gagal memuat.</div>;

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        {/* Tombol kembali bisa ke detail sapi atau list sapi di kandang */}
        <Button variant="ghost" type="button" onClick={() => navigate(sapiData.kandangId ? `/sapi/${sapiData.kandangId}` : '/sapi')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">Edit Sapi</h1>
        <Button
          variant="destructive"
          type="button"
          className="ml-auto"
          onClick={handleDelete}
          disabled={submitting}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Hapus Sapi
        </Button>
      </div>
      <SapiForm
        initial={sapiData} // Data sapi yang ada
        onSubmit={handleSubmit}
        loading={submitting}
        isEditMode={true}
        // kandangId dari data sapi yang ada, dan tandai sebagai fixed
        initialKandangId={sapiData.kandangId}
        isKandangIdFixed={true}
      />
      {submitError && <div className="text-red-500 mt-2">{submitError}</div>}
    </div>
  );
}