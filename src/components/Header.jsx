import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // On récupère l'URL actuelle

  // La liste simple : Chemin ->
  const titles = {
    '/': 'Dashboard',
    '/demandes_en_attentes': 'Demandes en attente',
    '/mes_salles': 'Mes Salles',
    '/calendrier': 'Calendrier',
    '/chat': 'Chat',
    '/parametres': 'Paramètres'
  };

  let currentTitle = titles[location.pathname];

  if (!currentTitle) {
    if (location.pathname.startsWith('/demandes/')) {
      currentTitle = 'Détail de la demande'; //Pour les routes du détail de la demande (comme /demandes/id)
    } 
    else if (location.pathname.startsWith('/salles/')) {
      currentTitle = 'Détail de la salle'; //Pour les routes du détail de la salle (comme /salles/id)
    } 
    else {
      currentTitle = 'M2L'; // Titre générique pour les autres routes non définies
    }
  }

  return (
    <header 
      className="sticky-top d-flex justify-content-between align-items-center px-4" 
      style={{ 
        height: '80px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 1020,
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      
      {/* Titre dynamique */}
      <h1 className="fs-3 fw-bold mb-0 text-dark">
        {currentTitle}
      </h1>

      <div className="">
        <div className="d-flex align-items-center gap-3">
          
          <div 
            className="rounded-circle overflow-hidden border border-2 border-light d-flex align-items-center justify-content-center bg-secondary-subtle"
            style={{ width: '40px', height: '40px' }}
          >
             {/* A remplacer par connexion à l'API (initial nom/prenom) */}
            <span className="text-dark fw-bold">CG</span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;