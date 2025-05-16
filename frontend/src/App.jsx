import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sapi from "./pages/Sapi";
// import Jadwal from "./pages/Jadwal";
import SapiList from "./pages/Sapi/SapiList";
import SapiDetail from "./pages/Sapi/SapiDetail";
import AddSapi from "./pages/Sapi/Add"
import EditSapi from "./pages/Sapi/Edit"
import PakanList from "@/pages/pakan";
import AddPakan from "@/pages/pakan/Add";
import EditPakan from "@/pages/pakan/Edit";

/**
 * ProtectedLayout:
 * Membungkus semua route yang butuh autentikasi dan layout utama.
 * ProtectedRoute -> Layout -> Outlet (child routes)
 */
function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout>
        <Outlet />
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
          <Route path="/" element={<Home />} />
          <Route path="/sapi" element={<Sapi />} />
          {/* <Route path="/jadwal" element={<Jadwal />} /> Tambahkan ini */}
          <Route path="/sapi/:kandangId" element={<SapiList />} />
          <Route path="/sapi/detail/:id" element={<SapiDetail />} />
          <Route path="/sapi/add" element={<AddSapi />} />
          <Route path="/sapi/:id/edit" element={<EditSapi />} />
          <Route path="/pakan" element={<PakanList />} />
          <Route path="/pakan/add" element={<AddPakan />} />
          <Route path="/pakan/:id/edit" element={<EditPakan />} />
        </Route>

        {/* Redirect jika route tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;