import React from 'react';
import DemandeCard from './DemandeCard';
import NotifCard from './NotifCard';
import CalendarCard from './CalendrierCard';
import SallesListCard from './SallesListCard';
import Gestioncomptes from '../gestionnaires/GestionnairesPage';

const Dashboard = () => {
  return (
    <div >
      <div className="cards-container d-flex width-100 gap-3">
        <DemandeCard />
        <NotifCard />
      </div>

<<<<<<< Updated upstream
      <div className='cards-container mt-3 d-flex width-100 gap-3'>
         <CalendarCard />
         <SallesListCard />
=======
      {/* Ligne 2 : calendrier + salles + gestion des comptes */}
      <div className="dash-row gap-3">
        <CalendarCard />
        <SallesListCard />
        <Gestioncomptes />
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Dashboard;