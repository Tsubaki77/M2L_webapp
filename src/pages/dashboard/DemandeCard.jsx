import React from 'react';
import { ListTodo } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

// 1. IMPORT DE TES FAUSSES DONNÉES
import { requestData } from '../data/requestData'; 

const DemandeCard = () => {
  const navigate = useNavigate(); 
  
  // 2. LOGIQUE POUR COMPTER LES DEMANDES
  // On filtre pour ne garder que celles qui ont le statut 'pending' (en attente)
  const demandesEnAttente = requestData.filter(req => req.status === 'pending');
  const nombreDemandes = demandesEnAttente.length;

  return (
    <div 
      className="card border-0 shadow text-white overflow-hidden position-relative" 
      style={{backgroundColor: '#CC4040', borderRadius: '16px', width: '50%', height: '200px', cursor: 'pointer' }} 
      onClick={() => navigate('/demandes_en_attentes')} 
    >
     
      {/* --- Décorations arrière-plan --- */}
      <div className="position-absolute bg-white rounded-circle" style={{ width: '200px', height: '200px', top: '-80px', right: '-80px', opacity: '0.1' }}></div>
      <div className="position-absolute bg-white rounded-circle" style={{ width: '140px', height: '140px', top: '30px', right: '-40px', opacity: '0.1' }}></div>

      {/* --- Contenu de la card --- */}
      <div className="card-body p-4 position-relative z-1 d-flex flex-column h-100 justify-content-between">
        
        {/* Icône */}
        <div>
          <div 
            className="d-flex align-items-center justify-content-center rounded shadow-sm" 
            style={{ width: '50px', height: '50px', backgroundColor: '#800000' }}
          >
            <ListTodo size={24} />
          </div>
        </div>

        {/* Textes Dynamiques */}  
        <div className="mt-auto">
          {/* 3. AFFICHAGE DU NOMBRE DYNAMIQUE */}
          <h3 className="fw-bold text-white">{nombreDemandes}</h3>
          <p className="text-white-50 fw-medium mb-0 mt-1">
            {nombreDemandes > 1 ? 'Demandes en attente' : 'Demande en attente'}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DemandeCard;