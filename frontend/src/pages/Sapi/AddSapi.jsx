import { useNavigate, useSearchParams } from "react-router-dom";
import { useSubmitData } from "@/hooks/useAPI";
import SapiForm from "./SapiForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddSapi() {
  const { submitData, loading, error } = useSubmitData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const kandangIdFromUrl = searchParams.get("kandangId");

  const handleSubmit = async (formData, contentType = "json") => {
    try {
      let dataToSubmit;

      if (contentType === "multipart") {
        dataToSubmit = formData;
      } else {
        dataToSubmit = {
          ...formData,
          bobot: Number(formData.bobot),
          kandangId: kandangIdFromUrl
            ? Number(kandangIdFromUrl)
            : Number(formData.kandangId),
        };
      }

      const result = await submitData(
        "/sapi",
        "POST",
        dataToSubmit,
        contentType
      );

      if (result) {
        if (kandangIdFromUrl) {
          navigate(`/sapi/${kandangIdFromUrl}`); // Mengarahkan ke list sapi berdasarkan kandang
        } else {
          navigate("/sapi"); // Fallback jika tidak ada kandangId dari URL, arahkan ke daftar kandang
        }
      }
    } catch (err) {
      console.error("Gagal menambah sapi:", err);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          type="button"
          onClick={() =>
            kandangIdFromUrl
              ? navigate(`/sapi/${kandangIdFromUrl}`)
              : navigate("/sapi")
          }
        >
          {" "}
          {/* Mengarahkan ke list sapi atau daftar kandang */}
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">Tambah Sapi Baru</h1>
      </div>
      <SapiForm
        onSubmit={handleSubmit}
        loading={loading}
        initialKandangId={
          kandangIdFromUrl ? Number(kandangIdFromUrl) : undefined
        }
        isKandangIdFixed={!!kandangIdFromUrl}
      />
      {error && (
        <div className="text-destructive mt-2">
          {error.message || "Terjadi kesalahan saat menambah sapi."}
        </div>
      )}
    </div>
  );
}
