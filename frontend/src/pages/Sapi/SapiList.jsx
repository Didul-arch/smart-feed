import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function SapiList() {
  const { kandangId } = useParams();
  const [sapiList, setSapiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
  
  useEffect(() => {
    const fetchSapiInKandang = async () => {
      try {
        // Fetch semua sapi
        const response = await axios.get(`${BASE_URL}/api/v1/sapi`);
        
        // Filter sapi berdasarkan kandangId
        const filteredSapi = response.data.filter(sapi => 
          sapi.idKandang === kandangId
        );
        
        setSapiList(filteredSapi);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSapiInKandang();
  }, [BASE_URL, kandangId]);
  
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="flex items-center mb-4 p-4">
        <Link to="/sapi" className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-700">
          Kandang {kandangId}
        </h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading sapi...</p>
        </div>
      ) : sapiList.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
          <h2 className="text-xl font-medium mb-4">Belum ada sapi di kandang ini</h2>
          <p className="mb-4">Tambahkan sapi untuk mulai</p>
          
          {/* Add sapi button */}
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium">
            Tambah Sapi
          </button>
        </div>
      ) : (
        // List of sapi
        <div className="mx-4 space-y-3">
          {sapiList.map(sapi => (
            <Link to={`/sapi/${sapi.id}`} key={sapi.id}>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-800">{sapi.jenis}</h3>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm text-gray-500">Bobot: {sapi.bobot} kg</span>
                  <span className="text-sm text-gray-500">
                    {new Date(sapi.tanggalLahir).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Floating Action Button */}
      <button className="fixed right-6 bottom-6 bg-green-400 text-white rounded-full p-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
}