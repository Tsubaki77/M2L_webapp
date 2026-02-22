import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, MessageSquareMore, Dumbbell, LogOut, ListTodo } from 'lucide-react';

const Sidebar = () => {
  // 1. Mon tableau de liens du menu
  // Si je veux ajouter un lien au menu, j'ai juste à l'ajouter ici
  // avec son nom, son URL (path) et son icône (de lucide-react).
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={24} /> },
    { name: 'Les Demandes', path: '/demandes_en_attentes', icon: <ListTodo size={24} /> },
    { name: 'Mes Salles', path: '/mes_salles', icon: <Dumbbell size={24} /> },
    { name: 'Calendrier', path: '/calendrier', icon: <CalendarDays size={24} /> },
    { name: 'Chat', path: '/chat', icon: <MessageSquareMore size={24} /> },
  ];

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
            // isActive = true -> Fond bordeaux, texte blanc
            // isActive = false -> Fond transparent, texte rouge M2L
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
        {/* Bouton Déconnexion (<button> normal car c'est pas une page, c'est une action) */}
        <button 
          title="Déconnexion"
          onClick={() => {
            // TODO : Ajouter la vraie fonction logout() ici (vider le token, rediriger vers /login, etc.)
            console.log('Déconnexion');
          }}
          className="bg-transparent border-0 p-0" 
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