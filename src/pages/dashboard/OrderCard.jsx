import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Chart from 'react-apexcharts';

const OrderCard = () => {
  return (
    <div 
      className="card border-0 text-white h-100 shadow overflow-hidden" 
      style={{ backgroundColor: '#1e88e5', borderRadius: '16px' }}
    >
      
      {/* Cercle décoratif en arrière-plan */}
      <div 
        className="position-absolute bg-white rounded-circle" 
        style={{ width: '150px', height: '150px', top: '-50px', right: '-50px', opacity: '0.1' }}
      ></div>

      <div className="card-body p-4 position-relative z-1 h-100 d-flex flex-column justify-content-end">
        
        {/* On utilise une Row Bootstrap pour diviser : Texte à gauche / Graph à droite */}
        <div className="row align-items-end w-100 m-0">
          
          {/* Colonne Gauche : Infos */}
          <div className="col-6 p-0">
            <div 
              className="d-flex align-items-center justify-content-center rounded mb-3" 
              style={{ width: '45px', height: '45px', backgroundColor: '#1565c0' }}
            >
              <ShoppingBag size={22} />
            </div>
            <h3 className="fw-bold mb-1">5</h3>
            <p className="mb-0 text-white-50 small">Notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;