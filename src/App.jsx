import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import './css/App.css';

import Sidebar from './components/SideBar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute'; 
import Dashboard from './pages/dashboard/Dashboard';
import ListeDemandes from './pages/reservation/ListeDemandes';
import DetailDemandeReservation from './pages/reservation/DetailDemandeReservation.jsx';
import MesSalles from './pages/salle/MesSalles.jsx';
import DetailSalles from './pages/salle/DetailSalles.jsx';
import CreerSalle from './pages/salle/CreationSalles.jsx';
import Login from './pages/login/Login.jsx';
import MdpOublie from './pages/login/MdpOublie.jsx';
import Calendrier from './pages/calendrier/Calendrier.jsx';

function App() {
  const location = useLocation();
  
  // On définit les pages "publiques"
  const isAuthPage = location.pathname === '/login' || location.pathname === '/forget-password';

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#eef2f6' }}>
      
      {!isAuthPage && <Sidebar />}
      
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: isAuthPage ? '0px' : '260px' }}>
        
        {!isAuthPage && <Header />}
        
        <main className="flex-grow-1 p-1" style={{ overflow: 'hidden' }}>
          <Routes>
            {/* --- ROUTES PUBLIQUES --- */}
            <Route path='/login' element={<Login />} />
            <Route path='/forget-password' element={<MdpOublie />} />

            {/* --- ROUTES PROTÉGÉES --- */}
            {/* On entoure chaque page privée par ProtectedRoute */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/demandes_en_attentes" element={<ProtectedRoute><ListeDemandes /></ProtectedRoute>} />
            <Route path="/demandes/:id" element={<ProtectedRoute><DetailDemandeReservation /></ProtectedRoute>} />
            <Route path="/mes_salles" element={<ProtectedRoute><MesSalles /></ProtectedRoute>} />
            <Route path="/salle/ajouter" element={<ProtectedRoute><CreerSalle /></ProtectedRoute>} />
            <Route path="/salles/:id" element={<ProtectedRoute><DetailSalles /></ProtectedRoute>} />
            <Route path="/calendrier" element={<ProtectedRoute><Calendrier /></ProtectedRoute>} />
            
            {/* Redirection automatique si l'URL est inconnue */}
            <Route path="*" element={<Navigate to="/" replace />} />           
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;