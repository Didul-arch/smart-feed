import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Untuk pemilih tanggal
import { useFetchData } from "@/hooks/useAPI"; // Asumsi ada hook useAPI untuk POST/PATCH/DELETE
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, Eye } from "lucide-react";
import api from '@/services/api'; // <-- 1. Import instance api Anda

// Helper untuk format tanggal YYYY-MM-DD
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

const JadwalPage = () => {
  const [selectedDate, setSelectedDate] = useState(formatDateToYYYYMMDD(new Date()));
  const { data: kandangList, loading: loadingKandang, error: errorKandang } = useFetchData("/kandang");
  const [jadwalDisplayData, setJadwalDisplayData] = useState({}); // { kandangId: data }
  const [loadingDisplay, setLoadingDisplay] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(null);

  const navigate = useNavigate();

  const fetchJadwalDisplayForKandang = useCallback(async (kandangId, date) => {
    if (!kandangId || !date) return;
    try {
      // 2. Gunakan api.get() dan sesuaikan path
      // Jika VITE_BASE_URL sudah http://localhost:PORT_BACKEND/api/v1,
      // maka path di sini TIDAK perlu /api/v1 lagi.
      const path = `/jadwal/kandang/${kandangId}/display?date=${date}`;
      const response = await api.get(path);

      // Axios meletakkan data respons di dalam `response.data`
      // Backend Anda mengirim { message: "...", data: actualDisplayData }
      // Jadi, response.data.data adalah data yang Anda inginkan
      setJadwalDisplayData(prev => ({ ...prev, [kandangId]: response.data.data }));
    } catch (err) {
      // Axios error object biasanya memiliki err.response.data untuk payload error dari backend
      const errorMessage = err.response?.data?.message || err.message || `Gagal memuat jadwal display kandang ${kandangId}`;
      console.error(`Error fetching display for kandang ${kandangId} (${path}):`, errorMessage, err.response || err);
      setErrorDisplay(errorMessage);
    }
  }, []);

  useEffect(() => {
    if (kandangList && selectedDate) {
      setLoadingDisplay(true);
      setErrorDisplay(null);
      const promises = kandangList.map(kandang => fetchJadwalDisplayForKandang(kandang.id, selectedDate));
      Promise.all(promises).finally(() => setLoadingDisplay(false));
    }
  }, [kandangList, selectedDate, fetchJadwalDisplayForKandang]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setJadwalDisplayData({}); // Reset display data saat tanggal berubah
  };

  if (loadingKandang) return <div className="p-4 container mx-auto">Memuat daftar kandang...</div>;
  if (errorKandang) return <Alert variant="destructive" className="container mx-auto my-4"><AlertTitle>Error!</AlertTitle><AlertDescription>{errorKandang}</AlertDescription></Alert>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Jadwal Pemberian Pakan</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="jadwal-date" className="font-medium">Pilih Tanggal:</label>
          <Input
            type="date"
            id="jadwal-date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-auto"
          />
        </div>
      </div>

      {loadingDisplay && <div className="p-4 text-center">Memuat data jadwal untuk tanggal terpilih...</div>}
      {errorDisplay && <Alert variant="destructive" className="my-4"><AlertTitle>Error!</AlertTitle><AlertDescription>{errorDisplay}</AlertDescription></Alert>}

      {!kandangList || kandangList.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">Belum ada kandang terdaftar.</p>
          <Button asChild className="mt-4">
            <Link to="/kandang/add">Tambah Kandang Baru</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kandangList.map((kandang) => {
            const display = jadwalDisplayData[kandang.id];
            const totalSapi = display?.totalSapiDiKandang || 0;
            const pagiMakan = display?.totalDiberiMakanPagi || 0;
            const soreMakan = display?.totalDiberiMakanSore || 0;

            return (
              <Card key={kandang.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{kandang.nama}</CardTitle>
                  <CardDescription>{kandang.lokasi || "Lokasi tidak ditentukan"}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {display ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-1">
                        Hari: <span className="font-semibold">{display.hari || "-"}</span> ({totalSapi} Sapi)
                      </p>
                      <div className="space-y-1 text-sm">
                        <div>
                          Status Pagi: <span className="font-bold">{pagiMakan}</span> / {totalSapi} sapi telah makan
                        </div>
                        <div>
                          Status Sore: <span className="font-bold">{soreMakan}</span> / {totalSapi} sapi telah makan
                        </div>
                      </div>
                    </>
                  ) : loadingDisplay ? (
                    <p className="text-sm text-muted-foreground">Memuat status...</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Data jadwal tidak tersedia untuk tanggal ini.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/jadwal/kandang/${kandang.id}?date=${selectedDate}`)}
                    disabled={!display && !loadingDisplay}
                  >
                    <Eye size={16} className="mr-2" />
                    Lihat Detail & Beri Pakan
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JadwalPage;