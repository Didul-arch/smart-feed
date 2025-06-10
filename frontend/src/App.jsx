import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";

// Kandang
import Kandang from "./pages/Kandang";
import AddKandang from "./pages/Kandang/AddKandang";
import EditKandang from "./pages/Kandang/EditKandang";

// Sapi
import SapiList from "./pages/Sapi";
import SapiDetail from "./pages/Sapi/SapiDetail";
import AddSapi from "./pages/Sapi/AddSapi";
import EditSapi from "./pages/Sapi/Edit";

// Pakan
import Pakan from "./pages/Pakan";
import AddPakan from "./pages/Pakan/Add";
import EditPakan from "./pages/Pakan/Edit";

// Jadwal (jika nanti diaktifkan)
import JadwalPage from "./pages/Jadwal";
import JadwalKandangDetailPage from "./pages/Jadwal/JadwalKandangDetail";

import RiwayatPemberianPakan from "./pages/Riwayat";

function ProtectedLayout() {
  const location = useLocation(); // Tambahkan ini
  return (
    <ProtectedRoute>
      <Layout>
        <Outlet key={location.pathname} /> {/* Tambahkan key di sini */}
      </Layout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Route login (tanpa proteksi) */}
        <Route path="/login" element={<Login />} />

        {/* Semua route di bawah ini butuh autentikasi dan layout */}
        <Route element={<ProtectedLayout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* KANDANG */}
          <Route path="/sapi" element={<Kandang />} />
          <Route path="/kandang/add" element={<AddKandang />} />
          <Route path="/kandang/:kandangId/edit" element={<EditKandang />} />

          {/* SAPI */}
          <Route path="/sapi/:kandangId" element={<SapiList />} />
          <Route path="/sapi/detail/:id" element={<SapiDetail />} />
          <Route path="/sapi/add" element={<AddSapi />} />
          <Route path="/sapi/:id/edit" element={<EditSapi />} />

          {/* PAKAN */}
          <Route path="/pakan" element={<Pakan />} />
          <Route path="/pakan/add" element={<AddPakan />} />
          <Route path="/pakan/:id/edit" element={<EditPakan />} />

          {/* Jadwal */}
          <Route path="/jadwal" element={<JadwalPage />} />
          <Route
            path="/jadwal/kandang/:kandangId"
            element={<JadwalKandangDetailPage />}
          />

          {/* Riwayat Pemberian Pakan */}
          <Route path="/riwayat" element={<RiwayatPemberianPakan />} />
        </Route>

        {/* Redirect jika route tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
