import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, Users, Ruler, Star, CheckCircle2, 
  ChevronLeft, ChevronRight, CalendarCheck, ArrowLeft, Trophy, Building2, LayoutGrid, MessageSquare, Pencil, History, UserCog
} from 'lucide-react';
import { sallesData } from '../data/salleData'; 

const DetailSalles = () => {
  // 1. PARAMÈTRES ET NAVIGATION
  const { id } = useParams(); // Récupère l'ID depuis l'URL (ex: /salles/1)
  const navigate = useNavigate();

  // 2. ÉTATS (STATES)
  const [salle, setSalle] = useState(null); // Données de la salle actuelle
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Index pour le carrousel d'images

  // ÉTATS RÉTABLIS (GESTION DES AVIS) 
  const [reviews, setReviews] = useState([]); // Liste des commentaires
  const [filterRating, setFilterRating] = useState('all'); // Filtre par note (1-5)
  const [currentPage, setCurrentPage] = useState(1); // Pagination des avis
  const itemsPerPage = 6;

  // Mock Data : Historique des modifications (Administration) à voir avec l'API si on fait 
  const logs = [
    { date: '12/10/2025', user: 'ADMIN', action: 'MISE À JOUR ÉQUIPEMENTS' },
    { date: '05/09/2025', user: 'J. DUPONT', action: 'MODIFICATION CAPACITÉ' },
    { date: '01/09/2025', user: 'ADMIN', action: 'CRÉATION DE LA FICHE' },
    { date: '15/08/2025', user: 'ADMIN', action: 'AJOUT PHOTOS' },
    { date: '10/08/2025', user: 'SYSTEM', action: 'MAINTENANCE' }
  ];

  // 3. CHARGEMENT DES DONNÉES
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = sallesData.find(s => s.id === parseInt(id));
      if (found) {
          setSalle(found);
          setReviews(found.commentaires || []);
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  // 4. LOGIQUE DES FILTRES ET PAGINATION
  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => r.note === parseInt(filterRating));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleFilterChange = (rating) => {
    setFilterRating(rating);
    setCurrentPage(1); // Reset à la page 1 lors d'un changement de filtre
  };

  // Calcul de la moyenne dynamique des avis
  const dynamicAverage = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.note, 0) / reviews.length).toFixed(1) 
    : (salle ? salle.note : 0);

  // 5. LOGIQUE DU CARROUSEL (affiché uniquement si plus de 2 images)
  const nextSlide = () => { if (!salle) return; setActiveIndex((prev) => (prev === salle.images.length - 1 ? 0 : prev + 1)); };
  const prevSlide = () => { if (!salle) return; setActiveIndex((prev) => (prev === 0 ? salle.images.length - 1 : prev - 1)); };

  // Rendu des étoiles pour la note (rempli ou vide selon la note)
  const renderStars = (note, size = 18) => (
    <div className="d-flex justify-content-center">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} fill={i < note ? "#CC4040" : "none"} color={i < note ? "#CC4040" : "#ADABAB"} />
      ))}
    </div>
  );

  // 6. SÉCURITÉ : États de chargement et d'erreur
  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-danger"></div></div>;
  if (!salle) return <div className="p-5 text-center"><h3>Salle introuvable</h3></div>;

  // On affiche le carrousel uniquement s'il y a plus de 2 images, sinon grille simple
  const showCarousel = salle.images.length > 2;

  return (
    <div className="d-flex flex-column h-100 overflow-hidden">
      <div className="flex-grow-1 overflow-y-auto custom-scroll overflow-x-hidden">
         <div className="container-fluid px-4 mt-3 pb-5">

            {/* HEADER */}
            <div className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-4" style={{ backgroundColor: '#430000' }}>
                <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h2 className="text-white fw-bold m-0 fs-3 mb-1">{salle.nom}</h2>
                            <div className="text-white-50 d-flex align-items-center small">
                                <MapPin size={14} className="me-1" /> {salle.adresse}
                            </div>
                        </div>
                        <div className="d-none d-md-block">
                            <span className="badge rounded-pill px-3 py-2 bg-white text-dark shadow-sm">
                                {salle.type === 'sport' ? <Trophy size={16} className="me-2 mb-1"/> : <Building2 size={16} className="me-2 mb-1"/>}
                                {salle.cat || (salle.type === 'sport' ? 'Sport' : 'Espace Pro')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIEN RETOUR */}
            <Link to="/mes_salles" className="btn-back-link d-inline-flex align-items-center text-decoration-none text-secondary mb-3 ps-2 pe-3 py-1 rounded small">
                <ArrowLeft size={16} className="me-2"/>Retour à mes salles
            </Link>

            {/* ZONE IMAGES (Carousel ou Grille) */}
            <div className="mb-4">
                {showCarousel ? (
                <div className="position-relative rounded-4 overflow-hidden shadow" style={{ height: '450px', backgroundColor: '#212529' }}>
                    <img src={salle.images[activeIndex]} alt="Vue salle" className="w-100 h-100 object-fit-cover" />
                    <button onClick={prevSlide} className="btn position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle bg-white shadow-sm p-2 border-0"><ChevronLeft size={24} /></button>
                    <button onClick={nextSlide} className="btn position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle bg-white shadow-sm p-2 border-0"><ChevronRight size={24} /></button>
                </div>
                ) : (
                <div className="row g-4">
                    {salle.images.map((img, index) => (
                        <div key={index} className="col-md-6"> 
                            <div className="card border-0 shadow-sm h-100 overflow-hidden rounded-4" style={{ height: '350px' }}>
                                <img src={img} alt="Vue" className="w-100 h-100 object-fit-cover hover-zoom" />
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>

            <div className="row g-4">
                {/* COLONNE GAUCHE : CARACTÉRISTIQUES ET AVIS */}
                <div className="col-lg-8">
                    <div className="card shadow border-0 mb-4" style={{ borderRadius: '16px', borderTop: '4px solid #CC4040' }}>
                        <div className="card-body p-4">
                            <h4 className="fw-bold mb-4 text-center" style={{ color: '#430000' }}>Caractéristiques</h4>
                            {/* Grille des stats de la salle */}
                            <div className="row gy-4 mb-4">
                                <div className="col-md-6 text-center"><div className="text-secondary small fw-bold mb-1 text-uppercase">Capacité</div><p className="fs-5 fw-bold text-dark mb-0">{salle.capacite} personnes</p></div>
                                <div className="col-md-6 text-center"><div className="text-secondary small fw-bold mb-1 text-uppercase">Superficie</div><p className="fs-5 fw-bold text-dark mb-0">{salle.superficie}</p></div>
                                <div className="col-md-6 text-center"><div className="text-secondary small fw-bold mb-1 text-uppercase">Ville</div><p className="text-dark mb-0 fw-medium">{salle.ville}</p></div>
                                <div className="col-md-6 text-center"><div className="text-secondary small fw-bold mb-1 text-uppercase">Avis Global</div>{renderStars(Math.round(dynamicAverage))}</div>
                            </div>
                            <hr className="text-muted opacity-25 my-4" />
                            <div className="mb-4">
                                <h6 className="fw-bold text-dark text-uppercase mb-3">Description</h6>
                                <p className="text-secondary" style={{ lineHeight: '1.6' }}>{salle.description}</p>
                            </div>
                            
                            {/* ÉQUIPEMENTS (Badge scrollable horizontalement) */}
                            <div>
                                <h6 className="fw-bold text-dark mb-3 text-uppercase">Équipements inclus</h6>
                                <div className="d-flex flex-nowrap gap-2 pb-3 custom-scroll-horizontal" style={{ overflowX: 'auto' }}>
                                    {salle.equipements && salle.equipements.map((eq, i) => (
                                        <span key={i} className="badge bg-light text-secondary border rounded-pill py-2 px-3 fw-normal d-flex align-items-center flex-shrink-0">
                                            <CheckCircle2 size={14} className="me-2 text-success"/> {eq}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION AVIS AVEC FILTRAGE PAR ÉTOILE */}
                    <div className="card shadow border-0" style={{ borderRadius: '16px' }}>
                        <div className="card-body p-4">
                            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
                                <div>
                                    <h4 className="fw-bold mb-1" style={{ color: '#430000' }}>Avis Adhérents</h4>
                                    <div className="d-flex align-items-center text-muted">
                                        <span className="fs-3 fw-bold text-dark me-2">{dynamicAverage}</span>
                                        <div className="me-2">{renderStars(Math.round(dynamicAverage), 14)}</div>
                                        <span className="small">({reviews.length} avis)</span>
                                    </div>
                                </div>
                                {/* Boutons de filtrage selon étoiles données */}
                                <div className="d-flex flex-wrap gap-2">
                                    <button onClick={() => handleFilterChange('all')} className={`btn btn-sm rounded-pill px-3 fw-bold ${filterRating === 'all' ? 'bg-dark text-white' : 'btn-light text-secondary'}`}>Tout</button>
                                    {[5, 4, 3, 2, 1].map(star => {
                                        const count = reviews.filter(r => r.note === star).length;
                                        return (
                                            <button key={star} onClick={() => handleFilterChange(star)} className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-1 ${parseInt(filterRating) === star ? 'bg-danger text-white' : 'btn-light text-secondary'}`}>
                                                {star} <Star size={12} fill="currentColor"/> <span className="opacity-75">({count})</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Liste des avis paginée */}
                            <div className="d-flex flex-column gap-3 mb-4">
                                {currentReviews.length > 0 ? currentReviews.map((review) => (
                                    <div key={review.id} className="p-3 rounded-3 bg-light border-0">
                                        <div className="d-flex justify-content-between mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold small" style={{ width: '32px', height: '32px' }}>{review.user.charAt(0)}</div>
                                                <div><h6 className="mb-0 fw-bold fs-6">{review.user}</h6><span className="small text-muted">{review.date}</span></div>
                                            </div>
                                            <div>{renderStars(review.note, 14)}</div>
                                        </div>
                                        <p className="mb-0 text-secondary small">{review.content}</p>
                                    </div>
                                )) : <div className="text-center py-4 text-muted"><MessageSquare size={32} className="mb-2 opacity-25" /><p>Aucun avis trouvé.</p></div>}
                            </div>
                            {/* Contrôles de pagination */}
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center gap-2">
                                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-light btn-sm rounded-circle"><ChevronLeft size={16} /></button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} onClick={() => paginate(i + 1)} className={`btn btn-sm rounded-circle fw-bold ${currentPage === i + 1 ? 'bg-danger text-white' : 'btn-light'}`} style={{ width: '32px', height: '32px' }}>{i + 1}</button>
                                    ))}
                                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-light btn-sm rounded-circle"><ChevronRight size={16} /></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- COLONNE DROITE STICKY : ACTIONS ET ADMIN --- */}
                <div className="col-lg-4">
                    <div className="sticky-top d-flex flex-column gap-4" style={{ top: '20px', zIndex: 10 }}>
                        {/* ACCÈS AU PLANNING */}
                        <div className="card shadow-sm border-0 w-100" style={{ borderRadius: '16px', backgroundColor: '#FAFAFA' }}>
                            <div className="card-body p-4 text-center">
                                <h5 className="fw-bold mb-3 text-uppercase" style={{ color: '#430000' }}>Disponibilité</h5>
                                {/* IMPORTANT : On passe le nom de la salle en 'state' pour filtrer le calendrier automatiquement */}
                                <button 
                                  onClick={() => navigate('/calendrier', { state: { salleNom: salle.nom } })} 
                                  className="btn w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2" 
                                  style={{ backgroundColor: '#770505', color: '#FFF', borderRadius: '12px' }}
                                >
                                    <CalendarCheck size={20} /> CONSULTER LE PLANNING
                                </button>
                            </div>
                        </div>

                        {/* SECTION ADMINISTRATION ET HISTORIQUE LOGS */}
                        <div className="card shadow-sm border-0 w-100" style={{ borderRadius: '16px', backgroundColor: '#FAFAFA' }}>
                            <div className="card-body p-4 d-flex flex-column" style={{ maxHeight: '550px' }}>
                                <h5 className="fw-bold text-uppercase mb-4 text-center" style={{ color: '#430000' }}>Administration</h5>
                                <button className="editBtn-mixed" onClick={() => navigate(`/salles/modifier/${salle.id}`)}>
                                    <span className="text-content">MODIFIER LA FICHE SALLE</span>
                                    <svg className="svg-pen" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>
                                </button>
                                
                                <h6 className="fw-bold text-secondary text-uppercase small mb-4 text-center"><History size={16} className="me-2"/> Historique</h6>
                                {/* Fil d'actualité des modifications */}
                                <div className="custom-scroll pe-2" style={{ overflowY: 'auto', flexGrow: 1 }}>
                                    {logs.map((log, index) => (
                                        <div key={index} className="d-flex gap-3 mb-4">
                                            <div className="d-flex flex-column align-items-center" style={{ width: '40px' }}>
                                                <div className="rounded-circle bg-white border d-flex align-items-center justify-content-center flex-shrink-0" style={{width:'36px', height:'36px'}}><UserCog size={16} className="text-secondary"/></div>
                                                {index !== logs.length - 1 && <div style={{ width: '2px', backgroundColor: '#e0e0e0', flexGrow: 1, minHeight: '30px' }}></div>}
                                            </div>
                                            <div className="pt-1">
                                                <p className="mb-0 fw-bold text-dark text-uppercase small">{log.action}</p>
                                                <p className="mb-0 text-muted text-uppercase" style={{fontSize: '0.7rem'}}>{log.user} • {log.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DetailSalles;