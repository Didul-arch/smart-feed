import { useState, useEffect, useMemo } from "react";
import { useFetchData } from "@/hooks/useAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { FilterIcon, RotateCcw } from "lucide-react";

const formatDateToYYYYMMDD = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "-";
  return new Date(dateTimeString).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
};

const ALL_KANDANG_VALUE = "_ALL_KANDANG_";
const ALL_SAPI_VALUE = "_ALL_SAPI_";
const ALL_SESI_VALUE = "_ALL_SESI_";

const RiwayatPemberianPakanPage = () => {
  const [filters, setFilters] = useState({
    tanggal: "", // 1. Default tanggal kosong untuk memuat semua data di awal
    kandangId: "",
    sapiId: "",
    sesi: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    // Hanya tambahkan parameter jika nilainya ada (tidak kosong)
    if (appliedFilters.tanggal) params.append("date", appliedFilters.tanggal);
    if (appliedFilters.kandangId) params.append("kandangId", appliedFilters.kandangId);
    if (appliedFilters.sapiId) params.append("sapiId", appliedFilters.sapiId);
    if (appliedFilters.sesi) params.append("sesi", appliedFilters.sesi);
    return params.toString();
  }, [appliedFilters]);

  // 2. Tentukan endpoint berdasarkan queryParams
  const endpoint = queryParams ? `/records?${queryParams}` : "/records";
  const { data: recordsDataFromHook, loading, error } = useFetchData(endpoint);

  const { data: kandangList, loading: loadingKandang } = useFetchData("/kandang");
  const { data: allSapiListFromHook, loading: loadingSapi } = useFetchData("/sapi");

  // 3. Akses data dengan aman, asumsikan recordsDataFromHook adalah array jika berhasil
  const records = Array.isArray(recordsDataFromHook) ? recordsDataFromHook : [];
  const allSapiList = Array.isArray(allSapiListFromHook) ? allSapiListFromHook : [];

  // console.log("Endpoint:", endpoint);
  // console.log("Raw recordsDataFromHook:", recordsDataFromHook);
  // console.log("Processed records:", records);


  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      if (name === "kandangId") {
        newFilters.sapiId = "";
      }
      return newFilters;
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    const initialFilters = {
      tanggal: "", // Reset tanggal ke kosong juga
      kandangId: "",
      sapiId: "",
      sesi: "",
    };
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  const sapiListForFilter = useMemo(() => {
    if (!allSapiList || allSapiList.length === 0) return [];
    if (filters.kandangId) {
      return allSapiList.filter(sapi => sapi.kandangId === parseInt(filters.kandangId));
    }
    return allSapiList;
  }, [allSapiList, filters.kandangId]);


  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Riwayat Pemberian Pakan</CardTitle>
          <CardDescription>Lihat dan filter catatan pemberian pakan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Perbaikan UI Filter */}
          <div className="flex flex-wrap gap-x-4 gap-y-3 items-end">
            <div className="flex-grow min-w-[180px] basis-full sm:basis-[calc(50%-0.5rem)] md:basis-auto">
              <Label htmlFor="filter-tanggal">Tanggal</Label>
              <Input
                id="filter-tanggal"
                type="date"
                value={filters.tanggal}
                onChange={(e) => handleFilterChange("tanggal", e.target.value)}
              />
            </div>
            <div className="flex-grow min-w-[180px] basis-full sm:basis-[calc(50%-0.5rem)] md:basis-auto">
              <Label htmlFor="filter-kandang">Kandang</Label>
              <Select
                value={filters.kandangId === "" ? ALL_KANDANG_VALUE : filters.kandangId}
                onValueChange={(selectedValue) => {
                  handleFilterChange("kandangId", selectedValue === ALL_KANDANG_VALUE ? "" : selectedValue);
                }}
                disabled={loadingKandang}
              >
                <SelectTrigger id="filter-kandang">
                  <SelectValue placeholder="Semua Kandang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_KANDANG_VALUE}>Semua Kandang</SelectItem>
                  {kandangList?.map(k => <SelectItem key={k.id} value={String(k.id)}>{k.nama}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-grow min-w-[180px] basis-full sm:basis-[calc(50%-0.5rem)] md:basis-auto">
              <Label htmlFor="filter-sapi">Sapi</Label>
              <Select
                value={filters.sapiId === "" ? ALL_SAPI_VALUE : filters.sapiId}
                onValueChange={(selectedValue) => {
                  handleFilterChange("sapiId", selectedValue === ALL_SAPI_VALUE ? "" : selectedValue);
                }}
                disabled={loadingSapi || (filters.kandangId !== "" && sapiListForFilter.length === 0 && !loadingKandang)}
              >
                <SelectTrigger id="filter-sapi">
                  <SelectValue placeholder="Semua Sapi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_SAPI_VALUE}>Semua Sapi</SelectItem>
                  {sapiListForFilter?.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.jenis} (ID: {s.id})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-grow min-w-[180px] basis-full sm:basis-[calc(50%-0.5rem)] md:basis-auto">
              <Label htmlFor="filter-sesi">Sesi</Label>
              <Select
                value={filters.sesi === "" ? ALL_SESI_VALUE : filters.sesi}
                onValueChange={(selectedValue) => {
                  handleFilterChange("sesi", selectedValue === ALL_SESI_VALUE ? "" : selectedValue);
                }}
              >
                <SelectTrigger id="filter-sesi">
                  <SelectValue placeholder="Semua Sesi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_SESI_VALUE}>Semua Sesi</SelectItem>
                  <SelectItem value="PAGI">Pagi</SelectItem>
                  <SelectItem value="SORE">Sore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2 sm:pt-0 w-full md:w-auto md:self-end">
              <Button onClick={handleApplyFilters} className="flex-1 md:flex-none">
                <FilterIcon size={16} className="mr-2" /> Filter
              </Button>
              <Button onClick={handleResetFilters} variant="outline" className="flex-1 md:flex-none">
                <RotateCcw size={16} className="mr-2" /> Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && <div className="text-center py-4">Memuat riwayat...</div>}
      {error && <Alert variant="destructive"><AlertTitle>Error Memuat Riwayat!</AlertTitle><AlertDescription>{error.message || error}</AlertDescription></Alert>}

      {!loading && !error && records.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          Tidak ada riwayat pemberian pakan yang cocok dengan filter Anda atau belum ada data riwayat.
        </div>
      )}

      {!loading && !error && records.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Waktu Aktual</TableHead>
              <TableHead>Sapi</TableHead>
              <TableHead>Kandang</TableHead>
              <TableHead>Pakan Diberikan</TableHead>
              <TableHead>Jumlah Diberikan</TableHead>
              <TableHead>Sesi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{formatDateToYYYYMMDD(record.tanggalPemberian)}</TableCell>
                <TableCell>{formatDateTime(record.waktuPemberianActual)}</TableCell>
                <TableCell>{record.sapi?.jenis || `ID: ${record.sapiId}`}</TableCell>
                <TableCell>{kandangList?.find(k => k.id === record.kandangId)?.nama || `ID: ${record.kandangId}`}</TableCell>
                <TableCell>{record.pakanDiberikan?.nama || `ID: ${record.pakanDiberikanId}`}</TableCell>
                <TableCell>{record.jumlahDiberikan + " Kg" || "tidak ada riwayat"}</TableCell>
                <TableCell>{record.sesi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RiwayatPemberianPakanPage;