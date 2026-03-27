import React from 'react';
import { api } from '../utils/api';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Dumbbell, LogOut, ListTodo, Users } from 'lucide-react';

const Sidebar = () => {
  const isSuperAdmin = api.isSuperAdmin();

  const menuItems = [
    { name: 'Dashboard',        path: '/',                      icon: <LayoutDashboard size={22} /> },
    { name: 'Les Demandes',     path: '/demandes_en_attentes',  icon: <ListTodo size={22} /> },
    { name: 'Mes Salles',       path: '/mes_salles',            icon: <Dumbbell size={22} /> },
    { name: 'Calendrier',       path: '/calendrier',            icon: <CalendarDays size={22} /> },
    ...(isSuperAdmin ? [{ name: 'Gestionnaires', path: '/gestionnaires', icon: <Users size={22} /> }] : []),
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/assets/logo/Logo_M2L.svg" alt="logo M2L" className="sidebar-logo-img" />
        <span className="sidebar-logo-text">M2L</span>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-nav-label">MENU</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link--active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" title="Déconnexion" onClick={api.logout}>
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
