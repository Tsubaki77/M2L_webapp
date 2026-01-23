import React from 'react';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import Dashboard from './pages/dashboard/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './index.css';




function App() {
  return (
    <div className="d-flex" style={{ backgroundColor: '#eef2f6', minHeight: '100vh' }}>
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '260px' }}>
        <Header />
        <main className="container-fluid p-4">
          <div className="row g-4">
            <Dashboard />
           
          
          </div >
        </main>
      </div>
    </div>
  );
}

export default App;