import React from 'react';
import DemandeCard    from './DemandeCard';
import CalendarCard   from './CalendrierCard';
import SallesListCard from './SallesListCard';

const Dashboard = () => {
  return (
    <div className="dash-wrapper">
      {/* Ligne 1 : stat demandes */}
      <div className="dash-row mb-3">
        <DemandeCard />
      </div>

      {/* Ligne 2 : calendrier + salles */}
      <div className="dash-row gap-3">
        <CalendarCard />
        <SallesListCard />
      </div>
    </div>
  );
};

export default Dashboard;
