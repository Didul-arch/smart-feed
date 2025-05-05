import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "@/hooks/useAPI";
import { useAuth } from "@/hooks/useAuth";

const Sapi = () => {
  const { isAuthenticated } = useAuth();
  const { data: kandangList, loading, error, refresh } = useFetchData("/kandang");

  // If you need user information
  const { currentUser } = useAuth();

  useEffect(() => {
    // You can use authentication data as needed
    if (isAuthenticated) {
      console.log("User is authenticated:", currentUser);
    }
  }, [isAuthenticated, currentUser]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Kandang</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {kandangList?.map((kandang) => (
          <Link
            key={kandang.id}
            to={`/sapi/${kandang.id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{kandang.nama}</h2>
            <p className="text-gray-600">Jumlah Sapi: {kandang.jumlahSapi || 0}</p>
          </Link>
        ))}

        {!kandangList?.length && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No kandang available
          </div>
        )}
      </div>

      <button
        onClick={refresh}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh
      </button>
    </div>
  );
};

export default Sapi;