import { useParams, Link, useNavigate } from "react-router-dom";
import { useFetchData } from "@/hooks/useAPI";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Edit2, Beef } from "lucide-react";

const SapiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: sapi, loading, error } = useFetchData(`/sapi/${id}`);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/4 mb-2" />
        <Skeleton className="h-6 w-1/3 mb-2" />
      </div>
    );
  }

  if (error || !sapi) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-destructive mb-4">Gagal memuat data sapi.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" className="mb-4" asChild>
        <Link to="/sapi">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Sapi
        </Link>
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Beef className="text-primary" size={32} />
            <div>
              <CardTitle className="text-2xl">{sapi.jenis}</CardTitle>
              <CardDescription>ID Sapi: #{sapi.id}</CardDescription>
            </div>
            <Badge className="ml-auto">{sapi.bobot} kg</Badge>
          </div>
        </CardHeader>
        <div className="w-full h-64 bg-secondary/30 flex items-center justify-center overflow-hidden rounded-md">
          <img
            src={sapi.image ? `http://localhost:3000/uploads/${sapi.image}` : "/placeholder-sapi.jpg"}
            alt={sapi.jenis}
            className="object-cover w-full h-full"
            onError={e => (e.target.src = "/placeholder-sapi.jpg")}
          />
        </div>
        <CardContent className="p-6">
          <div className="mb-2">
            <span className="font-medium">Kandang:</span> {sapi.kandang?.nama || "-"}
          </div>
          <div className="mb-2">
            <span className="font-medium">Tanggal Lahir:</span>{" "}
            {sapi.tanggalLahir ? new Date(sapi.tanggalLahir).toLocaleDateString("id-ID") : "-"}
          </div>
          <div className="mb-2">
            <span className="font-medium">Tanggal Kematian:</span>{" "}
            {sapi.tanggalKematian ? new Date(sapi.tanggalKematian).toLocaleDateString("id-ID") : "-"}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button asChild>
            <Link to={`/sapi/${sapi.id}/edit`}>
              <Edit2 className="w-4 h-4 mr-2" /> Edit Data
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/sapi">Kembali</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SapiDetail;