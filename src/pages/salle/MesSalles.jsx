import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Star, Trophy, Briefcase, ChevronRight, ArrowLeft } from 'lucide-react';



import { sallesData } from '../data/salleData'; 

const MesSalles = () => {
  const navigate = useNavigate();
  
  // 1. ÉTAT DU FILTRE
  // 'all' par défaut, peut passer à 'sport' ou 'reunion'
  const [filter, setFilter] = useState('all');

  // LOGIQUE DE FILTRAGE : On filtre le tableau importé selon l'état 'filter'
  const filteredSalles = sallesData.filter(salle => {
    if (filter === 'all') return true;
    return salle.type === filter;
  });

  // Rendu des étoiles 
  const renderStars = (note) => (
    <div className="d-flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < note ? "#CC4040" : "none"} color={i < note ? "#CC4040" : "#ADABAB"} />
      ))}
    </div>
  );

  return (
    <div className="d-flex flex-column h-100">
      
      {/* HEADER  */}
      <div className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-4 flex-shrink-0" style={{ backgroundColor: '#430000' }}>
        <h2 className="text-white fw-bold m-0 fs-4 text-uppercase" style={{ letterSpacing: '1px' }}>
          Vos salles en gérance : {sallesData.length}
        </h2>
      </div>

      {/* 3. BARRE D'ACTIONS (Filtres + Bouton Ajouter) */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-shrink-0">
        
        {/* Groupe de boutons de filtrage  */}
        <div className="bg-white p-2 rounded-pill shadow-sm border d-inline-flex gap-2">
          <button onClick={() => setFilter('all')} className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${filter === 'all' ? 'bg-m2l-dark text-white' : 'text-secondary hover-bg-light'}`}>Tout voir</button>
          <button onClick={() => setFilter('sport')} className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 transition-all ${filter === 'sport' ? 'bg-m2l-red text-white' : 'text-secondary hover-bg-light'}`}><Trophy size={18} /> Sports</button>
          <button onClick={() => setFilter('reunion')} className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 transition-all ${filter === 'reunion' ? 'bg-m2l-red text-white' : 'text-secondary hover-bg-light'}`}><Briefcase size={18} /> Evénements</button>
        </div>

        {/* Bouton d'ajout avec animation personnalisée */}
        <button className="btn-smart-add" title="Ajouter une salle" onClick={() => navigate('/salle/ajouter')}>
          <div className="icon-plus d-flex align-items-center justify-content-center"><Plus size={28} color="#ffffff" /></div>
          <span className="btn-text text-white fw-bold">Ajouter une salle</span>
        </button>
      </div>

      {/* 4. GRILLE DES SALLES (Scrollable) */}
      <div className="flex-grow-1 overflow-y-auto pb-4" style={{ minHeight: 0 }}>
        <div className="row g-4">
          {filteredSalles.map((salle) => (
            // Layout Responsive : 1 par ligne sur mobile, 4 par ligne sur très grand écran
            <div key={salle.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover-effect">
                
                {/* Image & Badge de catégorie (Sport ou Bureau) */}
                <div className="position-relative" style={{ height: '160px' }}>
                  <img src={salle.images[0]} alt={salle.nom} className="w-100 h-100 object-fit-cover" />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className={`badge rounded-pill shadow-sm fw-light ${salle.type === 'sport' ? 'bg-m2l-grey text-white' : 'bg-m2l-red text-white'}`}>
                      {salle.cat}
                    </span>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="card-body d-flex flex-column p-3">
                  <h5 className="fw-bold text-dark mb-0 text-truncate" title={salle.nom}>{salle.nom}</h5>
                  
                  <div className="d-flex align-items-center text-secondary small mb-3">
                    <MapPin size={14} className="me-1 text-danger" />
                    {salle.ville || salle.adresse} 
                  </div>

                  <div className="mb-3">
                    {renderStars(salle.note)}
                  </div>

                  {/* Bouton "Voir détails"  */}
                  <div className="mt-auto pt-3 border-top">
                    <button className="learn-more" onClick={() => navigate(`/salles/${salle.id}`)}>
                      <span className="circle" aria-hidden="true"><span className="icon arrow"></span></span>
                      <span className="button-text">Voir détails</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MesSalles;