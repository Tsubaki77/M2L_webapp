import React from 'react';
import SallesCard from './SallesCard';
import NotifCard from './NotifCard';
import CalendarCard from './CalendrierCard';
import SallesListCard from './SallesListCard';

const Dashboard = () => {
  return (
    <div >
      <div className="cards-container d-flex width-100 gap-3">
        <SallesCard />
        <NotifCard />
      </div>

      <div className='cards-container mt-3 d-flex width-100 gap-3'>
         <CalendarCard />
         <SallesListCard />
      </div>
    </div>
  );
};

export default Dashboard;