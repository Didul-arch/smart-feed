import { useFetchData } from "@/hooks/useAPI";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { ImageIcon } from "lucide-react"; // Ditambahkan

// Komponen untuk menampilkan gambar pakan dengan fallback dan loading state
const PakanImageDisplay = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError || !src) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center border rounded-md`}
      >
        <ImageIcon className="w-full h-full p-1 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden rounded-md border`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

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
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pakan) => (
          <Card key={pakan.id} className="relative overflow-hidden">
            {" "}
            {/* Ditambahkan className relative dan overflow-hidden */}
            <PakanImageDisplay
              src={pakan.image} // Diasumsikan pakan memiliki field 'image'
              alt={pakan.nama}
              className="absolute top-2 right-2 w-14 h-14 rounded object-cover border" // Style untuk gambar kecil
            />
            <CardHeader className="pr-20">
              {" "}
              {/* Ditambahkan padding kanan untuk header */}
              <CardTitle>{pakan.nama}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {pakan.jenis}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div>
                Stok:{" "}
                <span className="font-semibold">{pakan.banyakStok} kg</span>
              </div>
              <div>
                Harga:{" "}
                <span className="font-semibold">
                  Rp{pakan.harga?.toLocaleString("id-ID") || 0}
                </span>
              </div>
              {/* Tampilkan Info Nutrisi */}
              <div className="pt-2 border-t mt-2">
                <h4 className="font-medium mb-1 text-xs text-muted-foreground">
                  Kandungan Nutrisi:
                </h4>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  {pakan.bk !== null && pakan.bk !== undefined && (
                    <li>BK: {pakan.bk}%</li>
                  )}
                  {pakan.pk !== null && pakan.pk !== undefined && (
                    <li>PK: {pakan.pk}%</li>
                  )}
                  {pakan.sk !== null && pakan.sk !== undefined && (
                    <li>SK: {pakan.sk}%</li>
                  )}
                  {pakan.tdn !== null && pakan.tdn !== undefined && (
                    <li>TDN: {pakan.tdn}%</li>
                  )}
                  {pakan.ca !== null && pakan.ca !== undefined && (
                    <li>Ca: {pakan.ca}%</li>
                  )}
                  {pakan.p !== null && pakan.p !== undefined && (
                    <li>P: {pakan.p}%</li>
                  )}
                </ul>
                {(pakan.bk === null || pakan.bk === undefined) &&
                  (pakan.pk === null || pakan.pk === undefined) && ( // Cek jika semua nutrisi kosong
                    <p className="text-xs text-muted-foreground italic">
                      Info nutrisi belum tersedia.
                    </p>
                  )}
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
