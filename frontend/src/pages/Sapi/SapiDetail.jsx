import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchData, useSubmitData } from "../../hooks/useAPI";
import { useAuth } from "../../hooks/useAuth";

const SapiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: sapi, loading, error, refresh } = useFetchData(`/sapi/${id}`);
  const { submitData, loading: submitting } = useSubmitData();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    jenis: "",
    tanggal_lahir: "",
    berat: ""
  });

  // Start editing with current data
  const startEdit = () => {
    setFormData({
      nama: sapi.nama,
      jenis: sapi.jenis,
      tanggal_lahir: sapi.tanggal_lahir,
      berat: sapi.berat
    });
    setIsEditing(true);
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitData(`/sapi/${id}`, "PATCH", {
        ...formData,
        berat: parseFloat(formData.berat)
      });
      setIsEditing(false);
      refresh();
    } catch (error) {
      console.error("Failed to update sapi:", error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!sapi) return <div className="p-4">Sapi not found</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Sapi</h1>
        <button
          onClick={() => navigate(`/sapi/${sapi.kandang_id}`)}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1">Nama</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Jenis</label>
              <input
                type="text"
                value={formData.jenis}
                onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Tanggal Lahir</label>
              <input
                type="date"
                value={formData.tanggal_lahir}
                onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Berat (kg)</label>
              <input
                type="number"
                value={formData.berat}
                onChange={(e) => setFormData({ ...formData, berat: e.target.value })}
                className="w-full p-2 border rounded"
                step="0.1"
                required
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg border">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">{sapi.nama}</h2>
            <p className="text-gray-500 text-sm">ID: {sapi.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Jenis</p>
              <p className="font-semibold">{sapi.jenis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Berat</p>
              <p className="font-semibold">{sapi.berat} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tanggal Lahir</p>
              <p className="font-semibold">
                {new Date(sapi.tanggal_lahir).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Usia</p>
              <p className="font-semibold">
                {calculateAge(sapi.tanggal_lahir)} hari
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={startEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate age in days
function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  const diffTime = Math.abs(today - birthDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default SapiDetail;