import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sapi from "./pages/Sapi";
import SapiList from "./pages/Sapi/SapiList";
import SapiDetail from "./pages/Sapi/SapiDetail";

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
          <Route path="/sapi/:kandangId" element={<SapiList />} />
          <Route path="/sapi/detail/:id" element={<SapiDetail />} />
        </Route>

        {/* Redirect jika route tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;