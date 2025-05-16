import { useFetchData } from "@/hooks/useAPI";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const PakanList = () => {
  const { data: pakans, loading, error, refresh } = useFetchData("/pakan");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (pakans) {
      setFiltered(
        pakans.filter(
          (p) =>
            p.nama.toLowerCase().includes(search.toLowerCase()) ||
            p.jenis.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [pakans, search]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus pakan ini?")) {
      await fetch(`/api/v1/pakan/${id}`, { method: "DELETE" });
      refresh();
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Pakan</h1>
        <Button asChild>
          <Link to="/pakan/add">+ Tambah Pakan</Link>
        </Button>
      </div>
      <Input
        placeholder="Cari pakan..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pakan) => (
          <Card key={pakan.id}>
            <CardHeader>
              <CardTitle>{pakan.nama}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <Badge>{pakan.jenis}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Stok: <span className="font-semibold">{pakan.banyakStok}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Harga: Rp{pakan.harga?.toLocaleString("id-ID")}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to={`/pakan/${pakan.id}/edit`}>Edit</Link>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(pakan.id)}
              >
                Hapus
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Tidak ada pakan ditemukan
        </div>
      )}
    </div>
  );
};

export default PakanList;