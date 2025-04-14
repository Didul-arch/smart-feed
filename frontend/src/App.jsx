import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

// Pages
import Dashboard from './pages/Home'
import Login from './pages/Login'
import SapiList from './pages/Sapi/SapiList'
import SapiDetail from './pages/Sapi/SapiDetail'
import PakanList from './pages/Pakan/PakanList'
import JadwalPakan from './pages/Jadwal/JadwalPakan'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="sapi" element={<SapiList />} />
          <Route path="sapi/:id" element={<SapiDetail />} />
          <Route path="pakan" element={<PakanList />} />
          <Route path="jadwal" element={<JadwalPakan />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
