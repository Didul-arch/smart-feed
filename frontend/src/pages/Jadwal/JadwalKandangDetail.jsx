import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Untuk Pagi/Sore
import { ArrowLeft, Utensils, CheckCircle, XCircle } from "lucide-react";
import { useFetchData, useSubmitData } from "@/hooks/useAPI"; // Asumsi useSubmitData untuk POST
import BeriMakanModal from "./BeriMakanModal"; // Komponen modal yang akan dibuat

// Helper untuk format tanggal YYYY-MM-DD (jika belum ada di scope global)
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};


const JadwalKandangDetailPage = () => {
  const { kandangId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedDate = searchParams.get("date") || formatDateToYYYYMMDD(new Date());

  const [selectedSesi, setSelectedSesi] = useState("PAGI"); // PAGI atau SORE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSapiForModal, setSelectedSapiForModal] = useState(null);

  const {
    data: displayData,
    loading: loadingDisplay,
    error: errorDisplay,
    refresh: refreshDisplayData
  } = useFetchData(kandangId && selectedDate ? `/jadwal/kandang/${kandangId}/display?date=${selectedDate}` : null);

  const { data: pakanList, loading: loadingPakan, error: errorPakan } = useFetchData("/pakan");
  const { submitData, loading: submittingRecord, error: errorSubmittingRecord } = useSubmitData();

  const kandangInfo = displayData?.kandang;
  const sapiList = displayData?.sapiList || [];
  const hariIni = displayData?.hari;

  const handleBeriMakan = (sapi) => {
    setSelectedSapiForModal(sapi);
    setIsModalOpen(true);
  };

  // Modifikasi handleConfirmBeriMakan untuk menerima jumlahDiberikan
  const handleConfirmBeriMakan = async (sapiId, pakanDiberikanId, jumlahDiberikan) => {
    if (!pakanDiberikanId) {
      alert("Pilih pakan terlebih dahulu!");
      return;
    }
    if (!jumlahDiberikan || jumlahDiberikan <= 0) {
      alert("Jumlah pakan harus lebih dari 0!");
      return;
    }

    try {
      await submitData("/records", "POST", {
        sapiId: sapiId,
        pakanDiberikanId: Number(pakanDiberikanId),
        jumlahDiberikan: jumlahDiberikan, // Kirim jumlahDiberikan ke backend
        tanggalPemberian: selectedDate, // YYYY-MM-DD
        sesi: selectedSesi,
      });
      setIsModalOpen(false);
      setSelectedSapiForModal(null);
      refreshDisplayData(); // Refresh data setelah berhasil
      // Tambahkan notifikasi sukses jika perlu (misalnya dengan toast)
      alert("Pemberian pakan berhasil dicatat dan stok telah diperbarui!");
    } catch (err) {
      console.error("Gagal mencatat pemberian makan:", err);
      // Tampilkan error ke user, errorSubmittingRecord akan terisi oleh hook
      // Anda bisa menampilkan pesan error dari err.response.data.message jika ada
      const apiErrorMessage = err.response?.data?.message || "Terjadi kesalahan saat menyimpan data.";
      alert(`Gagal mencatat pemberian makan: ${apiErrorMessage}`);
    }
  };

  if (loadingDisplay || loadingPakan) return <div className="p-4 container mx-auto">Memuat data detail jadwal...</div>;
  if (errorDisplay) return <Alert variant="destructive" className="container mx-auto my-4"><AlertTitle>Error Memuat Data Kandang!</AlertTitle><AlertDescription>{errorDisplay}</AlertDescription></Alert>;
  if (errorPakan) return <Alert variant="destructive" className="container mx-auto my-4"><AlertTitle>Error Memuat Data Pakan!</AlertTitle><AlertDescription>{errorPakan}</AlertDescription></Alert>;
  if (!displayData && !loadingDisplay) return <Alert variant="warning" className="container mx-auto my-4"><AlertTitle>Data Tidak Ditemukan</AlertTitle><AlertDescription>Tidak ada data jadwal untuk kandang dan tanggal ini.</AlertDescription></Alert>;


  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" onClick={() => navigate("/jadwal")} className="mb-4">
        <ArrowLeft size={16} className="mr-2" /> Kembali ke Daftar Kandang
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Detail Jadwal Kandang: {kandangInfo?.nama || "Tidak Diketahui"}</CardTitle>
          <CardDescription>
            Tanggal: {new Date(selectedDate + "T00:00:00").toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} ({hariIni || "-"})
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={selectedSesi} onValueChange={setSelectedSesi} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="PAGI">Pagi</TabsTrigger>
          <TabsTrigger value="SORE">Sore</TabsTrigger>
        </TabsList>
      </Tabs>

      {errorSubmittingRecord && <Alert variant="destructive" className="my-4"><AlertTitle>Gagal Memberi Pakan!</AlertTitle><AlertDescription>{errorSubmittingRecord}</AlertDescription></Alert>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sapiList.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">Tidak ada sapi di kandang ini.</p>
        )}
        {sapiList.map((sapi) => {
          const statusMakan = selectedSesi === "PAGI" ? sapi.statusPagi : sapi.statusSore;
          const pakanDiberikan = selectedSesi === "PAGI" ? sapi.pakanPagiDiberikan : sapi.pakanSoreDiberikan;
          const sudahMakan = statusMakan === "Sudah Makan";

          return (
            <Card key={sapi.id}>
              <CardHeader>
                <CardTitle className="text-lg">{sapi.jenis || `Sapi ID: ${sapi.id}`}</CardTitle>
                <CardDescription>ID: {sapi.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-3">
                  {sudahMakan ? (
                    <CheckCircle className="text-green-500 mr-2" size={20} />
                  ) : (
                    <XCircle className="text-red-500 mr-2" size={20} />
                  )}
                  <p className={`font-semibold ${sudahMakan ? 'text-green-600' : 'text-red-600'}`}>
                    {statusMakan}
                  </p>
                </div>
                {sudahMakan && pakanDiberikan && (
                  <p className="text-sm text-muted-foreground">Pakan: {pakanDiberikan}</p>
                )}
                {!sudahMakan && (
                  <Button
                    className="w-full mt-2"
                    onClick={() => handleBeriMakan(sapi)}
                    disabled={submittingRecord}
                  >
                    <Utensils size={16} className="mr-2" />
                    Beri Pakan
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedSapiForModal && pakanList && (
        <BeriMakanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sapi={selectedSapiForModal}
          pakanList={pakanList}
          selectedSesi={selectedSesi}
          onConfirm={handleConfirmBeriMakan}
          loading={submittingRecord}
        />
      )}
    </div>
  );
};

export default JadwalKandangDetailPage;