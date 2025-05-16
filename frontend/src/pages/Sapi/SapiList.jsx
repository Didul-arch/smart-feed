import { useFetchData } from '../../hooks/useAPI';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const SapiList = () => {
  const { data: kandangs, loading, error } = useFetchData('/kandang');
  const [search, setSearch] = useState('');
  const [filteredSapi, setFilteredSapi] = useState([]);

  useEffect(() => {
    if (kandangs) {
      const allSapi = kandangs.flatMap(k => 
        k.sapi.map(s => ({ ...s, kandangNama: k.nama }))
      );
      setFilteredSapi(
        allSapi.filter(s => s.jenis.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [kandangs, search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Sapi</h2>
        <Button asChild>
          <Link to="/sapi/add">Tambah Sapi</Link>
        </Button>
      </div>
      <Input
        placeholder="Cari sapi berdasarkan jenis..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSapi.map(sapi => (
          <Card key={sapi.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{sapi.jenis}</span>
                <Badge>{sapi.bobot} kg</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Kandang: {sapi.kandangNama}
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link to={`/sapi/detail/${sapi.id}`}>Detail</Link>
                </Button>
                <Button asChild size="sm" variant="secondary">
                  <Link to={`/sapi/${sapi.id}/edit`}>Edit</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredSapi.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Tidak ada sapi ditemukan
        </div>
      )}
    </div>
  );
};

export default SapiList;