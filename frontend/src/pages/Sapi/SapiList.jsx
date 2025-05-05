import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetchData, useSubmitData } from "../../hooks/useAPI";

const SapiList = () => {
  const { kandangId } = useParams();
  const navigate = useNavigate();
  const { data: sapiList, loading, error, refresh } = useFetchData(`/sapi/kandang/${kandangId}`);
  const { data: kandang } = useFetchData(`/kandang/${kandangId}`);

  // For add/delete functionality
  const { submitData, loading: submitting } = useSubmitData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSapi, setNewSapi] = useState({
    nama: "",
    jenis: "",
    tanggal_lahir: "",
    berat: ""
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await submitData(`/sapi`, "POST", {
        ...newSapi,
        kandang_id: parseInt(kandangId),
        berat: parseFloat(newSapi.berat)
      });
      setShowAddForm(false);
      setNewSapi({ nama: "", jenis: "", tanggal_lahir: "", berat: "" });
      refresh();
    } catch (error) {
      console.error("Failed to add sapi:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sapi?")) {
      try {
        await submitData(`/sapi/${id}`, "DELETE");
        refresh();
      } catch (error) {
        console.error("Failed to delete sapi:", error);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {kandang ? `Sapi di ${kandang.nama}` : 'Daftar Sapi'}
        </h1>
        <button
          onClick={() => navigate('/sapi')}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showAddForm ? "Cancel" : "Add New Sapi"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="mb-6 p-4 border rounded">
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1">Nama</label>
              <input
                type="text"
                value={newSapi.nama}
                onChange={(e) => setNewSapi({ ...newSapi, nama: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Jenis</label>
              <input
                type="text"
                value={newSapi.jenis}
                onChange={(e) => setNewSapi({ ...newSapi, jenis: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Tanggal Lahir</label>
              <input
                type="date"
                value={newSapi.tanggal_lahir}
                onChange={(e) => setNewSapi({ ...newSapi, tanggal_lahir: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Berat (kg)</label>
              <input
                type="number"
                value={newSapi.berat}
                onChange={(e) => setNewSapi({ ...newSapi, berat: e.target.value })}
                className="w-full p-2 border rounded"
                step="0.1"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {submitting ? "Saving..." : "Save Sapi"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sapiList?.map((sapi) => (
          <div key={sapi.id} className="border rounded-lg p-4 flex justify-between">
            <div>
              <h3 className="font-semibold">{sapi.nama}</h3>
              <p className="text-sm text-gray-600">Jenis: {sapi.jenis}</p>
              <p className="text-sm text-gray-600">Berat: {sapi.berat} kg</p>
            </div>
            <div className="flex flex-col space-y-2">
              <Link
                to={`/sapi/detail/${sapi.id}`}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded text-center hover:bg-blue-600"
              >
                Detail
              </Link>
              <button
                onClick={() => handleDelete(sapi.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {!sapiList?.length && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Tidak ada sapi di kandang ini
          </div>
        )}
      </div>
    </div>
  );
};

export default SapiList;