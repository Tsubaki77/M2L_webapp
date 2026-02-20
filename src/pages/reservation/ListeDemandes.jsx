import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Check, X, ChevronRight, Calendar, User, Trophy, MapPin, Loader2, ArrowLeft, Clock } from 'lucide-react';
import { requestData } from '../data/requestData'; 

const ListeDemandes = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600)); 
        setRequests(requestData);
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


  const renderDateInfo = (req) => {
    
      const textStyle = "text-secondary fw-medium text-truncate";

      switch(req.type) {
          // CAS 1 : Une seule journée + Heures
          case 'creneau':
              return (
                  <span className={textStyle}>
                      {req.date} <span className="mx-2">|</span> {req.startTime} - {req.endTime}
                  </span>
              );

          // CAS 2 : Journée entière
          case 'fullday':
              return (
                  <span className={textStyle}>
                      {req.date} <span className="mx-2">|</span> Journée entière
                  </span>
              );

          // CAS 3 : Plusieurs jours + Heures
          case 'multiday':
              return (
                  <span className={textStyle}>
                      Du {req.startDate} au {req.endDate} <span className="mx-2">|</span> {req.startTime} - {req.endTime}
                  </span>
              );

          // CAS 4 & 5 : Mois complet
          case 'month':
              return (
                  <span className={textStyle}>
                      Du {req.startDate} au {req.endDate} <span className="mx-2">|</span> {req.startTime ? `${req.startTime} - ${req.endTime}` : "Mois entier"}
                  </span>
              );

          default:
              return <span className={textStyle}>{req.date}</span>;
      }
  };

  return (
      <div className="d-flex flex-column h-100">
        {isLoading ? (
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
               <Loader2 className="animate-spin" style={{color: "#CC4040"}} size={48} />
               <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        ) : error ? (
            <div className="alert alert-danger m-4" role="alert">{error}</div>
        ) : (
        
        <div className="d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>
             
             {/* Header */}
             <div className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-1 flex-shrink-0" style={{ backgroundColor: '#430000' }}>
                <h2 className="text-white fw-bold m-0 fs-4 text-uppercase" style={{ letterSpacing: '1px' }}>
                    Gérez les nouvelles demandes de réservation : {requests.length}
                </h2>
             </div>

             {/* Liste */}
             <div className="p-3 flex-grow-1 overflow-y-auto custom-scroll">
                <div className="d-flex flex-column gap-3">
                  {requests.map((req) => (
                    <div key={req.id} className="bg-white border border-secondary-subtle rounded-3 p-3 shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3">
                      
                      {/* BLOC INFORMATIONS (Aligné sur une seule ligne) */}
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <div className="row w-100 align-items-center m-0 text-nowrap">
                             
                             {/* 1. NOM DE LA SALLE */}
                             <div className="col-3 d-flex align-items-center ps-0 overflow-hidden">
                                 <MapPin size={18} className="me-2 text-danger flex-shrink-0"/>
                                 <span className="text-secondary text-uppercase text-truncate" title={req.roomName}>
                                    {req.roomName}
                                 </span>
                             </div>
                             
                             {/* 2. LIGUE */}
                             <div className="col-2 d-flex align-items-center text-secondary border-start ps-3 overflow-hidden">
                                 <Trophy size={18} className="me-2 flex-shrink-0"/>
                                 <span className="text-truncate fw-medium">{req.league}</span>
                             </div>
                             
                             {/* 3. NOM PERSONNE */}
                             <div className="col-2 d-flex align-items-center text-secondary border-start ps-3 overflow-hidden">
                                 <User size={18} className="me-2 flex-shrink-0"/>
                                 <span className="text-truncate fw-medium">{req.user}</span>
                             </div>
                             
                             {/* 4. DATE ET CRÉNEAU */}
                             <div className="col-5 d-flex align-items-center border-start ps-3 overflow-hidden">
                                 <Calendar size={18} className="me-2 text-secondary flex-shrink-0"/>
                                 {renderDateInfo(req)}
                             </div>

                          </div>
                      </div>
                      
                      {/* BLOC BOUTONS (À droite) */}
                      <div className="d-flex align-items-center gap-2 border-start ps-3 py-1 flex-shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); handleValidate(req.id); }} className="btn btn-outline-success btn-sm d-flex align-items-center gap-1 px-3 rounded-pill fw-bold transition-all hover-scale">
                             <Check size={16} /> VALIDER
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleReject(req.id); }} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 px-3 rounded-pill fw-bold transition-all hover-scale">
                             <X size={16} /> REFUSER
                        </button>
                        <button 
                            className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center ms-2 shadow-sm" 
                            style={{width:'35px', height:'35px'}} 
                            onClick={() => navigate(`/demandes/${req.id}`)}
                        >
                           <ChevronRight size={20} className="text-muted"/>
                        </button>
                      </div>

                    </div>
                  ))}

                  {requests.length === 0 && (
                      <div className="text-center py-5 text-muted">
                          <p className="fs-5">Aucune demande en attente.</p>
                      </div>
                  )}
                </div>
             </div>
        </div>
        )}
        
        <style>{`
            .hover-scale:hover { transform: scale(1.05); }
        `}</style>
      </div>
  );
};

export default ListeDemandes;