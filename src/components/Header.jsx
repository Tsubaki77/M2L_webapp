import React from 'react';
import { useLocation } from 'react-router-dom'; // 1. On importe le hook
import { Bell, Settings, Menu } from 'lucide-react';

const Header = () => {
  const location = useLocation(); // 2. On récupère l'URL actuelle

  // 3. La liste simple : Chemin -> Titre
  const titles = {
    '/': 'Dashboard',
    '/demandes_en_attentes': 'Demandes en attente',
    '/salles': 'Mes Salles',
    '/calendrier': 'Calendrier',
    '/chat': 'Chat',
    '/parametres': 'Paramètres'
  };

  // 1. On tente d'abord la correspondance exacte (ex: /calendrier)
  let currentTitle = titles[location.pathname];

  // 2. Si pas trouvé, on vérifie les routes dynamiques (ex: /demandes/12)
  if (!currentTitle) {
    if (location.pathname.startsWith('/demandes/')) {
      currentTitle = 'Détail de la demande';
    } 
    else if (location.pathname.startsWith('/salles/')) {
      currentTitle = 'Détail de la salle'; // (Optionnel, pour plus tard)
    } 
    else {
      currentTitle = 'M2L'; // Titre par défaut si rien ne matche
    }
  }

  return (
    <header 
      // J'ai ajouté 'd-flex justify-content-between align-items-center' pour bien aligner le tout
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
             {/* A remplacer par connexion à l'API */}
             <img 
               src="" 
               alt="Profile" 
               style={{ width: '100%', height: '100%', objectFit: 'cover'}} 
             />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;