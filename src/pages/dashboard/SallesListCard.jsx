import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, Building2, Loader2, AlertCircle, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
// IMPORT DES DONNÉES
import { sallesData } from '../data/salleData'; 

const SallesListCard = () => {
  const [salles, setSalles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        setIsLoading(true);
        // Simulation API rapide
        await new Promise(resolve => setTimeout(resolve, 600)); 
        setSalles(sallesData);
      } catch (err) {
        setError("Erreur lors du chargement des salles M2L.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSalles();
  }, []);

  const renderStars = (note) => {
    return (
      <div className="d-flex align-items-center">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            size={12} 
            fill={index < note ? "#CC4040" : "none"} 
            color={index < note ? "#CC4040" : "#ADABAB"}
            style={{ marginRight: '2px' }}
          />
        ))}
        <span className="ms-1 small text-muted" style={{ fontSize: '0.75rem'}}>({note}/5)</span>
      </div>
    );
  };

  return (
      <div 
        className="card border-0 shadow-sm" 
        style={{ borderRadius: '16px', backgroundColor: '#FAFAFA', width: '40%', height: '390px' }}
      >
        <div className="card-body d-flex flex-column h-100">
          
          <div className="d-flex justify-content-between align-items-center mb-3 flex-shrink-0">
            <div>
              <h5 className="fw-bold mb-0" style={{ color: '#430000', fontSize: '1.3rem' }}>Mes Salles</h5>
              <p className="small mb-0" style={{ color: '#848181', fontSize: '1rem' }}>Espaces gérés</p>
            </div>
            {!isLoading && !error && (
              <span 
                className="badge rounded-pill shadow-sm hover-scale" 
                onClick={() => navigate('/mes_salles')} // 3. Clic sur le compteur -> Liste complète
                style={{ 
                    backgroundColor: '#ADABAB', 
                    color: '#FFF', 
                    width: '32px', 
                    height: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '1rem',
                    cursor: 'pointer', // Curseur main
                    transition: 'transform 0.2s'
                }}
                title="Voir toutes mes salles"
              >
                {salles.length}
              </span>
            )}
          </div>

          {isLoading && (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted">
              <Loader2 size={32} className="spin-animation mb-2" style={{ color: '#CC4040' }} />
              <style>{`.spin-animation { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <p className="small">Chargement...</p>
            </div>
          )}

          {error && (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-danger">
              <AlertCircle size={32} className="mb-2" />
              <p className="small text-center">{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="d-flex flex-column gap-3 custom-scroll flex-grow-1" style={{ overflowY: 'auto', paddingRight: '5px', minHeight: 0 }}>
              {salles.map((salle) => (
                <div 
                    key={salle.id} 
                    className="p-3 rounded-3 border-0 shadow-sm d-flex align-items-center justify-content-between hover-bg-light transition-all" 
                    onClick={() => navigate(`/salles/${salle.id}`)} // 4. Clic sur la carte -> Détail salle
                    style={{ 
                        backgroundColor: '#FFFFFF', 
                        cursor: 'pointer' 
                    }}
                >
                  <div className="d-flex align-items-center gap-3" style={{ minWidth: 0 }}>
                    <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: '#FAFAFA', color: '#430000' }}>
                      {salle.type === 'sport' ? <Trophy size={18} /> : <Building2 size={18} />}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}> 
                      <h6 className="fw-bold mb-1 text-dark text-truncate" title={salle.nom}>{salle.nom}</h6>
                      <div className="d-flex flex-column gap-1">
                        <div className="d-flex align-items-center text-secondary small text-truncate">
                           <MapPin size={12} className="me-1 flex-shrink-0" />
                           <span className="text-truncate">{salle.ville}</span>
                        </div>
                        <div>{renderStars(salle.note)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="ps-2">
                      <ChevronRight size={16} style={{ color: '#ADABAB' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Styles pour l'animation et le scroll */}
        <style>{`
            .hover-scale:hover { transform: scale(1.1); background-color: #999 !important; }
            .hover-bg-light:hover { background-color: #f8f9fa !important; transform: translateX(3px); transition: transform 0.2s ease; }
        `}</style>
      </div>
  );
};

export default SallesListCard;