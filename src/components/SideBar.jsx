import React from 'react';
import { api } from '../utils/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, MessageSquareMore, Dumbbell, LogOut, ListTodo } from 'lucide-react';

const Sidebar = () => {
  // 1. Mon tableau de liens du menu
  // Si je veux ajouter un lien au menu, j'ai juste à l'ajouter ici
  // avec son nom, son URL (path) et son icône (de lucide-react).
  const menuItems = [
<<<<<<< Updated upstream
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={24} /> },
    { name: 'Les Demandes', path: '/demandes_en_attentes', icon: <ListTodo size={24} /> },
    { name: 'Mes Salles', path: '/mes_salles', icon: <Dumbbell size={24} /> },
    { name: 'Calendrier', path: '/calendrier', icon: <CalendarDays size={24} /> },
    
=======
    { name: 'Dashboard',        path: '/',                      icon: <LayoutDashboard size={22} /> },
    { name: 'Les Demandes',     path: '/demandes_en_attentes',  icon: <ListTodo size={22} /> },
    { name: 'Mes Salles',       path: '/mes_salles',            icon: <Dumbbell size={22} /> },
    { name: 'Calendrier',       path: '/calendrier',            icon: <CalendarDays size={22} /> },
    // Afficher la page gestionnaires pour tous (=> plus simple en dev/test)
    { name: 'Gestionnaires',    path: '/gestionnaires',        icon: <Users size={22} /> },
>>>>>>> Stashed changes
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    // On appelle la fonction logout de notre fichier api.js
    api.logout();
    // La redirection se fera automatiquement via api.js ou tu peux ajouter :
    // navigate('/login');
  };

  return (
    <aside 
      // 2. Le conteneur de la sidebar
      // position-fixed et h-100 : la sidebar reste bloquée à gauche et prend toute la hauteur
      className="d-flex flex-column bg-white border-end position-fixed h-100" 
      style={{ width: '260px', zIndex: 1030, top: 0, left: 0 }}
    >
      
      {/* 3. Logo M2L */}
      <div className="d-flex flex-column align-items-center mt-2 px-4 gap-2" style={{ height: '80px' }}>
        <img style={{width: "5rem"}} src="/assets/logo/Logo_M2L.svg" alt="logo M2L" />
        <span className="fs-4 fw-bold text-dark">M2L</span>
      </div>
      
      {/* 4. Les liens du menu  */}
      <div className="p-3 mt-5 flex-grow-1 d-flex flex-column gap-2">
        <p className="px-3 fw-bold mb-1" style={{ fontSize: '1rem', color: '#848181' }}>MENU</p>
        
        {/* On boucle sur le tableau 'menuItems' pour générer les boutons automatiquement */}
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-decoration-none"
            
            // Le NavLink : Si l'URL actuelle correspond à 'item.path'
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

      {/* 5. Bas de la sidebar (Déconnexion) */}
      <div className="d-flex justify-content-between align-items-center px-4 mb-4">
        {/* Bouton Déconnexion */}
        <button 
          title="Déconnexion"
          onClick={() => {
            // On appelle la fonction qui vide le localStorage et redirige
            api.logout(); 
          }}
          className="bg-transparent border-0 p-0 logout-btn" 
          style={{
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            color: '#848181', 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#CC4040'} 
          onMouseLeave={(e) => e.currentTarget.style.color = '#848181'}
        >
          <LogOut size={24} />
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;