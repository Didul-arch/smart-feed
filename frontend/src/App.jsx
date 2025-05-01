import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import SapiIndex from './pages/Sapi' // Ini jadi halaman Kandang List
import SapiList from './pages/Sapi/SapiList' // Ini jadi list sapi dalam kandang
import SapiDetail from './pages/Sapi/SapiDetail'
// import PakanList from './pages/Pakan/PakanList'
// import JadwalPakan from './pages/Jadwal/JadwalPakan'
// import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Sapi Routes - Updated */}
          <Route path="sapi" element={<SapiIndex />} /> {/* Kandang List */}
          <Route path="sapi/kandang/:kandangId" element={<SapiList />} /> {/* Sapi dalam kandang */}
          <Route path="sapi/:id" element={<SapiDetail />} /> {/* Detail sapi */}
          
          {/* Other Routes */}
          {/* <Route path="pakan" element={<PakanList />} />
          <Route path="jadwal" element={<JadwalPakan />} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App