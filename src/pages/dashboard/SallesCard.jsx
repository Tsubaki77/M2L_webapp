import React from 'react';
import { Dumbbell } from 'lucide-react';

const SallesCard = () => {
  return (
    <div 
      className="card border-0 text-white shadow overflow-hidden position-relative" 
      style={{backgroundColor: '#CC4040', borderRadius: '16px', width: '50%', height: '200px' }} >
     
      {/* --- Décorations arrière-plan --- */}
      <div className="position-absolute bg-white rounded-circle" style={{ width: '200px', height: '200px', top: '-80px', right: '-80px', opacity: '0.1' }}></div>

      <div className="position-absolute bg-white rounded-circle" style={{ width: '140px', height: '140px', top: '30px', right: '-40px', opacity: '0.1' }}></div>

      {/* --- Contenu de la card --- */}
      <div className="card-body p-4 position-relative z-1 d-flex flex-column h-100">
        
        {/* Icône */}
        <div className="mb-1">
          <div 
            className="d-flex align-items-center justify-content-center rounded" 
            style={{ width: '50px', height: '50px', backgroundColor: '#800000' }}
          >
            <Dumbbell size={24} />
          </div>
        </div>

        {/* Textes */}  
        <div>
          <h3 className="fw-bold">1</h3>
          <p className="text-white-50">Demandes de réservations</p>
        </div>

      </div>
    </div>
  );
};

export default SallesCard;