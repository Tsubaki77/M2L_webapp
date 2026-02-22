import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  // 1. Je récupère l'URL de la page actuelle 
  const location = useLocation();

  // 2. Mon dico de correspondances : chemin fixe = titre de la page.
  // Si je veux ajouter une page pour la nav, j'ai juste à l'ajouter ici.
  const titles = {
    '/': 'Dashboard',
    '/demandes_en_attentes': 'Demandes en attente',
    '/mes_salles': 'Mes Salles',
    '/calendrier': 'Calendrier des réservations',
    '/chat': 'Chat',
    '/parametres': 'Paramètres'
  };

  // 3. Cherche si l'URL exacte est dans mon dico au-dessus
  let currentTitle = titles[location.pathname];

  // 4. Si c'est pas dedans (parce qu'il y a un ID dynamique, ex: /salles/5)
  if (!currentTitle) {
    // Si l'URL commence par /demandes/...
    if (location.pathname.startsWith('/demandes/')) {
      currentTitle = 'Détail de la demande'; 
    } 
    // Si l'URL commence par /salles/...
    else if (location.pathname.startsWith('/salles/')) {
      currentTitle = 'Détail de la salle'; 
    } 
    // Sécurité : si on arrive sur une page dont titles pas définis, on affiche juste M2L par défaut 
    else {
      currentTitle = 'M2L'; 
    }
  }

  return (
    <header 
      // sticky-top pour qu'il reste collé en haut quand on scroll
      // flex-shrink-0 pour qu'il ne s'écrase pas si le contenu est trop grand
      className="sticky-top d-flex flex-shrink-0 justify-content-between align-items-center px-4" 
      style={{ 
        height: '80px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 1020, // Je m'assure qu'il passe toujours PAR-DESSUS les autres éléments (j'abuse un peu)
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      
      {/* Titre dynamique selon la logique au-dessus */}
      <h1 className="fs-3 fw-bold mb-0 text-dark">
        {currentTitle}
      </h1>

      <div className="">
        <div className="d-flex align-items-center gap-3">
          
          <div 
            // Pastille du profil utilisateur 
            className="rounded-circle overflow-hidden border border-2 border-light d-flex align-items-center justify-content-center bg-secondary-subtle"
            style={{ width: '40px', height: '40px' }}
          >
            {/* TODO : Quand l'API sera branchée, remplacer "CG" par les initiales du user connecté */}
            <span className="text-dark fw-bold">CG</span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;