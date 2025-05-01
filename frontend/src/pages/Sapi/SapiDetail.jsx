import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SapiDetail() {
  const { id } = useParams();
  const [sapi, setSapi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchSapi = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/sapi/${id}`);
        setSapi(response.data);
      } catch (err) {
        console.error('Error fetching sapi:', err);
        setError('Gagal mengambil data sapi');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSapi();
  }, [BASE_URL, id]);
  
  const handleDelete = async () => {
    if (confirm('Yakin ingin menghapus sapi ini?')) {
      try {
        await axios.delete(`${BASE_URL}/api/v1/sapi/${id}`);
        alert('Sapi berhasil dihapus');
        // Navigate back to kandang list
        navigate(`/sapi/kandang/${sapi.idKandang}`);
      } catch (err) {
        console.error('Error deleting sapi:', err);
        alert('Gagal menghapus sapi');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !sapi) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error || 'Sapi tidak ditemukan'}</p>
        <Link to="/sapi" className="text-blue-500 mt-4 block">
          Kembali ke daftar kandang
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="flex items-center mb-4 p-4">
        <Link to={`/sapi/kandang/${sapi.idKandang}`} className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-700">
          Detail Sapi
        </h1>
      </div>
      
      {/* Sapi Image */}
      <div className="mx-4 mb-4">
        <img 
          src={sapi.image || 'https://via.placeholder.com/400x300?text=Foto+Sapi'} 
          alt="Foto Sapi"
          className="w-full h-48 object-cover rounded-lg" 
        />
      </div>
      
      {/* Sapi Details */}
      <div className="mx-4 bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500">Jenis</h3>
          <p className="text-lg">{sapi.jenis}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500">Bobot</h3>
          <p className="text-lg">{sapi.bobot} kg</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500">Kandang</h3>
          <p className="text-lg">Kandang {sapi.idKandang}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500">Tanggal Lahir</h3>
          <p className="text-lg">{new Date(sapi.tanggalLahir).toLocaleDateString('id-ID')}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <Link 
            to={`/sapi/${id}/edit`} 
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-center font-medium"
          >
            Edit
          </Link>
          
          <button 
            onClick={handleDelete} 
            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium"
          >
            Hapus
          </button>
        </div>
      </div>
      
      {/* Feeding Schedule Section */}
      <div className="mx-4 mt-6">
        <h2 className="text-xl font-medium mb-3">Jadwal Makan</h2>
        {/* Implement jadwal makan component here */}
      </div>
    </div>
  );
}