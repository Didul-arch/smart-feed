import { useNavigate } from "react-router-dom";
import { useSubmitData } from "@/hooks/useAPI";
import PakanForm from "./PakanForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddPakan() {
  const { submitData, loading, error } = useSubmitData();
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    await submitData("/pakan", "POST", form);
    navigate("/pakan");
  };

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" type="button" onClick={() => navigate("/pakan")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">Tambah Pakan</h1>
      </div>
      <PakanForm onSubmit={handleSubmit} loading={loading} />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}