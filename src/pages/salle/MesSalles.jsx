import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, MapPin, Star, Trophy, Briefcase, 
  ChevronRight, ArrowLeft 
} from 'lucide-react';

const MesSalles = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  // Données (Identiques à la liste des réservations)
  const salles = [
    { id: 1, nom: 'Salle Majorelle', adresse: 'Aile Nord, 1er Étage', type: 'reunion', cat: 'Réunion / Bureau', note: 5, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400' },
    { id: 2, nom: 'Salle Grüber', adresse: 'Aile Sud, RDC', type: 'reunion', cat: 'Grande Salle', note: 4, img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400' },
    { id: 3, nom: 'Amphithéâtre', adresse: 'Bâtiment Principal', type: 'reunion', cat: 'Conférence', note: 5, img: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=400' },
    { id: 4, nom: 'Salle Lamour', adresse: 'Gymnase A', type: 'sport', cat: 'Escrime / Polyvalent', note: 5, img: 'https://images.unsplash.com/photo-1627438202573-0e86b817d23f?auto=format&fit=crop&q=80&w=400' },
    { id: 5, nom: 'Salle 5', adresse: 'Gymnase B', type: 'sport', cat: 'Handball / Futsal', note: 4, img: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&q=80&w=400' },
    { id: 6, nom: 'Salle 6', adresse: 'Gymnase B', type: 'sport', cat: 'Volley-ball', note: 4, img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=400' },
    { id: 7, nom: 'Salle 7', adresse: 'Terrain Extérieur', type: 'sport', cat: 'Rugby / Athlétisme', note: 3, img: 'https://images.unsplash.com/photo-1533090631-338411005233?auto=format&fit=crop&q=80&w=400' },
  ];

  // Filtrage
  const filteredSalles = salles.filter(salle => {
    if (filter === 'all') return true;
    return salle.type === filter;
  });

  const renderStars = (note) => (
    <div className="d-flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < note ? "#CC4040" : "none"} color={i < note ? "#CC4040" : "#ADABAB"} />
      ))}
    </div>
  );

  return (
    <div className="d-flex flex-column h-100">

    {/* Header */}
      <div 
        className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-4 flex-shrink-0"
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
          Vos salles en gérance : {salles.length}
        </h2>
      </div>


      {/* Filtres + Bouton ajouter salles */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-shrink-0">
        
        {/* FILTRES (Plus grands) */}
        <div className="bg-white p-2 rounded-pill shadow-sm border d-inline-flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${filter === 'all' ? 'bg-m2l-dark text-white' : 'text-secondary hover-bg-light'}`}
            style={{ fontSize: '1rem' }}
          >
            Tout voir
          </button>
          <button 
            onClick={() => setFilter('sport')}
            className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 transition-all ${filter === 'sport' ? 'bg-m2l-red text-white' : 'text-secondary hover-bg-light'}`}
            style={{ fontSize: '1rem' }}
          >
            <Trophy size={18} /> Sports
          </button>
          <button 
            onClick={() => setFilter('reunion')}
            className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 transition-all ${filter === 'reunion' ? 'bg-m2l-red text-white' : 'text-secondary hover-bg-light'}`}
            style={{ fontSize: '1rem' }}
          >
            <Briefcase size={18} /> Evénements
          </button>
        </div>

        {/* Bouton + */}
        <button 
            className="btn rounded-circle d-flex align-items-center justify-content-center shadow text-white btn-add-hover"
            style={{ width: '50px', height: '50px', backgroundColor: '#CC4040', transition: '0.3s' }}
            title="Ajouter une salle"
        >
            <Plus size={28} />
        </button>

      </div>

      {/* Liste salles --- */}
      <div className="flex-grow-1 overflow-y-auto pb-4" style={{ minHeight: 0 }}>
        <div className="row g-4">
          {filteredSalles.map((salle) => (
            <div key={salle.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover-effect">
                
                {/* Image */}
                <div className="position-relative" style={{ height: '160px' }}>
                  <img src={salle.img} alt={salle.nom} className="w-100 h-100 object-fit-cover" />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className={`badge rounded-pill shadow-sm ${salle.type === 'sport' ? 'bg-warning text-dark' : 'bg-info text-white'}`}>
                      {salle.cat}
                    </span>
                  </div>
                </div>

                {/* Corps */}
                <div className="card-body d-flex flex-column p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold text-dark mb-0 text-truncate" title={salle.nom}>{salle.nom}</h5>
                  </div>
                  
                  <div className="d-flex align-items-center text-secondary small mb-3">
                    <MapPin size={14} className="me-1 text-danger" />
                    {salle.adresse}
                  </div>

                  <div className="mb-3">
                    {renderStars(salle.note)}
                  </div>

                  <div className="mt-auto pt-3 border-top">
                    <button 
                      onClick={() => navigate(`/salles/${salle.id}`)}
                      className="btn btn-light w-100 rounded-pill d-flex align-items-center justify-content-between px-3 group-hover-btn"
                      style={{ backgroundColor: '#f8f9fa' }}
                    >
                      <span className="fw-bold small text-secondary">Voir détails</span>
                      <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{width:'24px', height:'24px'}}>
                         <ChevronRight size={14} className="text-dark" />
                      </div>
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