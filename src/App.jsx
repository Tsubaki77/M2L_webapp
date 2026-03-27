import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import Sidebar    from './components/SideBar';
import Header     from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard                from './pages/dashboard/Dashboard';
import ListeDemandes            from './pages/reservation/ListeDemandes';
import DetailDemandeReservation from './pages/reservation/DetailDemandeReservation.jsx';
import MesSalles                from './pages/salle/MesSalles.jsx';
import DetailSalles             from './pages/salle/detailsalle/DetailSalles.jsx';
import CreerSalle               from './pages/salle/creersalle/CreerSalle.jsx';
import ModifierSalle            from './pages/salle/modifiersalle/ModifierSalle.jsx';
import GestionnairesPage        from './pages/gestionnaires/GestionnairesPage.jsx';
import Login                    from './pages/login/Login.jsx';
import MdpOublie                from './pages/login/MdpOublie.jsx';
import Calendrier               from './pages/calendrier/Calendrier.jsx';

function App() {
  const location   = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/forget-password';

  return (
    <div className={`app-wrapper ${isAuthPage ? 'app-auth' : ''}`}>

      {!isAuthPage && <Sidebar />}

      <div className={`app-content ${isAuthPage ? '' : 'app-content-with-sidebar'}`}>

        {!isAuthPage && <Header />}

        <main className="app-main">
          <Routes>
            {/* ROUTES PUBLIQUES */}
            <Route path="/login"            element={<Login />} />
            <Route path="/forget-password"  element={<MdpOublie />} />

            {/* ROUTES PROTÉGÉES */}
            <Route path="/"                     element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/demandes_en_attentes"  element={<ProtectedRoute><ListeDemandes /></ProtectedRoute>} />
            <Route path="/demandes/:id"          element={<ProtectedRoute><DetailDemandeReservation /></ProtectedRoute>} />
            <Route path="/mes_salles"            element={<ProtectedRoute><MesSalles /></ProtectedRoute>} />
            <Route path="/salle/ajouter"         element={<ProtectedRoute><CreerSalle /></ProtectedRoute>} />
            <Route path="/salles/:id"            element={<ProtectedRoute><DetailSalles /></ProtectedRoute>} />
            <Route path="/salles/modifier/:id"   element={<ProtectedRoute><ModifierSalle /></ProtectedRoute>} />
            <Route path="/gestionnaires"         element={<ProtectedRoute><GestionnairesPage /></ProtectedRoute>} />
            <Route path="/calendrier"            element={<ProtectedRoute><Calendrier /></ProtectedRoute>} />

            {/* Redirection URL inconnue */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;
