import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Import Input

const BeriMakanModal = ({
  isOpen,
  onClose,
  sapi,
  pakanList,
  selectedSesi,
  onConfirm,
  loading,
}) => {
  const [selectedPakanId, setSelectedPakanId] = useState("");
  const [jumlahPakan, setJumlahPakan] = useState(""); // State untuk jumlah pakan

  useEffect(() => {
    // Reset state saat modal dibuka atau sapi berubah
    if (isOpen) {
      setSelectedPakanId("");
      setJumlahPakan(""); // Reset jumlah pakan juga
    }
  }, [isOpen, sapi]);

  const handleSubmit = () => {
    if (!selectedPakanId) {
      alert("Pilih pakan terlebih dahulu!");
      return;
    }
    if (!jumlahPakan || parseFloat(jumlahPakan) <= 0) { // Validasi jumlah pakan
      alert("Masukkan jumlah pakan yang valid (lebih dari 0)!");
      return;
    }
    onConfirm(sapi.id, selectedPakanId, parseFloat(jumlahPakan)); // Kirim jumlahPakan ke onConfirm
  };

  if (!sapi) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Beri Pakan - {sapi.jenis} (ID: {sapi.id})
          </DialogTitle>
          <DialogDescription>
            Pilih pakan dan masukkan jumlah untuk sesi {selectedSesi?.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pakan" className="text-right">
              Pakan
            </Label>
            <Select
              value={selectedPakanId}
              onValueChange={setSelectedPakanId}
              disabled={!pakanList || pakanList.length === 0}
            >
              <SelectTrigger id="pakan" className="col-span-3">
                <SelectValue placeholder="Pilih Pakan" />
              </SelectTrigger>
              <SelectContent>
                {pakanList && pakanList.length > 0 ? (
                  pakanList.map((pakan) => (
                    <SelectItem key={pakan.id} value={String(pakan.id)}>
                      {pakan.nama} (Stok: {pakan.banyakStok} kg)
                      {(pakan.pk !== null || pakan.tdn !== null) && (
                        <span className="text-xs text-muted-foreground ml-2">
                          | PK: {pakan.pk || '-'}% | TDN: {pakan.tdn || '-'}%
                        </span>
                      )}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="disabled" disabled>
                    Tidak ada pakan tersedia
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          {/* Input Jumlah Pakan */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jumlah" className="text-right">
              Jumlah (kg)
            </Label>
            <Input
              id="jumlah"
              type="number"
              value={jumlahPakan}
              onChange={(e) => setJumlahPakan(e.target.value)}
              className="col-span-3"
              placeholder="Contoh: 2.5"
              step="any" // Izinkan desimal
              min="0.01" // Minimal jumlah
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={loading || !selectedPakanId || !jumlahPakan}>
            {loading ? "Menyimpan..." : "Konfirmasi Beri Pakan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BeriMakanModal;