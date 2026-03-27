import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../utils/api';

const TITLES = {
  '/':                      'Dashboard',
  '/demandes_en_attentes':  'Demandes en attente',
  '/mes_salles':            'Mes Salles',
  '/calendrier':            'Calendrier',
  '/gestionnaires':         'Gestion des Gestionnaires',
  '/salle/ajouter':         'Ajouter une salle',
};

const getTitle = (pathname) => {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith('/demandes/'))     return 'Détail de la demande';
  if (pathname.startsWith('/salles/modifier/')) return 'Modifier la salle';
  if (pathname.startsWith('/salles/'))       return 'Détail de la salle';
  return 'M2L';
};

const Header = () => {
  const location = useLocation();
  const user = api.getUser();
  const isSuperAdmin = api.isSuperAdmin();
  const [gestionnaire, setGestionnaire] = useState(null);

  useEffect(() => {
    api.getMe()
      .then(setGestionnaire)
      .catch(() => null);
  }, []);

  const initiales = gestionnaire
    ? `${gestionnaire.nom?.charAt(0) ?? ''}${gestionnaire.prenom?.charAt(0) ?? ''}`.toUpperCase()
    : user?.identifiant?.slice(0, 2).toUpperCase() ?? '??';

  const displayName = gestionnaire
    ? `${gestionnaire.prenom} ${gestionnaire.nom}`
    : user?.identifiant ?? '';

  return (
    <header className="app-header">
      <h1 className="app-header-title">{getTitle(location.pathname)}</h1>

      <div className="app-header-user">
        {isSuperAdmin && (
          <span className="badge bg-m2l-dark text-white px-3 py-2 rounded-pill">Super Admin</span>
        )}
        <div className="app-header-avatar" title={displayName}>
          {initiales}
        </div>
      </div>
    </header>
  );
};

export default Header;
