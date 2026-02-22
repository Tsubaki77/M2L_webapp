import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Check, X, ChevronRight, Calendar, User, Trophy, MapPin, Loader2, Clock } from 'lucide-react';


import { requestData } from '../data/requestData'; 

const ListeDemandes = () => {
  // 1. ÉTATS (STATES)
  const [requests, setRequests] = useState([]); // Liste des demandes filtrables
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // 2. CHARGEMENT INITIAL
  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        // Simulation d'attente réseau (à voir pour l'API réelle)
        await new Promise(resolve => setTimeout(resolve, 600)); 
        // On récupère tout, on pourra filtrer par 'status === pending' si besoin ici
        setRequests(requestData);
      } catch (err) {
        setError("Impossible de charger les demandes.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // 3. ACTIONS RAPIDES
  // Pour le moment, Valider ou Refuser retire simplement la ligne de la liste (simulation)
  const handleValidate = (id) => setRequests(prev => prev.filter(req => req.id !== id));
  const handleReject = (id) => setRequests(prev => prev.filter(req => req.id !== id));


  // 4. LOGIQUE D'AFFICHAGE 
  // Cette fonction gère l'affichage selon le type de réservation (créneau, journée, mois...)
  const renderDateInfo = (req) => {
      const textStyle = "text-secondary fw-medium text-truncate";

      switch(req.type) {
          // CAS : Une seule journée + Heures précises
          case 'creneau':
              return (
                  <span className={textStyle}>
                      {req.date} <span className="mx-2">|</span> {req.startTime} - {req.endTime}
                  </span>
              );

          // CAS : Journée bloquée complète
          case 'fullday':
              return (
                  <span className={textStyle}>
                      {req.date} <span className="mx-2">|</span> Journée entière
                  </span>
              );

          // CAS : Événement sur plusieurs jours
          case 'multiday':
              return (
                  <span className={textStyle}>
                      Du {req.startDate} au {req.endDate} <span className="mx-2">|</span> {req.startTime} - {req.endTime}
                  </span>
              );

          // CAS : Location longue durée
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

  // 5. RENDU PRINCIPAL
  return (
      <div className="d-flex flex-column h-100">
        
        {/*LOADER */}
        {isLoading ? (
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
               <Loader2 className="animate-spin" style={{color: "#CC4040"}} size={48} />
            </div>
        ) : error ? (
            <div className="alert alert-danger m-4" role="alert">{error}</div>
        ) : (
        
        <div className="d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>
             
             {/* HEADER */}
             <div className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-1 flex-shrink-0" style={{ backgroundColor: '#430000' }}>
                <h2 className="text-white fw-bold m-0 fs-4 text-uppercase" style={{ letterSpacing: '1px' }}>
                    Gérez les nouvelles demandes : {requests.length}
                </h2>
             </div>

             {/* LISTE DES CARTES */}
             <div className="p-3 flex-grow-1 overflow-y-auto custom-scroll">
                <div className="d-flex flex-column gap-3">
                  {requests.map((req) => (
                    // LIGNE DE DEMANDE (Horizontal)
                    <div key={req.id} className="bg-white border border-secondary-subtle rounded-3 p-3 shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3">
                      
                      {/* BLOC INFOS */}
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <div className="row w-100 align-items-center m-0 text-nowrap">
                             
                             {/* 1. Salle */}
                             <div className="col-3 d-flex align-items-center ps-0 overflow-hidden">
                                 <MapPin size={18} className="me-2 text-danger flex-shrink-0"/>
                                 <span className="text-secondary text-uppercase text-truncate" title={req.roomName}>
                                    {req.roomName}
                                 </span>
                             </div>
                             
                             {/* 2. Ligue émettrice */}
                             <div className="col-2 d-flex align-items-center text-secondary border-start ps-3 overflow-hidden">
                                 <Trophy size={18} className="me-2 flex-shrink-0"/>
                                 <span className="text-truncate fw-medium">{req.league}</span>
                             </div>
                             
                             {/* 3. Utilisateur */}
                             <div className="col-2 d-flex align-items-center text-secondary border-start ps-3 overflow-hidden">
                                 <User size={18} className="me-2 flex-shrink-0"/>
                                 <span className="text-truncate fw-medium">{req.user}</span>
                             </div>
                             
                             {/* 4. Date & Heure (Appel du helper intelligent) */}
                             <div className="col-5 d-flex align-items-center border-start ps-3 overflow-hidden">
                                 <Calendar size={18} className="me-2 text-secondary flex-shrink-0"/>
                                 {renderDateInfo(req)}
                             </div>

                          </div>
                      </div>
                      
                      {/* BLOC BOUTONS D'ACTION (À droite) */}
                      <div className="d-flex align-items-center gap-2 border-start ps-3 py-1 flex-shrink-0">
                        
                        {/* Valider */}
                        <button onClick={(e) => { e.stopPropagation(); handleValidate(req.id); }} className="btn btn-outline-success btn-sm d-flex align-items-center gap-1 px-3 rounded-pill fw-bold hover-scale">
                             <Check size={16} /> VALIDER
                        </button>
                        
                        {/* Refuser */}
                        <button onClick={(e) => { e.stopPropagation(); handleReject(req.id); }} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 px-3 rounded-pill fw-bold hover-scale">
                             <X size={16} /> REFUSER
                        </button>
                        
                        {/* Détails */}
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

                  {/* État vide */}
                  {requests.length === 0 && (
                      <div className="text-center py-5 text-muted">
                          <p className="fs-5">Aucune demande en attente.</p>
                      </div>
                  )}
                </div>
             </div>
        </div>
        )}
        
        {/* CSS Interne */}
        <style>{`
            .animate-spin { animation: spin 1s linear infinite; }
            @keyframes spin { 100% { transform: rotate(360deg); } }
            .hover-scale:hover { transform: scale(1.05); transition: all 0.2s; }
            .custom-scroll::-webkit-scrollbar { width: 6px; }
            .custom-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
        `}</style>
      </div>
  );
};

export default ListeDemandes;