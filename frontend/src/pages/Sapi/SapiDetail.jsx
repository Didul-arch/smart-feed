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
import {
  ArrowLeft,
  Edit2,
  Beef,
  CalendarDays,
  Weight,
  Tag,
  Home,
} from "lucide-react"; // Added more icons

// Helper function to calculate age
const calculateAge = (birthDateString, deathDateString) => {
  if (!birthDateString) return "-";
  const birthDate = new Date(birthDateString);
  const endDate = deathDateString ? new Date(deathDateString) : new Date();

  let years = endDate.getFullYear() - birthDate.getFullYear();
  let months = endDate.getMonth() - birthDate.getMonth();
  let days = endDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years} tahun ${months > 0 ? `${months} bulan` : ""}`;
  } else if (months > 0) {
    return `${months} bulan ${days > 0 ? `${days} hari` : ""}`;
  } else if (days > 0) {
    return `${days} hari`;
  } else {
    return "Baru lahir";
  }
};

const SapiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: sapi,
    loading,
    error,
  } = useFetchData(id ? `/sapi/${id}` : null);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        {/* Skeleton UI can be made more specific if needed */}
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
        <p className="text-destructive mb-4">
          {error?.message ||
            "Gagal memuat data sapi atau sapi tidak ditemukan."}
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
      </div>
    );
  }

  const age = calculateAge(sapi.tanggalLahir, sapi.tanggalKematian);

  const details = [
    { label: "ID Sapi", value: `#${sapi.id}`, icon: Tag },
    { label: "Jenis Sapi", value: sapi.jenis, icon: Beef },
    { label: "Bobot", value: `${sapi.bobot} kg`, icon: Weight },
    {
      label: "Kandang",
      value: sapi.kandang?.nama || "Belum ada info kandang",
      icon: Home,
    },
    {
      label: "Tanggal Lahir",
      value: sapi.tanggalLahir
        ? new Date(sapi.tanggalLahir).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "-",
      icon: CalendarDays,
    },
    { label: "Umur", value: age, icon: CalendarDays },
  ];

  if (sapi.tanggalKematian) {
    details.push({
      label: "Tanggal Kematian",
      value: new Date(sapi.tanggalKematian).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      icon: CalendarDays,
    });
  }

  const handleBackNavigation = () => {
    if (sapi.kandangId) {
      navigate(`/sapi/${sapi.kandangId}`); // Kembali ke list sapi per kandang
    } else {
      navigate("/sapi"); // Fallback ke daftar kandang
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" onClick={handleBackNavigation}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Sapi
      </Button>
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Beef className="text-primary h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="flex-grow">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                {sapi.jenis}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Detail lengkap untuk sapi #{sapi.id}
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="text-base sm:text-lg px-3 py-1.5 self-start sm:self-center"
            >
              {sapi.bobot} kg
            </Badge>
          </div>
        </CardHeader>

        {sapi.image && (
          <div className="w-full max-h-[60vh] p-2 bg-muted/30 flex items-center justify-center overflow-hidden rounded-md mx-auto aspect-[16/10] sm:aspect-video">
            <img
              src={sapi.image || "/placeholder-sapi.jpg"}
              alt={`Foto ${sapi.jenis}`}
              className="object-contain w-full h-full rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-sapi.jpg";
              }}
            />
          </div>
        )}
        {!sapi.image && (
          <div className="w-full max-h-[30vh] p-2 bg-muted/30 flex flex-col items-center justify-center overflow-hidden rounded-md mx-auto aspect-video text-muted-foreground">
            <ImageIcon size={64} className="mb-2" />
            <p>Gambar tidak tersedia</p>
          </div>
        )}

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Informasi Detail Sapi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex items-start space-x-3 p-3 bg-background rounded-lg border"
              >
                <detail.icon className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 p-6 bg-muted/30 rounded-b-lg">
          <Button asChild className="w-full sm:w-auto">
            <Link to={`/sapi/${id}/edit`}>
              <span className="flex items-center">
                <Edit2 className="w-4 h-4 mr-2" /> Edit Data
              </span>
            </Link>
          </Button>
          {/* Tombol kembali di footer tidak diperlukan lagi karena sudah ada di atas */}
          {/* <Button variant="outline" onClick={handleBackNavigation}>
            Kembali
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SapiDetail;
