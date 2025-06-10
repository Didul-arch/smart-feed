import { useFetchData } from "../../hooks/useAPI";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, ImageIcon, Loader2 } from "lucide-react";

const SapiImage = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset state ketika src berubah
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

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
        className={`${className} bg-muted/30 flex items-center justify-center border rounded-md`}
      >
        <ImageIcon className="w-10 h-10 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      className={`${className} relative overflow-hidden rounded-md border bg-muted/10`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

const SapiList = () => {
  const { kandangId } = useParams();
  const {
    data: kandangData, // Ubah nama variabel agar lebih jelas (data kandang, bukan list sapi)
    loading,
    error,
    refresh,
  } = useFetchData(kandangId ? `/kandang/${kandangId}` : null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Ambil daftar sapi dari data kandang
  const sapiList = kandangData?.sapi || [];

  // Filter sapi berdasarkan search
  const filteredSapi = sapiList.filter((sapi) =>
    sapi.jenis.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-lg">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        Memuat data sapi...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-red-500">
        <p>Error: {error.message || "Gagal memuat data."}</p>
        <Button onClick={refresh} variant="outline" className="mt-4">
          Coba Lagi
        </Button>
      </div>
    );
  }

  const pageTitle = kandangData?.nama
    ? `Daftar Sapi di ${kandangData.nama}`
    : "Daftar Sapi";
  const pageDescription = kandangData?.nama
    ? `Total ${filteredSapi.length} sapi di kandang ini.`
    : `Total ${filteredSapi.length} sapi ditemukan.`;

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-start gap-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => navigate("/sapi")} // Kembali ke daftar kandang utama
              size="icon"
              className="shrink-0 mt-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold leading-tight break-words">
                {pageTitle}
              </h1>
              {kandangData && (
                <p className="text-sm text-muted-foreground break-words">
                  {pageDescription}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 sm:justify-end">
            {kandangId && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link
                  to={`/kandang/${kandangId}/edit`}
                  className="flex items-center justify-center"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Info Kandang
                </Link>
              </Button>
            )}
            <Button asChild size="sm" className="w-full sm:w-auto">
              <Link
                to={
                  kandangId ? `/sapi/add?kandangId=${kandangId}` : "/sapi/add"
                }
                className="flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Sapi Baru
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-6 w-full max-w-md">
          <Input
            placeholder="Cari sapi berdasarkan jenis atau ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {filteredSapi.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSapi.map((sapi) => (
              <Card
                key={sapi.id}
                className="flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out border"
              >
                <div className="p-4 pb-0">
                  <SapiImage
                    src={sapi.image}
                    alt={`Foto ${sapi.jenis}`}
                    className="w-full h-48 mb-3 aspect-video"
                  />
                </div>
                <CardHeader className="pb-2 pt-1">
                  <CardTitle className="text-lg font-semibold leading-tight break-words">
                    {sapi.jenis}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-3 space-y-1.5">
                  <Badge variant="secondary" className="text-sm font-normal">
                    Bobot: {sapi.bobot} kg
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    ID Sapi: {sapi.id}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4">
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-full"
                  >
                    <Link to={`/sapi/detail/${sapi.id}`}>
                      Lihat Detail Sapi
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-md border border-dashed">
            <ImageIcon className="w-16 h-16 text-muted-foreground/70 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {search ? "Sapi Tidak Ditemukan" : "Belum Ada Sapi"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {search
                ? `Tidak ada sapi yang cocok dengan pencarian "${search}". Coba kata kunci lain.`
                : kandangId
                ? "Belum ada sapi yang ditambahkan ke kandang ini."
                : "Belum ada data sapi di sistem."}
            </p>
            {!search && (
              <Button asChild size="sm">
                <Link
                  to={
                    kandangId ? `/sapi/add?kandangId=${kandangId}` : "/sapi/add"
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Sapi Pertama
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SapiList;
