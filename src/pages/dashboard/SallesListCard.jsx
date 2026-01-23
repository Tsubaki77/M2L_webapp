import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, Building2, Loader2, AlertCircle, Star, Trophy } from 'lucide-react';

const SallesListCard = () => {
  const [salles, setSalles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        // A remplacer par un vrai appel API
        setIsLoading(true);
        // Simulation d'appel API
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulation de données API "MAISON DES LIGUES DE LORRAINE"
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
          .custom-scroll::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #ADABAB; border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: #848181; }
        `}
      </style>

      <div 
        className="card border-0 shadow-sm h-100" 
        style={{ 
          borderRadius: '16px', 
          backgroundColor: '#FAFAFA', 
          width: '100%', 
          maxWidth: '400px'
        }}
      >
        <div className="card-body p-4 d-flex flex-column" style={{ height: '400px' }}>
          
          {/* En-tête M2L */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-0" style={{ color: '#430000' }}>Salles M2L</h5>
              <p className="small mb-0" style={{ color: '#848181' }}>Espaces gérés</p>
            </div>
            {!isLoading && !error && (
              <span className="badge rounded-pill" style={{ backgroundColor: '#ADABAB', color: '#FFF' }}>
                {salles.length}
              </span>
            )}
          </div>

          {/* Loading... */}
          {isLoading && (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted">
              <Loader2 size={32} className="spin-animation mb-2" style={{ color: '#CC4040' }} />
              <style>{`.spin-animation { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <p className="small">Récupération des données...</p>
            </div>
          )}

          {/* Error... */}
          {error && (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-danger">
              <AlertCircle size={32} className="mb-2" />
              <p className="small text-center">{error}</p>
            </div>
          )}

          {/* Liste */}
          {!isLoading && !error && (
            <div className="d-flex flex-column gap-3 custom-scroll" style={{ overflowY: 'auto', paddingRight: '5px' }}>
              {salles.map((salle) => (
                <div 
                  key={salle.id} 
                  className="p-3 rounded-3 border-0 shadow-sm d-flex align-items-center justify-content-between" 
                  style={{ backgroundColor: '#FFFFFF' }}>

                  <div className="d-flex align-items-center gap-3">
                    {/* Icone adaptée trophée si c'est du sport, batiment sinon */}
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-circle" 
                      style={{ 
                        width: '40px', height: '40px', flexShrink: 0,
                        backgroundColor: '#FAFAFA', 
                        color: '#430000' 
                      }}>
                      {salle.type === 'sport' ? <Trophy size={18} /> : <Building2 size={18} />}
                    </div>
                    
                    <div style={{ minWidth: 0 }}>
                      <h6 className="fw-bold mb-1 text-dark text-truncate">{salle.nom}</h6>
                      
                      <div className="d-flex flex-column gap-1">
                        <div className="d-flex align-items-center text-secondary small">
                           <MapPin size={12} className="me-1" />
                           {salle.ville}
                        </div>
                        <div>
                          {renderStars(salle.note)}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* DROITE */}
                  <div className="d-flex flex-column align-items-end justify-content-center ps-2">
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