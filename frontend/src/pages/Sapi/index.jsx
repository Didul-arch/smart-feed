import { Link, useNavigate } from "react-router-dom";
import { useFetchData, useSubmitData } from "@/hooks/useAPI";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Beef, Eye, Plus, Pencil, Trash2 } from "lucide-react";

const Sapi = () => {
  const { data: kandangList, loading, error, refresh } = useFetchData("/kandang");
  const { submitData, loading: loadingDelete } = useSubmitData();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus sapi ini?")) {
      await submitData(`/sapi/${id}`, "DELETE");
      refresh();
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Kandang</h1>
        <Button asChild size="sm" variant="outline">
          <Link to="/sapi/add">
            <Plus className="w-4 h-4 mr-1" /> Tambah Sapi
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kandangList?.map((kandang) => (
          <Card key={kandang.id} className="overflow-hidden border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-bold">{kandang.nama}</CardTitle>
              </div>
              <CardDescription className="text-sm text-muted-foreground">
                Kandang ID: #{kandang.id}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-3">
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                    <Beef size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Sapi</p>
                    <p className="text-sm font-semibold">{kandang._count.sapi || 0} ekor</p>
                  </div>
                </div>
              </div>
              {/* List sapi di kandang */}
              <div className="mt-4 space-y-2">
                {kandang.sapi?.map((sapi) => (
                  <div
                    key={sapi.id}
                    className="flex items-center justify-between bg-muted/40 rounded px-2 py-1"
                  >
                    <div>
                      <span className="font-medium">{sapi.jenis}</span>
                      <span className="ml-2 text-xs text-muted-foreground">({sapi.bobot} kg)</span>
                    </div>
                    <div className="flex gap-1">
                      <Button asChild size="icon" variant="ghost">
                        <Link to={`/sapi/${sapi.id}`}>
                          <Eye size={16} />
                        </Link>
                      </Button>
                      <Button asChild size="icon" variant="ghost">
                        <Link to={`/sapi/${sapi.id}/edit`}>
                          <Pencil size={16} />
                        </Link>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(sapi.id)}
                        disabled={loadingDelete}
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
                {!kandang.sapi?.length && (
                  <div className="text-xs text-muted-foreground italic">Belum ada sapi di kandang ini</div>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:text-primary"
                asChild
              >
                <Link to={`/sapi/${kandang.id}`}>
                  <Eye size={16} />
                  <span>Lihat Detail Kandang</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {!kandangList?.length && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center bg-muted/40 rounded-lg">
            <Beef size={48} className="text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold">Belum Ada Kandang</h3>
            <p className="text-muted-foreground mt-2">
              Tambahkan kandang baru untuk mulai mengelola ternak sapi Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sapi;