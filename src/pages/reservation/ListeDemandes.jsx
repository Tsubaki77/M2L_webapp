import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Check, X, ChevronRight, Calendar, User, Trophy, MapPin, Loader2, ArrowLeft } from 'lucide-react';

const ListeDemandes = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
//A changer par la logique API
  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        setRequests([
          { id: 1, room: 'Salle Majorelle', league: 'Ligue de Football', user: 'Jean Dupont', role: 'Coach', date: '12/10/2024 - 14:00' },
          { id: 2, room: 'Salle Grüber', league: 'Ligue de Tennis', user: 'Marie Curry', date: '14/10/2024 - 09:00' },
          { id: 3, room: 'Amphithéâtre', league: 'Ligue de Basket', user: 'Tony Parker', date: '20/10/2024 - 10:30' },
          { id: 4, room: 'Salle Lamour', league: 'Ligue d\'Escrime', user: 'Laura Flessel', date: '22/10/2024 - 16:00' },
          { id: 5, room: 'Salle 5', league: 'Ligue de Hand', user: 'Nikola Karabatic', date: '23/10/2024 - 11:00' },
          { id: 6, room: 'Salle 6', league: 'Ligue de Volley', user: 'Earvin N\'Gapeth', date: '25/10/2024 - 15:30' },
          { id: 7, room: 'Salle 7', league: 'Ligue de Rugby', user: 'Antoine Dupont', date: '27/10/2024 - 09:00' },
        ]);
      } catch (err) {
        setError("Impossible de charger les demandes.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleValidate = (id) => setRequests(prev => prev.filter(req => req.id !== id));
  const handleReject = (id) => setRequests(prev => prev.filter(req => req.id !== id));

  return (
    <div className="d-flex flex-column h-100">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
           <Loader2 className="animate-spin" style={{color: "#CC4040"}} size={48} />
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : (
        
        
        <div className="d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>
          
          <div 
            className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-1 flex-shrink-0"
            style={{ backgroundColor: '#430000' }} 
          >
            {/* Bouton Retour Blanc */}
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: '45px', height: '45px' }}
            >
              <ArrowLeft size={24} color="#430000" />
            </button>
    
            {/* Titre en majuscules + Compteur */}
            <h2 className="text-white fw-bold m-0 fs-4 text-uppercase" style={{ letterSpacing: '1px' }}>
              Gérez les nouvelles demandes de réservation : {requests.length}
            </h2>
          </div>
         
          {/* La Liste */}
          <div className=" p-3 flex-grow-1 overflow-y-auto">
            
            <div className="d-flex flex-column gap-3">
              {requests.map((req) => (
                <div 
                  key={req.id} 
                  className="bg-m2l-white border border-secondary-subtle rounded-3 p-3 shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3"
                >
                  <div className="d-flex align-items-center gap-4 flex-grow-1">
                      <div className="row w-100 align-items-center g-3">
                         <div className="col-md-3 fw-semibold text-dark"><MapPin size={16} className="me-2 text-danger"/>{req.room}</div>
                         <div className="col-md-3 text-secondary"><Trophy size={16} className="me-2"/>{req.league}</div>
                         <div className="col-md-3 text-secondary"><User size={16} className="me-2"/>{req.user}</div>
                         <div className="col-md-3 text-secondary"><Calendar size={16} className="me-2"/>{req.date}</div>
                      </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 border-start ps-3 py-1">
                    <button onClick={(e) => { e.stopPropagation(); handleValidate(req.id); }} className="btn btn-outline-success btn-sm d-flex align-items-center gap-1 px-3 rounded-pill">
                      <Check size={16} /> Valider
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleReject(req.id); }} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 px-3 rounded-pill">
                      <X size={16} /> Refuser
                    </button>
                    
                    {/* BOUTON DE NAVIGATION */}
                    <button 
                      className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center ms-2" 
                      style={{width:'35px', height:'35px'}} 
                      onClick={() => navigate(`/demandes/${req.id}`)} // <-- Redirige vers la bonne demande.
                    >
                      <ChevronRight size={20} className="text-muted"/>
                    </button>
                    
                  </div>
                </div>
              ))}

              {requests.length === 0 && (
                  <div className="text-center py-5 text-muted">
                      <p>Aucune demande en attente.</p>
                  </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ListeDemandes;