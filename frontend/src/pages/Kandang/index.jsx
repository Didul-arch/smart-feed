import { useFetchData } from "@/hooks/useAPI";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export default function KandangList() {
  const { data: kandangs, loading, error } = useFetchData("/kandang");
  const navigate = useNavigate();

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Kandang</h1>
        <Button asChild>
          <Link to="/kandang/add">
            <Plus className="w-4 h-4 mr-1" /> Tambah Kandang
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kandangs?.map((kandang) => (
          <Card key={kandang.id}>
            <CardHeader>
              <CardTitle>{kandang.nama}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-muted-foreground text-sm">
                Lokasi: {kandang.lokasi}
              </div>
              <div className="text-sm">
                Kapasitas: <span className="font-semibold">{kandang.kapasitas}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to={`/sapi/${kandang.id}`}>Lihat Sapi</Link>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <Link to={`/kandang/${kandang.id}/edit`}>
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {kandangs?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Tidak ada kandang ditemukan
        </div>
      )}
    </div>
  );
}