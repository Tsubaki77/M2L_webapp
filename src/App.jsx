import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';

import Sidebar from './components/SideBar';
import Header from './components/Header';
import Dashboard from './pages/dashboard/Dashboard';
import ListeDemandes from './pages/reservation/ListeDemandes';
import DetailDemandeReservation from './pages/reservation/DetailDemandeReservation.jsx';
import MesSalles from './pages/salle/MesSalles.jsx';
import DetailSalles from './pages/salle/DetailSalles.jsx';
import CreerSalle from './pages/salle/CreationSalles.jsx';

function App() {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#eef2f6' }}>
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '260px' }}>
        <Header />
        {/* Main prend tout l'espace restant mais ne scroll pas lui-même */}
        <main className="flex-grow-1 p-1" style={{ overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/demandes_en_attentes" element={<ListeDemandes />} />
            <Route path="/demandes/:id" element={<DetailDemandeReservation />} />
            <Route path="/mes_salles" element={<MesSalles />} />
            <Route path="/salle/ajouter" element={<CreerSalle />} />
            <Route path="/salles/:id" element={<DetailSalles />} />
          
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;