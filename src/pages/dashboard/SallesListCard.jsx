import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, Building2, Trophy, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const SallesListCard = () => {
  const navigate    = useNavigate();
  const [salles,     setSalles]     = useState([]);
  const [isLoading,  setIsLoading]  = useState(true);
  const [error,      setError]      = useState(null);

  useEffect(() => {
    const fetch = api.isSuperAdmin() ? api.getSalles() : api.getMesSalles();
    fetch
      .then(data => setSalles(data))
      .catch(() => setError('Impossible de charger les salles.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="card border-0 shadow-sm dash-salles-card"
      style={{ borderRadius: '16px', backgroundColor: '#FAFAFA' }}
    >
      <div className="card-body d-flex flex-column h-100">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-shrink-0">
          <div>
            <h5 className="fw-bold mb-0" style={{ color: '#430000', fontSize: '1.2rem' }}>Mes Salles</h5>
            <p className="small mb-0 text-muted">Espaces gérés</p>
          </div>
          {!isLoading && !error && (
            <span
              className="badge rounded-pill bg-secondary text-white"
              style={{ cursor: 'pointer', fontSize: '0.8rem', padding: '0.3rem 0.7rem' }}
              onClick={() => navigate('/mes_salles')}
              title="Voir toutes mes salles"
            >
              {salles.length}
            </span>
          )}
        </div>

        {/* Loader */}
        {isLoading && (
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted">
            <Loader2 size={28} className="spinner-icon mb-2" style={{ color: '#CC4040' }} />
            <p className="small mb-0">Chargement...</p>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-danger">
            <AlertCircle size={28} className="mb-2" />
            <p className="small text-center mb-0">{error}</p>
          </div>
        )}

        {/* Liste */}
        {!isLoading && !error && (
          <div className="d-flex flex-column gap-2 custom-scroll flex-grow-1" style={{ overflowY: 'auto' }}>
            {salles.length === 0 ? (
              <div className="text-center text-muted py-4 small">Aucune salle enregistrée.</div>
            ) : salles.map(salle => (
              <div
                key={salle.id}
                className="p-3 rounded-3 shadow-sm d-flex align-items-center justify-content-between"
                onClick={() => navigate(`/salles/${salle.id}`)}
                style={{ backgroundColor: '#fff', cursor: 'pointer', transition: 'transform 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div className="d-flex align-items-center gap-3" style={{ minWidth: 0 }}>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: '38px', height: '38px', backgroundColor: '#fafafa', border: '1px solid #eee', color: '#430000' }}
                  >
                    {salle.typeSalle?.categorie === 'sport' ? <Trophy size={17} /> : <Building2 size={17} />}
                  </div>
                  <div className="text-truncate">
                    <div className="fw-bold text-dark text-truncate" style={{ fontSize: '0.9rem' }}>{salle.nom}</div>
                    <div className="d-flex align-items-center text-muted small">
                      <MapPin size={11} className="me-1 flex-shrink-0" />
                      <span className="text-truncate">{salle.ville || salle.adresse}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={15} className="text-muted flex-shrink-0" />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SallesListCard;
