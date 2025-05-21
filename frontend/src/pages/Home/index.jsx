import React, { useState, useEffect, useMemo } from 'react';
import { useFetchData } from '@/hooks/useAPI';
import api from '@/services/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, ListChecks, PackageSearch, ArrowRight, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription} from "@/components/ui/alert";

// Helper untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

const LOW_STOCK_THRESHOLD = 10; // Definisikan batas stok rendah

const HomePage = () => {
  const [feedingSummary, setFeedingSummary] = useState({
    totalSapi: 0,
    fedPagi: 0,
    fedSore: 0,
    loading: true,
    error: null,
  });
  const [lowStockPakan, setLowStockPakan] = useState({
    items: [],
    loading: true,
    error: null,
  });

  const today = useMemo(() => formatDateToYYYYMMDD(new Date()), []);

  const { data: kandangListRaw, loading: loadingKandangInitial, error: errorKandangInitial } = useFetchData('/kandang');
  const { data: pakanListRaw, loading: loadingPakanInitial, error: errorPakanInitial } = useFetchData('/pakan');
  
  const kandangList = useMemo(() => Array.isArray(kandangListRaw) ? kandangListRaw : [], [kandangListRaw]);
  const pakanList = useMemo(() => Array.isArray(pakanListRaw) ? pakanListRaw : [], [pakanListRaw]);

  useEffect(() => {
    if (errorKandangInitial) {
      setFeedingSummary({ totalSapi: 0, fedPagi: 0, fedSore: 0, loading: false, error: "Gagal memuat daftar kandang untuk ringkasan pakan." });
      return;
    }
    if (loadingKandangInitial || kandangList.length === 0 && !errorKandangInitial) {
      // Jika masih loading kandang atau tidak ada kandang (dan tidak ada error), set loading true atau tunggu data
      setFeedingSummary(prev => ({ ...prev, loading: loadingKandangInitial || (kandangList.length === 0 && !errorKandangInitial) }));
      if (kandangList.length === 0 && !loadingKandangInitial && !errorKandangInitial) {
         setFeedingSummary({ totalSapi: 0, fedPagi: 0, fedSore: 0, loading: false, error: null }); // No kandang, so no summary
      }
      return;
    }

    setFeedingSummary(prev => ({ ...prev, loading: true, error: null }));
    // Idealnya, backend menyediakan satu endpoint untuk ringkasan ini.
    // Pendekatan saat ini (N+1 query) kurang efisien untuk banyak kandang.
    const fetchPromises = kandangList.map(kandang =>
      api.get(`/jadwal/kandang/${kandang.id}/display?date=${today}`)
        .then(response => response.data.data) // response.data dari axios, .data lagi dari struktur backend
        .catch(err => {
          console.error(`Error fetching display for kandang ${kandang.id} on ${today}:`, err);
          return null; 
        })
    );

    Promise.all(fetchPromises)
      .then(results => {
        let totalSapi = 0;
        let fedPagi = 0;
        let fedSore = 0;
        results.forEach(display => {
          if (display) {
            totalSapi += display.totalSapiDiKandang || 0;
            fedPagi += display.totalDiberiMakanPagi || 0;
            fedSore += display.totalDiberiMakanSore || 0;
          }
        });
        setFeedingSummary({ totalSapi, fedPagi, fedSore, loading: false, error: null });
      })
      .catch(err => {
        console.error("Error fetching all kandang display data:", err);
        setFeedingSummary({ totalSapi: 0, fedPagi: 0, fedSore: 0, loading: false, error: "Gagal memuat ringkasan pemberian pakan." });
      });
  }, [kandangList, today, loadingKandangInitial, errorKandangInitial]);

  useEffect(() => {
    if (errorPakanInitial) {
      setLowStockPakan({ items: [], loading: false, error: "Gagal memuat data pakan." });
      return;
    }
    if (loadingPakanInitial) {
      setLowStockPakan(prev => ({ ...prev, loading: true }));
      return;
    }
    
    if (pakanList.length > 0) {
      const lowItems = pakanList.filter(p => p.banyakStok < LOW_STOCK_THRESHOLD);
      setLowStockPakan({ items: lowItems, loading: false, error: null });
    } else if (!loadingPakanInitial && !errorPakanInitial) {
       setLowStockPakan({ items: [], loading: false, error: null }); // No pakan data
    }
  }, [pakanList, loadingPakanInitial, errorPakanInitial]);

  const pagiProgress = feedingSummary.totalSapi > 0 ? (feedingSummary.fedPagi / feedingSummary.totalSapi) * 100 : 0;
  const soreProgress = feedingSummary.totalSapi > 0 ? (feedingSummary.fedSore / feedingSummary.totalSapi) * 100 : 0;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard SmartFeed</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Status Pemberian Pakan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="text-primary" />
              Status Pemberian Pakan Hari Ini ({today})
            </CardTitle>
            <CardDescription>Ringkasan sapi yang telah diberi pakan hari ini.</CardDescription>
          </CardHeader>
          <CardContent>
            {feedingSummary.loading ? (
              <p>Memuat ringkasan...</p>
            ) : feedingSummary.error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{feedingSummary.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <p className="text-lg">Total Sapi: <span className="font-bold">{feedingSummary.totalSapi}</span> ekor</p>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Pakan Pagi</span>
                    <span>{feedingSummary.fedPagi} / {feedingSummary.totalSapi} Sapi</span>
                  </div>
                  <Progress value={pagiProgress} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Pakan Sore</span>
                    <span>{feedingSummary.fedSore} / {feedingSummary.totalSapi} Sapi</span>
                  </div>
                  <Progress value={soreProgress} className="w-full" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/jadwal">Lihat Detail Jadwal <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Card Stok Pakan Kritis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" />
              Stok Pakan Kritis
            </CardTitle>
            <CardDescription>Pakan dengan stok kurang dari {LOW_STOCK_THRESHOLD} unit.</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockPakan.loading ? (
              <p>Memuat stok pakan...</p>
            ) : lowStockPakan.error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{lowStockPakan.error}</AlertDescription>
              </Alert>
            ) : lowStockPakan.items.length > 0 ? (
              <ul className="space-y-2">
                {lowStockPakan.items.map(pakan => (
                  <li key={pakan.id} className="flex justify-between items-center text-sm">
                    <span>{pakan.nama} ({pakan.jenis})</span>
                    <span className="font-semibold text-destructive">{pakan.banyakStok} unit</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Semua stok pakan dalam kondisi aman.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/pakan">Kelola Stok Pakan <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Card Akses Cepat */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="text-primary" />
              Akses Cepat
            </CardTitle>
            <CardDescription>Tambah data baru dengan mudah.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/kandang/add">Tambah Kandang Baru</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              {/* Link ke /sapi/add. SapiForm akan menangani jika kandangId tidak ada dari URL */}
              <Link to="/sapi/add">Tambah Sapi Baru</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/pakan/add">Tambah Pakan Baru</Link>
            </Button>
             <Button asChild variant="ghost" className="justify-start">
              <Link to="/riwayat">Lihat Riwayat Pakan</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
      <p className="text-xs text-muted-foreground text-center mt-8">
        Catatan: Ringkasan pemberian pakan dihitung berdasarkan data semua kandang. Untuk performa optimal pada skala besar, disarankan menggunakan endpoint backend khusus untuk dashboard.
      </p>
    </div>
  );
};

export default HomePage;