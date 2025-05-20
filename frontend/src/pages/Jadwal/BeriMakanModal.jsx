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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BeriMakanModal = ({ isOpen, onClose, sapi, pakanList, selectedSesi, onConfirm, loading }) => {
  const [selectedPakanId, setSelectedPakanId] = useState("");

  useEffect(() => {
    if (sapi && sapi.jadwalDefaultUntukHariIni && pakanList?.length > 0) {
      const jadwalDefault = sapi.jadwalDefaultUntukHariIni;
      const pakanDefaultNama = selectedSesi === "PAGI" ? jadwalDefault.pagiPakanDefault : jadwalDefault.sorePakanDefault;
      
      if (pakanDefaultNama) {
        const pakanDefaultObj = pakanList.find(p => p.nama === pakanDefaultNama);
        if (pakanDefaultObj) {
          setSelectedPakanId(String(pakanDefaultObj.id));
        } else {
          setSelectedPakanId(""); // Reset jika pakan default tidak ditemukan di list
        }
      } else {
        setSelectedPakanId(""); // Reset jika tidak ada pakan default untuk sesi ini
      }
    } else {
        setSelectedPakanId(""); // Reset jika tidak ada sapi atau pakan list
    }
  }, [sapi, pakanList, selectedSesi, isOpen]); // Tambahkan isOpen agar reset saat modal dibuka kembali

  if (!sapi) return null;

  const handleSubmit = () => {
    if (!selectedPakanId) {
        alert("Silakan pilih pakan terlebih dahulu.");
        return;
    }
    onConfirm(sapi.id, selectedPakanId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Beri Pakan Sapi</DialogTitle>
          <DialogDescription>
            Konfirmasi pemberian pakan untuk sapi: <strong>{sapi.jenis || `ID ${sapi.id}`}</strong> sesi <strong>{selectedSesi}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pakan-select" className="text-right">
              Pakan
            </Label>
            <Select 
              value={selectedPakanId} 
              onValueChange={setSelectedPakanId}
              disabled={!pakanList || pakanList.length === 0}
            >
              <SelectTrigger className="col-span-3" id="pakan-select">
                <SelectValue placeholder="Pilih Pakan" />
              </SelectTrigger>
              <SelectContent>
                {pakanList && pakanList.length > 0 ? (
                  pakanList.map((pakan) => (
                    <SelectItem key={pakan.id} value={String(pakan.id)}>
                      {pakan.nama} (Stok: {pakan.banyakStok})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="disabled" disabled>Tidak ada pakan tersedia</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={loading || !selectedPakanId}>
            {loading ? "Menyimpan..." : "Konfirmasi Beri Pakan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BeriMakanModal;