import React from 'react';
import { ListTodo } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const SallesCard = () => {
  const navigate = useNavigate(); 
  
  return (
    <div 
      className="card border-0 shadow text-white overflow-hidden position-relative" 
      style={{backgroundColor: '#CC4040', borderRadius: '16px', width: '50%', height: '200px', cursor: 'pointer' }} onClick={() => navigate('/demandes_en_attentes')} >
     
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
            <ListTodo size={24} />
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