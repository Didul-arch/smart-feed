import { useParams, useNavigate } from "react-router-dom";
import { useFetchData, useSubmitData } from "@/hooks/useAPI";
import SapiForm from "./SapiForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditSapi() {
  const { id } = useParams();
  const { data, loading: loadingData } = useFetchData(`/sapi/${id}`);
  const { submitData, loading, error } = useSubmitData();
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    await submitData(`/sapi/${id}`, "PATCH", form);
    navigate("/sapi");
  };

  if (loadingData) return <div className="p-4">Loading...</div>;
  if (!data) return <div className="p-4 text-red-500">Sapi tidak ditemukan</div>;

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" type="button" onClick={() => navigate("/sapi")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">Edit Sapi</h1>
      </div>
      <SapiForm initial={data} onSubmit={handleSubmit} loading={loading} />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}