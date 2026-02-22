import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Trophy, Briefcase, Calendar, Clock, MapPin, Users, Activity, Info, Check, X, Star } from 'lucide-react';

// 1. DOUBLE SOURCE DE DONNÉES
// On a besoin des infos de la réservation ET des détails techniques de la salle associée (à changer par un appel API )
import { requestData } from '../data/requestData'; 
import { sallesData } from '../data/salleData';   

const ReservationDetail = () => {
  // 2. RÉCUPÉRATION DE L'ID DANS L'URL
  // id correspond au paramètre défini dans App.js (ex: /demandes/:id)
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sécurité : si on vient du calendrier, on cache les boutons Valider/Refuser 
  const isReadOnly = location.state?.fromCalendar;

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); 

      // On cherche la demande par son ID (attention au parseInt car l'URL est du texte)
      const foundRequest = requestData.find(item => item.id === parseInt(id));

      if (foundRequest) {
        // On utilise le 'roomId' de la demande pour aller chercher les infos de la salle
        const foundRoom = sallesData.find(s => s.id === foundRequest.roomId);

        setRequest({
          ...foundRequest, 
          // On fusionne les détails de la salle dans l'objet de la demande
          roomDetails: foundRoom || { nom: 'Salle Inconnue', capacite: 0, note: 0 } 
        });
      }
      setIsLoading(false);
    };
    fetchDetail();
  }, [id]);

  // 3. HELPERS D'AFFICHAGE
  
  // Système d'étoiles (basé sur la note de la salle)
  const renderStars = (note) => {
    const score = note || 0;
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={20} 
            fill={i < Math.round(score) ? "#CC4040" : "none"} 
            color={i < Math.round(score) ? "#CC4040" : "#ADABAB"} 
          />
        ))}
      </div>
    );
  };

  // Gestion des dates (simple ou plage de dates selon le type de réservation)
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

  // Gestion des créneaux (spécifique ou journée entière)
  const renderTimeCard = () => {
      if (request.type === 'fullday') return <span className="badge bg-secondary text-white">Journée Entière</span>;
      if (request.startTime && request.endTime) return <span>{request.startTime} - {request.endTime}</span>;
      return <span className="text-muted fst-italic">Non spécifié</span>;
  };

  if (isLoading) return <div className="p-5 text-center text-muted">Chargement...</div>;
  if (!request) return <div className="p-5 text-center"><p className="text-danger fw-bold">Demande introuvable.</p></div>;

  {/* 4. RENDU PRINCIPAL */}
  return (
    <div className="d-flex flex-column h-100 overflow-hidden">
      
      {/* HEADER */}
       <div className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-1 flex-shrink-0" style={{ backgroundColor: '#430000' }}>
            {/* Bouton retour : navigate(-1) revient à la page précédente dans l'historique */}
            <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle d-flex align-items-center justify-content-center">
                <ArrowLeft size={24} color="#430000" />
            </button>
            <h2 className="text-white fw-bold m-0 fs-4 text-uppercase">
                Détail de la demande # {request.id}
            </h2>
        </div>

      <div className="row g-4 flex-grow-1 overflow-y-auto pb-4">
          
          {/* COLONNE GAUCHE : INFOS DEMANDEUR & ACTIVITÉ */}
          <div className="col-lg-8">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-4 text-m2l-dark border-bottom pb-2">Informations Générales</h5>
                    
                    {/* Bloc Demandeur */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-6">
                            <div className="d-flex gap-3">
                                <div className="bg-light rounded-circle p-3"><User size={24} className="text-secondary" /></div>
                                <div>
                                    <p className="small text-muted mb-0 fw-bold">DEMANDEUR</p>
                                    <p className="fw-bold text-dark mb-0 fs-5">{request.user}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex gap-3">
                                <div className="bg-light rounded-circle p-3"><Trophy size={24} className="text-secondary" /></div>
                                <div>
                                    <p className="small text-muted mb-0 fw-bold">LIGUE & RÔLE</p>
                                    <p className="fw-bold text-m2l-red mb-0 fs-5">{request.league}</p>
                                    <small className="text-muted"><Briefcase size={12} /> {request.role || 'Membre'}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h5 className="fw-bold mb-4 text-m2l-dark border-bottom pb-2">Détails de l'activité</h5>
                    <div className="row g-4 mb-4">
                        {/* Grille de 3 cartes : Objet / Dates / Horaires */}
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <span className="fw-bold small text-secondary">OBJET</span>
                                <p className="mb-0 fw-bold text-uppercase mt-2">{request.objet || "Activité diverse"}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <span className="fw-bold small text-secondary">DATE(S)</span>
                                <div className="fw-bold text-dark mt-2">{renderDateCard()}</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <span className="fw-bold small text-secondary">HORAIRES</span>
                                <div className="fw-bold text-dark fs-5 mt-2">{renderTimeCard()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Note de l'utilisateur */}
                    <div className="mb-4">
                        <p className="small text-muted fw-bold text-uppercase mb-2"><Info size={14}/> Note complémentaire</p>
                        <div className="p-3 bg-light rounded-3 border-start border-4 border-danger">
                            "{request.description || "Aucune description fournie."}"
                        </div>
                    </div>

                    {/* ACTIONS : Affichées uniquement si on n'est pas en lecture seule */}
                    {!isReadOnly && (
                    <div className="d-flex gap-3 mt-5 pt-3 border-top">
                        <button className="btn btn-success px-4 py-2 rounded-pill"><Check size={18} /> Valider</button>
                        <button className="btn btn-outline-danger px-4 py-2 rounded-pill"><X size={18} /> Refuser</button>
                    </div>
                    )}
                </div>
            </div>
        </div>

        {/* COLONNE DROITE : RÉSUMÉ DE LA SALLE */}
        <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div className="bg-m2l-dark p-4 text-white text-center">
                    <div className="mx-auto bg-white bg-opacity-10 rounded-circle p-3 mb-3" style={{width:'60px'}}><MapPin size={30} /></div>
                    <h4 className="fw-bold mb-1">{request.roomDetails.nom}</h4>
                    <span className="badge bg-white text-dark bg-opacity-75">Salle demandée</span>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                    <div className="mb-4">
                        <label className="small text-muted fw-bold">ADRESSE</label>
                        <p className="fw-semibold text-dark">{request.roomDetails.adresse}</p>
                    </div>
                    <div className="mb-4">
                        <label className="small text-muted fw-bold">CAPACITÉ</label>
                        <p className="fw-bold text-dark fs-5"><Users size={20} className="text-m2l-red me-2"/>{request.roomDetails.capacite} pers.</p>
                    </div>
                    <div className="mb-4">
                        <label className="small text-muted fw-bold">AVIS GLOBAL</label>
                        <div className="d-flex align-items-center gap-2">
                             {renderStars(request.roomDetails.note)}
                             <span className="fw-bold small text-secondary">{request.roomDetails.note}/5</span>
                        </div>
                    </div>
                    <div className="flex-grow-1"></div>
                    {/* Bouton animé pour aller voir la fiche complète de la salle */}
                    <button className="learn-more" onClick={() => navigate(`/salles/${request.roomDetails.id}`)}>
                      <span className="circle"><span className="icon arrow"></span></span>
                      <span className="button-text">Voir fiche salle</span>
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ReservationDetail;