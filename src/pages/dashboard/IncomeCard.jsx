import React from 'react';
import { Archive } from 'lucide-react';

const IncomeCard = () => {
  return (
    <div 
      className="card border-0 shadow overflow-hidden h-100 d-flex flex-column" 
      style={{ borderRadius: '16px' }}
    >
      
      {/* --- Partie HAUTE (Bleu Foncé) --- */}
      <div className="p-4 position-relative overflow-hidden" style={{ backgroundColor: '#1e88e5' }}>
        
        {/* Cercle décoratif */}
        <div 
          className="position-absolute bg-white rounded-circle" 
          style={{ width: '130px', height: '130px', top: '-25px', right: '-25px', opacity: '0.1' }}
        ></div>

        {/* Contenu Haut */}
        <div className="d-flex justify-content-between align-items-start position-relative z-1 text-white">
          <div>
            <h3 className="fw-bold mb-1">$203k</h3>
            <p className="mb-0 text-white-50 small">Total Income</p>
          </div>
          <div 
            className="d-flex align-items-center justify-content-center rounded" 
            style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Archive size={20} />
          </div>
        </div>
      </div>
      
      {/* --- Partie BASSE (Blanche / Jaune) --- */}
      <div className="p-4 bg-white flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h3 className="fw-bold mb-1 text-dark">$203k</h3>
            <p className="mb-0 text-muted small">Total Income</p>
          </div>
          
          {/* Icône Jaune (On utilise bg-warning-subtle de Bootstrap ou une couleur custom) */}
          <div 
            className="d-flex align-items-center justify-content-center rounded" 
            style={{ width: '40px', height: '40px', backgroundColor: '#fff8e1', color: '#ffc107' }}
          >
            <Archive size={20} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default IncomeCard;