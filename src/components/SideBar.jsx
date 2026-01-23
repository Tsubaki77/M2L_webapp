import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, MessageSquareMore, Dumbbell, Bolt, LogOut } from 'lucide-react';

//Les path à changer si nécessaire en fonction de ce qui est défini dans le routeur 
const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={24} /> },
    { name: 'Mes Salles', path: '/salles', icon: <Dumbbell size={24} /> },
    { name: 'Calendrier', path: '/calendrier', icon: <CalendarDays size={24} /> },
    { name: 'Chat', path: '/chat', icon: <MessageSquareMore size={24} /> },
  ];


  return (
    <aside 
      className="d-flex flex-column bg-white border-end position-fixed h-100" 
      style={{ width: '260px', zIndex: 1030, top: 0, left: 0 }}
    >
      
      {/* --- Logo --- */}
      <div className="d-flex flex-column align-items-center mt-2 px-4 gap-2" style={{ height: '80px' }}>
        <img style={{width: "5rem"}} src="/assets/logo/Logo_M2L.svg" alt="logo M2L" />
        <span className="fs-4 fw-bold text-dark">M2L</span>
      </div>
      
      {/* --- Menu Principal --- */}
      <div className="p-3 mt-5 flex-grow-1 d-flex flex-column gap-2">
        <p className="px-3 fw-bold mb-1" style={{ fontSize: '1rem', color: '#848181' }}>MENU</p>
        
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-decoration-none"
            style={({ isActive }) => ({
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: isActive ? '#430000' : 'transparent',
              color: isActive ? 'white' : '#CC4040',
            })}
          >
            {item.icon}
            <span style={{ fontSize: '0.875rem' }}>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* --- BAS DE PAGE --- */}
      <div className="d-flex justify-content-between align-items-center px-4 mb-4">
      
        <NavLink 
          to="/parametres" 
          title="Paramètres"
          style={({ isActive }) => ({
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            color: isActive ? '#430000' : '#848181', 
          })}
        >
          <Bolt size={24} />
        </NavLink>

        <button 
          title="Déconnexion"
          onClick={() => {
            // A remplacer par la logique de déconnexion
            console.log('Déconnexion');
          }}
          className="bg-transparent border-0 p-0" // Pour enlever le style par défaut du bouton
          style={{
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            color: '#848181', 
          }}
        >
          <LogOut size={24} />
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;