import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SapiIndex() {
  const [kandangList, setKandangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchSapi = async () => {
      try {
        // Fetch semua sapi
        const response = await axios.get(`${BASE_URL}/api/v1/sapi`);

        // Group sapi by kandang
        const sapiByKandang = {};
        response.data.forEach(sapi => {
          const kandangId = sapi.idKandang || 'undefined';

          if (!sapiByKandang[kandangId]) {
            sapiByKandang[kandangId] = {
              id: kandangId,
              name: `Kandang ${kandangId}`,
              sapiCount: 0
            };
          }

          sapiByKandang[kandangId].sapiCount++;
        });

        setKandangList(Object.values(sapiByKandang));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSapi();
  }, [BASE_URL]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 px-4 pt-16">
      <h1 className="text-2xl text-gray-600 font-bold text-center mb-6">
        Daftar Kandang
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading kandang...</p>
        </div>
      ) : kandangList.length === 0 ? (
        // Empty state - ini sesuai desain figma
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
          <h2 className="text-3xl font-semibold text-center max-w-2xs">Tambahkan Kandang</h2>

          {/* Floating action button for empty state */}
          <div className="fixed bottom-6">
            <button className="bg-green-400 text-white rounded-full p-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        // List of kandang
        <>
          <div className="space-y-4 mb-16">
            {kandangList.map(kandang => (
              <Link to={`/sapi/kandang/${kandang.id}`} key={kandang.id}>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h2 className="text-xl text-gray-700 font-medium mb-3">
                    {kandang.name}
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <div className="h-2 w-2 rounded-full bg-blue-400 mr-2"></div>
                      <p>Jumlah Sapi: {kandang.sapiCount}</p>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <div className="h-2 w-2 rounded-full bg-blue-400 mr-2"></div>
                      <p>Terakhir Diberi Makan</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Floating action button */}
          <div className="fixed bottom-6 right-6">
            <button className="bg-green-400 text-white rounded-lg p-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}