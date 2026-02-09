import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, Trophy, Briefcase, Calendar, Clock, 
  MapPin, Users, Activity, Info, Check, X, ChevronRight 
} from 'lucide-react';

const ReservationDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); 

      // A changer par logique API
      const mockDatabase = [
        { 
            id: 1, 
            roomName: 'Salle Majorelle', 
            league: 'Ligue de Football', 
            user: 'Jean Dupont', 
            email: 'jean.dupont@liguefoot.fr',
            role: 'Coach', 
            sport: 'Futsal',
            date_debut: '12/10/2024',
            date_fin: '12/10/2024', 
            timeStart: '16:00', timeEnd: '18:00',
            desc: "Entrainement U15-U16.",
            address: 'Aile Nord, 1er Étage',
            capacity: 45
        },
        { 
            id: 2, 
            roomName: 'Salle Grüber', 
            league: 'Ligue de Tennis', 
            user: 'Marie Curry', 
            email: 'marie.curry@liguetennis.fr',
            role: 'Trésorière', 
            sport: 'Tennis',
            date_debut: '14/10/2024',
            date_fin: '14/10/2024',
            timeStart: '09:00', timeEnd: '12:00',
            desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            address: 'Aile Sud, RDC',
            capacity: 120
        },
        
      ];

      // Recherche de l'élément correspondant à l'ID de l'URL ---
      // On convertit id en nombre avec parseInt 
      const foundItem = mockDatabase.find(item => item.id === parseInt(id));

      if (foundItem) {
        // --- 3. Mapping ---
        setRequest({
          id: foundItem.id,
          user: {
            name: foundItem.user,
            role: foundItem.role,
            email: foundItem.email || 'contact@ligue.fr',
            avatar: '' 
          },
          league: foundItem.league,
          sport: foundItem.sport,
          description: foundItem.desc,
          date_debut: foundItem.date_debut,
          date_fin: foundItem.date_fin,
          timeStart: foundItem.timeStart,
          timeEnd: foundItem.timeEnd,
          room: {
            id: 101 + foundItem.id, // ID fictif pour la salle
            name: foundItem.roomName,
            address: foundItem.address,
            capacity: foundItem.capacity,
            image: '#' 
          }
        });
      } else {
        // Si l'ID n'existe pas dans base mockée, on met null (ou un objet par défaut)
        setRequest(null);
      }

      setIsLoading(false);
    };

    fetchDetail();
  }, [id]);

  if (isLoading) return <div className="p-5 text-center text-muted">Chargement...</div>;
  
  // Gestion du cas "ID introuvable" (ex: /demandes/999)
  if (!request) return (
      <div className="p-5 text-center">
          <p className="text-danger fw-bold">Demande introuvable.</p>
          <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-sm">Retour</button>
      </div>
  );

  return (
    <div className="d-flex flex-column h-100 overflow-hidden">
      
      {/* --- Header --- */}
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
            Consultez le détail de la demande de réservation # {request.id}
            </h2>
        </div>

      <div className="row g-4 flex-grow-1 overflow-y-auto pb-4">
          
          {/* Colonne Gauche - La demande */}
          <div className="col-lg-8">
             <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-4 text-m2l-dark border-bottom pb-2">Informations Générales</h5>
                    
                    {/* Demandeur */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-6">
                            <div className="d-flex gap-3">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                    <User size={24} className="text-secondary" />
                                </div>
                                <div>
                                    <p className="small text-muted mb-0 fw-bold text-uppercase">Demandeur</p>
                                    <p className="fw-bold text-dark mb-0 fs-5">{request.user.name}</p>
                                    <p className="small text-muted mb-0">{request.user.email}</p>
                                </div>
                            </div>
                        </div>
                        {/* Reste des infos demandeur */}
                        <div className="col-md-6">
                            <div className="d-flex gap-3">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                    <Trophy size={24} className="text-secondary" />
                                </div>
                                <div>
                                    <p className="small text-muted mb-0 fw-bold text-uppercase">Ligue & Rôle</p>
                                    <p className="fw-bold text-m2l-red mb-0 fs-5">{request.league}</p>
                                    <div className="d-flex align-items-center gap-1 text-muted small">
                                        <Briefcase size={12} />
                                        <span>{request.user.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h5 className="fw-bold mb-4 text-m2l-dark border-bottom pb-2">Détails de l'activité</h5>
                    <div className="row g-4 mb-4">
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <div className="d-flex align-items-center gap-2 mb-2 text-secondary"><Activity size={18} /><span className="fw-bold small">SPORT</span></div>
                                <p className="mb-0 fw-bold">{request.sport}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <div className="d-flex align-items-center gap-2 mb-2 text-secondary"><Calendar size={18} /><span className="fw-bold small">DATE</span></div>
                                <p className="mb-0 fw-bold">{request.date_debut} - {request.date_fin}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                                <div className="d-flex align-items-center gap-2 mb-2 text-secondary"><Clock size={18} /><span className="fw-bold small">CRÉNEAU</span></div>
                                <p className="mb-0 fw-bold">{request.timeStart} - {request.timeEnd}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="small text-muted fw-bold text-uppercase mb-2"> <Info size={14} className="me-1"/> Description</p>
                        <div className="p-3 bg-light rounded-3 border-start border-4 border-danger text-dark">"{request.description}"</div>
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
                    <h4 className="fw-bold mb-1">{request.room.name}</h4>
                    <span className="badge bg-white text-dark bg-opacity-75">Salle demandée</span>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                    <div className="mb-4">
                        <label className="small text-muted fw-bold mb-1">ADRESSE</label>
                        <p className="fw-semibold text-dark mb-0">{request.room.address}</p>
                    </div>
                    <div className="mb-4">
                        <label className="small text-muted fw-bold mb-1">CAPACITÉ</label>
                        <div className="d-flex align-items-center gap-2"><Users size={20} className="text-m2l-red"/><span className="fs-5 fw-bold">{request.room.capacity} personnes</span></div>
                    </div>
                    <div className="flex-grow-1"></div>
                    <button onClick={() => navigate(`/salles/${request.room.id}`)} className="btn w-100 py-3 rounded-3 d-flex align-items-center justify-content-between text-white mt-3" style={{ backgroundColor: '#ADABAB' }}>
                        <span className="fw-bold">Voir la fiche salle</span><ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ReservationDetail;