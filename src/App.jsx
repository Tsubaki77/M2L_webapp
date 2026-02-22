import React from 'react';
// 1. Ajoute useLocation à l'import
import { Routes, Route, useLocation } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import './css/App.css';

import Sidebar from './components/SideBar';
import Header from './components/Header';
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
  // 2. Récupère le chemin actuel
  const location = useLocation();
  
  // 3. Crée une variable qui vaut 'true' si on est sur la page login OU mot de passe oublié
  const isAuthPage = location.pathname === '/login' || location.pathname === '/forget-password';;

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#eef2f6' }}>
      
      {/* 4. Affiche la Sidebar UNIQUEMENT si on n'est PAS sur le login ou mot de passe oublié */}
      {!isAuthPage && <Sidebar />}
      
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: isAuthPage ? '0px' : '260px' }}>
        
        {/* 5. Affiche le Header UNIQUEMENT si on n'est PAS sur le login ou mot de passe oublié */}
        {!isAuthPage && <Header />}
        
        <main className="flex-grow-1 p-1" style={{ overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/demandes_en_attentes" element={<ListeDemandes />} />
            <Route path="/demandes/:id" element={<DetailDemandeReservation />} />
            <Route path="/mes_salles" element={<MesSalles />} />
            <Route path="/salle/ajouter" element={<CreerSalle />} />
            <Route path="/salles/:id" element={<DetailSalles />} />
            <Route path="/calendrier" element={<Calendrier />} />
            
            {/* Ta route Login */}
            <Route path='/login' element={<Login />} />
            <Route path='/forget-password' element={<MdpOublie />} />
            
            <Route path="*" element={<div className="text-center mt-5"><h2>Page non trouvée</h2></div>} />          
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;