import { useParams, useNavigate } from "react-router-dom"; // Link dihilangkan karena tidak dipakai langsung di Button
import { useFetchData, useSubmitData } from "@/hooks/useAPI";
import SapiForm from "./SapiForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function EditSapi() {
  const { id } = useParams();
  const {
    data: sapiData,
    loading: loadingData,
    error: fetchError,
  } = useFetchData(id ? `/sapi/${id}` : null);
  const {
    submitData,
    loading: submitting,
    error: submitError,
  } = useSubmitData();
  const navigate = useNavigate();

  const handleSubmit = async (formData, contentType = "json") => {
    try {
      let dataToUpdate;
      if (contentType === "multipart") {
        dataToUpdate = formData;
      } else {
        dataToUpdate = {
          ...formData,
          bobot: Number(formData.bobot),
        };
        // Tidak perlu menghapus kandangId karena SapiForm akan mengirimkannya jika ada perubahan
      }

      const result = await submitData(
        `/sapi/${id}`,
        "PUT",
        dataToUpdate,
        contentType
      );

      if (result) {
        navigate(`/sapi/detail/${id}`); // Tetap ke detail sapi setelah edit
      }
    } catch (err) {
      console.error("Gagal mengupdate sapi:", err);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Yakin ingin menghapus sapi ini? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      try {
        await submitData(`/sapi/${id}`, "DELETE");
        if (sapiData && sapiData.kandangId) {
          navigate(`/sapi/${sapiData.kandangId}`); // Arahkan ke list sapi berdasarkan kandang
        } else {
          navigate("/sapi"); // Fallback ke daftar kandang
        }
      } catch (err) {
        console.error("Gagal menghapus sapi:", err);
      }
    }
  };

  if (loadingData) return <div className="p-4">Memuat data sapi...</div>;
  if (fetchError || !sapiData) {
    return (
      <div className="p-4 text-destructive">
        Sapi tidak ditemukan atau gagal memuat.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          type="button"
          onClick={() =>
            navigate(
              sapiData.kandangId
                ? `/sapi/${sapiData.kandangId}` // Kembali ke list sapi per kandang
                : "/sapi" // Fallback ke daftar kandang
            )
          }
        >
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
        initial={sapiData}
        onSubmit={handleSubmit}
        loading={submitting}
        isEditMode={true}
        // initialKandangId dan isKandangIdFixed tidak diperlukan lagi di sini,
        // karena SapiForm akan menangani kandangId dari initial data
      />
      {submitError && (
        <div className="text-destructive mt-2">
          {submitError.message || "Terjadi kesalahan saat mengupdate sapi."}
        </div>
      )}
    </div>
  );
}
