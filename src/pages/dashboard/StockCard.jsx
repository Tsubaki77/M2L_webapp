import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const StockCard = () => {
  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
      <div className="card-body p-4">
        
        {/* En-tête */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold text-dark mb-0">Popular Stocks</h5>
          {/* Tu peux ajouter le bouton menu (...) ici si tu veux */}
        </div>

        {/* Liste verticale (remplace space-y-4) */}
        <div className="d-flex flex-column gap-3">
          
          {/* 1. Card violette interne */}
          <div className="p-3 rounded-3" style={{ backgroundColor: '#e8eaf6' }}>
             <div className="d-flex justify-content-between align-items-center mb-2">
                 <span className="fw-medium" style={{ color: '#4527a0' }}>Bajaj Finery</span>
                 <span className="fw-bold text-dark">$1839.00</span>
             </div>
             <p className="small mb-2" style={{ color: '#7986cb' }}>10% Profit</p>
             
             {/* Petit graphique placeholder */}
             <div className="rounded" style={{ height: '50px', backgroundColor: '#c5cae9' }}></div>
          </div>

          {/* 2. Item Liste (Vert / Profit) */}
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
             <div>
               <h6 className="fw-medium text-secondary mb-1">Bajaj Finery</h6>
               <span className="text-success small fw-medium">10% Profit</span>
             </div>
             <div className="text-end">
               <p className="fw-bold text-dark mb-0">$1839.00</p>
               <ChevronUp size={14} className="text-success" />
             </div>
          </div>
          
          {/* 3. Item Liste (Rouge / Loss) */}
          <div className="d-flex justify-content-between align-items-center py-2">
             <div>
               <h6 className="fw-medium text-secondary mb-1">TTML</h6>
               <span className="text-danger small fw-medium">10% Loss</span>
             </div>
             <div className="text-end">
               <p className="fw-bold text-dark mb-0">$100.00</p>
               <ChevronDown size={14} className="text-danger" />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StockCard;