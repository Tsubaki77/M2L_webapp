import React, { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const DemandeCard = () => {
  const navigate = useNavigate();
  const [count,     setCount]     = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getReservations()
      .then(data => setCount(data.filter(r => r.statut === 'EN_ATTENTE').length))
      .catch(() => setCount(0))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="card border-0 shadow text-white overflow-hidden position-relative dash-stat-card"
      style={{ backgroundColor: '#CC4040', borderRadius: '16px', cursor: 'pointer' }}
      onClick={() => navigate('/demandes_en_attentes')}
    >
      {/* Décorations */}
      <div className="position-absolute bg-white rounded-circle" style={{ width: '200px', height: '200px', top: '-80px', right: '-80px', opacity: 0.08 }} />
      <div className="position-absolute bg-white rounded-circle" style={{ width: '140px', height: '140px', top: '30px', right: '-40px', opacity: 0.08 }} />

      <div className="card-body p-4 position-relative z-1 d-flex flex-column justify-content-between h-100">
        <div className="d-flex align-items-center justify-content-center rounded shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#800000' }}>
          <ListTodo size={24} />
        </div>
        <div className="mt-auto">
          {isLoading
            ? <div className="spinner-border spinner-border-sm text-white mb-1" />
            : <h3 className="fw-bold text-white mb-0">{count}</h3>
          }
          <p className="text-white-50 fw-medium mb-0 mt-1">
            {count > 1 ? 'Demandes en attente' : 'Demande en attente'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemandeCard;
