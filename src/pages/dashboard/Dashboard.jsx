import React from 'react';
import DemandeCard    from './DemandeCard';
import CalendarCard   from './CalendrierCard';
import SallesListCard from './SallesListCard';

// Page d'accueil : regroupe les 3 cartes principales du tableau de bord
const Dashboard = () => {
  return (
    <div className="dash-wrapper">

      {/* Ligne 1 : nombre de demandes en attente */}
      <div className="dash-row mb-3">
        <DemandeCard />
      </div>

      {/* Ligne 2 : mini calendrier + liste des salles */}
      <div className="dash-row gap-3">
        <CalendarCard />
        <SallesListCard />
      </div>

    </div>
  );
};

export default Dashboard;
