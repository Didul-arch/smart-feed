import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sapi from "./pages/Sapi";
import SapiList from "./pages/Sapi/SapiList";
import SapiDetail from "./pages/Sapi/SapiDetail";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/sapi" element={
          <ProtectedRoute>
            <Layout>
              <Sapi />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/sapi/:kandangId" element={
          <ProtectedRoute>
            <Layout>
              <SapiList />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/sapi/detail/:id" element={
          <ProtectedRoute>
            <Layout>
              <SapiDetail />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;