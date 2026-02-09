import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, Building2, Loader2, AlertCircle, Star, Trophy } from 'lucide-react';

const SallesListCard = () => {
  const [salles, setSalles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        setIsLoading(true);
        // Simulation d'appel API
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockResponse = [
          { id: 1, nom: 'Salle Stanislas', ville: 'Nancy (Siège)', note: 5, status: 'free', type: 'reunion' },
          { id: 2, nom: 'Dojo Régional', ville: 'Pont-à-Mousson', note: 4, status: 'busy', type: 'sport' },
          { id: 3, nom: 'Bureau Ligue Football', ville: 'Champigneulles', note: 3, status: 'free', type: 'bureau' },
          { id: 4, nom: 'Amphithéâtre Technopôle', ville: 'Metz', note: 5, status: 'free', type: 'conf' },
          { id: 5, nom: 'Salle Majorelle', ville: 'Nancy (Siège)', note: 4, status: 'busy', type: 'reunion' },
          { id: 6, nom: 'Complexe Omnisports', ville: 'Thionville', note: 4, status: 'free', type: 'sport' },
        ];
        
        setSalles(mockResponse);
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
    <>
      <style>
        {`
          .custom-scroll::-webkit-scrollbar { width: 6px; }
          .custom-scroll::-webkit-scrollbar-track { background: transparent; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: #848181; }
        `}
      </style>

      <div 
        className="card border-0 shadow-sm" 
        style={{ 
          borderRadius: '16px', 
          backgroundColor: '#FAFAFA', 
          width: '40%', 
          height: '390px' 
        }}
      >
        <div className="card-body d-flex flex-column h-100">
          
          {/* En-tête */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-shrink-0">
            <div>
              <h5 className="fw-bold mb-0" style={{ color: '#430000', fontSize: '1.3rem' }}>Mes Salles</h5>
              <p className="small mb-0" style={{ color: '#848181', fontSize: '1rem' }}>Espaces gérés</p>
            </div>
            {!isLoading && !error && (
              <span className="badge rounded-pill" style={{ backgroundColor: '#ADABAB', color: '#FFF', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem'  }}>
                {salles.length}
              </span>
            )}
          </div>

          {/* États de chargement */}
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

          {/* Liste Scrollable */}
          {!isLoading && !error && (
            <div 
              className="d-flex flex-column gap-3 custom-scroll flex-grow-1" 
              style={{ 
                overflowY: 'auto', 
                paddingRight: '5px',
                minHeight: 0 
              }}
            >
              {salles.map((salle) => (
                <div 
                  key={salle.id} 
                  className="p-3 rounded-3 border-0 shadow-sm d-flex align-items-center justify-content-between" 
                  style={{ backgroundColor: '#FFFFFF' }}>

                  <div className="d-flex align-items-center gap-3" style={{ minWidth: 0 }}>
                    {/* Icone */}
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" 
                      style={{ 
                        width: '40px', height: '40px',
                        backgroundColor: '#FAFAFA', 
                        color: '#430000' 
                      }}>
                      {salle.type === 'sport' ? <Trophy size={18} /> : <Building2 size={18} />}
                    </div>
                    
                    {/* Textes */}
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

                  {/* Fleche */}
                  <div className="ps-2">
                      <ChevronRight size={16} style={{ color: '#ADABAB', cursor: 'pointer' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SallesListCard;