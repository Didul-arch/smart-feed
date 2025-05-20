import { useFetchData } from '../../hooks/useAPI';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil } from 'lucide-react';

const SapiList = () => {
  const { kandangId } = useParams();
  const { data: kandang, loading, error } = useFetchData(`/kandang/${kandangId}`);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // filter sapi berdasarkan search
  const filteredSapi = kandang?.sapi?.filter(sapi =>
    sapi.jenis.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </Button>
          <h2 className="text-2xl font-bold">Daftar Sapi di {kandang?.nama}</h2>
        </div>
        <div className='flex gap-4 items-center'>
        <Button asChild size="sm" variant="secondary" className="ml-2">
          <Link to={`/kandang/${kandangId}/edit`}>
            <Pencil className="w-4 h-4 mr-1" /> Edit Kandang
          </Link>
        </Button>
        <Button asChild>
          <Link to="/sapi/add"><Plus className="w-4 h-4 mr-1" />Tambah Sapi</Link>
        </Button>
        </div>
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
            <CardHeader>
              <CardTitle>{sapi.jenis}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <Badge>{sapi.bobot} kg</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                ID: {sapi.id}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to={`/sapi/detail/${sapi.id}`}>Detail</Link>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <Link to={`/sapi/${sapi.id}/edit`}>Edit</Link>
              </Button>
            </CardFooter>
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