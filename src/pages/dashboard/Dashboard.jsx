import React from 'react';
import SallesCard from './SallesCard';
import NotifCard from './NotifCard';
import CalendarCard from './CalendrierCard';
import SallesListCard from './SallesListCard';

const Dashboard = () => {
  return (
    <div className="dashboard ">
      <div className="cards-container d-flex width-100 gap-4">
        <SallesCard />
        <NotifCard />
      </div>

      <div className='cards-container mt-4 d-flex width-100 gap-4'>
         <CalendarCard />
         <SallesListCard />
      </div>
    </div>
  );
};

export default Dashboard;