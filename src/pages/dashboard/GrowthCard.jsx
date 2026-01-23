import React from 'react';
// Si tu veux mettre le vrai graphique plus tard, tu importeras Chart ici

const GrowthCard = () => {
  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
      <div className="card-body p-4">
        
        {/* En-tête : Titre et Dropdown */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
             <p className="text-muted small mb-1">Total Growth</p>
             <h3 className="fw-bold text-dark">$2,324.00</h3>
          </div>
          
          {/* Select stylisé Bootstrap */}
          <select 
            className="form-select form-select-sm border-0 bg-light text-secondary fw-medium shadow-none" 
            style={{ width: 'auto', cursor: 'pointer' }}
          >
              <option>Today</option>
              <option>This Month</option>
          </select>
        </div>
 
      </div>
    </div>
  );
};

export default GrowthCard;