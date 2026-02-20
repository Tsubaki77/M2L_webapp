import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Trophy, Briefcase, Calendar, Clock, MapPin, Users, Activity, Info, Check, X, Star } from 'lucide-react';

// IMPORT DES DEUX SOURCES DE DONNÉES
import { requestData } from '../data/requestData'; 
import { sallesData } from '../data/salleData';   

const ReservationDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const foundRequest = requestData.find(item => item.id === parseInt(id));

      if (foundRequest) {
        const foundRoom = sallesData.find(s => s.id === foundRequest.roomId);

        setRequest({
          ...foundRequest, 
          // On s'assure d'avoir une note par défaut si elle manque
          roomDetails: foundRoom || { nom: 'Salle Inconnue', adresse: 'Adresse non trouvée', capacite: 0, note: 0 } 
        });
      } else {
        setRequest(null);
      }

      setIsLoading(false);
    };

    fetchDetail();
  }, [id]);

  // --- HELPER : Générer les étoiles ---
  const renderStars = (note) => {
    // Si pas de note, on met 0
    const score = note || 0;
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={20} 
            // Si l'index est inférieur à la note arrondie, on remplit en rouge
            fill={i < Math.round(score) ? "#CC4040" : "none"} 
            color={i < Math.round(score) ? "#CC4040" : "#ADABAB"} 
          />
        ))}
      </div>
    );
  };

  if (isLoading) return <div className="p-5 text-center text-muted">Chargement...</div>;
  if (!request) return <div className="p-5 text-center"><p className="text-danger fw-bold">Demande introuvable.</p></div>;

  // --- LOGIQUE D'AFFICHAGE DYNAMIQUE (Dates & Heures) ---
  const renderDateCard = () => {
      if (['multiday', 'month'].includes(request.type)) {
          return (
              <div className="d-flex flex-column">
                  <span><span className="text-muted small me-1">Du</span> {request.startDate}</span>
                  <span><span className="text-muted small me-1">Au</span> {request.endDate}</span>
              </div>
          );
      }
      return <span className="fs-5">{request.date}</span>;
  };

  const renderTimeCard = () => {
      if (request.type === 'fullday') return <span className="badge bg-secondary text-white">Journée Entière</span>;
      if (request.startTime && request.endTime) return <span>{request.startTime} - {request.endTime}</span>;
      return <span className="text-muted fst-italic">Non spécifié</span>;
  };

  return (
    <div className="d-flex flex-column h-100 overflow-hidden">
      
      {/* Header */}
       <div className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-1 flex-shrink-0" style={{ backgroundColor: '#430000' }}>
            <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '45px', height: '45px' }}>
            <ArrowLeft size={24} color="#430000" />
            </button>
            <h2 className="text-white fw-bold m-0 fs-4 text-uppercase" style={{ letterSpacing: '1px' }}>
            Consultez le détail de la demande de réservation # {request.id}
            </h2>
        </div>

      <div className="row g-4 flex-grow-1 overflow-y-auto pb-4">
          
          {/* Colonne Gauche - La demande */}
          <div className="col-lg-8">
             <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-4 text-m2l-dark border-bottom pb-2">Informations Générales</h5>
                    
                    {/* Infos Demandeur */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-6">
                            <div className="d-flex gap-3">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}><User size={24} className="text-secondary" /></div>
                                <div>
                                    <p className="small text-muted mb-0 fw-bold text-uppercase">Demandeur</p>
                                    <p className="fw-bold text-dark mb-0 fs-5">{request.user}</p>
                                    <p className="small text-muted mb-0">contact@ligue.fr</p> 
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex gap-3">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}><Trophy size={24} className="text-secondary" /></div>
                                <div>
                                    <p className="small text-muted mb-0 fw-bold text-uppercase">Ligue & Rôle</p>
                                    <p className="fw-bold text-m2l-red mb-0 fs-5">{request.league}</p>
                                    <div className="d-flex align-items-center gap-1 text-muted small"><Briefcase size={12} /><span>{request.role || 'Membre'}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h5 className="fw-bold mb-4 text-m2l-dark border-bottom pb-2">Détails de l'activité</h5>
                    <div className="row g-4 mb-4">
                         
                        {/* Carte 1 : LABEL / ACTIVITÉ */}
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <div className="d-flex align-items-center gap-2 mb-2 text-secondary">
                                    <Activity size={18} />
                                    <span className="fw-bold small">OBJET</span>
                                </div>
                                
                                <p className="mb-0 fw-bold text-uppercase">
                                    {request.objet || "Activité diverse"}
                                </p>
                            </div>
                        </div>

                        {/* Carte 2 : DATES */}
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <div className="d-flex align-items-center gap-2 mb-2 text-secondary"><Calendar size={18} /><span className="fw-bold small">DATE(S)</span></div>
                                <div className="fw-bold text-dark">
                                    {renderDateCard()}
                                </div>
                            </div>
                        </div>

                        {/* Carte 3 : CRÉNEAU */}
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <div className="d-flex align-items-center gap-2 mb-2 text-secondary"><Clock size={18} /><span className="fw-bold small">HORAIRES</span></div>
                                <div className="fw-bold text-dark fs-5">
                                    {renderTimeCard()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="small text-muted fw-bold text-uppercase mb-2"> <Info size={14} className="me-1"/> Note complémentaire</p>
                        <div className="p-3 bg-light rounded-3 border-start border-4 border-danger text-dark">
                            "{request.description || "Aucune description supplémentaire fournie pour cette demande."}"
                        </div>
                    </div>

                    <div className="d-flex gap-3 mt-5 pt-3 border-top">
                        <button className="btn btn-success px-4 py-2 d-flex align-items-center gap-2 rounded-pill"><Check size={18} /> Valider</button>
                        <button className="btn btn-outline-danger px-4 py-2 d-flex align-items-center gap-2 rounded-pill"><X size={18} /> Refuser</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Colonne Droite - La salle */}
        <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div className="bg-m2l-dark p-4 text-white text-center">
                    <div className="mx-auto bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{width:'60px', height:'60px'}}><MapPin size={30} /></div>
                    <h4 className="fw-bold mb-1">{request.roomDetails.nom}</h4>
                    <span className="badge bg-white text-dark bg-opacity-75">Salle demandée</span>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                    <div className="mb-4">
                        <label className="small text-muted fw-bold mb-1">ADRESSE</label>
                        <p className="fw-semibold text-dark mb-0">{request.roomDetails.adresse}</p>
                    </div>
                    
                    <div className="mb-4">
                        <label className="small text-muted fw-bold mb-1">CAPACITÉ</label>
                        <div className="d-flex align-items-center gap-2">
                            <Users size={20} className="text-m2l-red"/>
                            <span className="fs-5 fw-bold">{request.roomDetails.capacite} personnes</span>
                        </div>
                    </div>

                    {/* --- AVIS GLOBAL --- */}
                    <div className="mb-4">
                        <label className="small text-muted fw-bold mb-1">AVIS GLOBAL</label>
                        <div className="d-flex align-items-center gap-2">
                             {renderStars(request.roomDetails.note)}
                             <span className="fw-bold small text-secondary pt-1">
                                {request.roomDetails.note ? request.roomDetails.note + "/5" : "Aucun avis"}
                             </span>
                        </div>
                    </div>

                    <div className="flex-grow-1"></div>
                    
                    <button 
                      className="learn-more" 
                      onClick={() => navigate(`/salles/${request.roomDetails.id}`)}
                    >
                      <span className="circle" aria-hidden="true"><span className="icon arrow"></span></span>
                      <span className="button-text">Voir détails</span>
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ReservationDetail;