import React from 'react';
import { Briefcase } from 'lucide-react';

const EarningCard = () => {
  return (
    <div 
      className="card border-0 text-white h-100 shadow overflow-hidden" 
      style={{ backgroundColor: '#5e35b1', borderRadius: '16px' }} // Couleur et coins ronds
    >
      
      {/* --- Cercles Décoratifs (Background) --- */}
      {/* Cercle 1 : Haut Droite */}
      <div 
        className="position-absolute bg-white rounded-circle" 
        style={{ width: '200px', height: '200px', top: '-80px', right: '-80px', opacity: '0.1' }}
      ></div>
      
      {/* Cercle 2 : Plus bas */}
      <div 
        className="position-absolute bg-white rounded-circle" 
        style={{ width: '140px', height: '140px', top: '30px', right: '-40px', opacity: '0.1' }}
      ></div>

      {/* --- Contenu de la carte --- */}
      <div className="card-body p-4 position-relative z-1 d-flex flex-column justify-content-between">
        
        {/* Icône dans son carré violet foncé */}
        <div className="mb-4">
          <div 
            className="d-flex align-items-center justify-content-center rounded" 
            style={{ width: '50px', height: '50px', backgroundColor: '#4527a0' }}
          >
            <Briefcase size={24} />
          </div>
        </div>

        {/* Textes */}
        <div>
          <h3 className="fw-bold mb-1">1</h3>
          <p className="mb-0 text-white-50">Demandes de réservations</p>
        </div>

      </div>
    </div>
  );
};

export default EarningCard;