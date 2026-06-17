import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

// Données factices en attendant que l'API gère vraiment les avis des adhérents.
// À remplacer par un appel à l'API une fois l'entité "Commentaire" disponible.
const MOCK_AVIS = [
  { id: 1, user: 'Marie D.',  note: 5, date: '12/01/2025', content: 'Salle impeccable, très bien équipée.' },
  { id: 2, user: 'Thomas R.', note: 4, date: '08/01/2025', content: 'Bonne salle, accès facile.' },
  { id: 3, user: 'Sophie L.', note: 3, date: '02/01/2025', content: 'Correct mais quelques équipements manquants.' },
  { id: 4, user: 'Paul M.',   note: 5, date: '28/12/2024', content: 'Parfait pour notre événement.' },
  { id: 5, user: 'Julie B.',  note: 4, date: '20/12/2024', content: 'Très agréable, personnel disponible.' },
  { id: 6, user: 'Marc T.',   note: 2, date: '15/12/2024', content: 'Déçu, la climatisation ne fonctionnait pas.' },
  { id: 7, user: 'Anna K.',   note: 5, date: '10/12/2024', content: 'Super expérience, on reviendra !' },
];

const AVIS_PAR_PAGE = 6;

// Affiche une note sous forme d'étoiles pleines/vides
const Etoiles = ({ note, size = 14 }) => (
  <div className="d-flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} fill={i < note ? '#CC4040' : 'none'} color={i < note ? '#CC4040' : '#ADABAB'} />
    ))}
  </div>
);

// Bloc "Avis Adhérents" : moyenne des notes, filtre par nombre d'étoiles, pagination
const SalleAvis = () => {
  const [filter, setFilter]           = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const avis            = MOCK_AVIS;
  const avisFiltres     = filter === 'all' ? avis : avis.filter((a) => a.note === parseInt(filter));
  const totalPages      = Math.ceil(avisFiltres.length / AVIS_PAR_PAGE);
  const avisPageActuelle = avisFiltres.slice((currentPage - 1) * AVIS_PAR_PAGE, currentPage * AVIS_PAR_PAGE);
  const moyenne          = avis.length > 0
    ? (avis.reduce((total, a) => total + a.note, 0) / avis.length).toFixed(1)
    : 0;

  // En changeant de filtre, on revient à la première page
  const handleFilter = (val) => { setFilter(val); setCurrentPage(1); };

  return (
    <div className="card detail-salle-card">
      <div className="card-body p-4">

        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
          <div>
            <h4 className="detail-salle-section-title mb-1">Avis Adhérents</h4>
            <div className="d-flex align-items-center gap-2 text-muted">
              <span className="fs-3 fw-bold text-dark">{moyenne}</span>
              <Etoiles note={Math.round(moyenne)} />
              <span className="small">({avis.length} avis)</span>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button onClick={() => handleFilter('all')} className={`btn btn-sm rounded-pill px-3 fw-bold ${filter === 'all' ? 'bg-dark text-white' : 'btn-light text-secondary'}`}>
              Tout
            </button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button key={star} onClick={() => handleFilter(star)} className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-1 ${parseInt(filter) === star ? 'bg-m2l-red text-white' : 'btn-light text-secondary'}`}>
                {star} <Star size={12} fill="currentColor" />
                <span className="opacity-75">({avis.filter((a) => a.note === star).length})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="d-flex flex-column gap-3 mb-4">
          {avisPageActuelle.length > 0 ? avisPageActuelle.map((a) => (
            <div key={a.id} className="detail-salle-avis-item">
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="detail-salle-avis-avatar">{a.user.charAt(0)}</div>
                  <div>
                    <h6 className="mb-0 fw-bold fs-6">{a.user}</h6>
                    <span className="small text-muted">{a.date}</span>
                  </div>
                </div>
                <Etoiles note={a.note} />
              </div>
              <p className="mb-0 text-secondary small">{a.content}</p>
            </div>
          )) : (
            <div className="text-center py-4 text-muted">
              <MessageSquare size={32} className="mb-2 opacity-25" />
              <p>Aucun avis trouvé.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center gap-2">
            <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1} className="btn btn-light btn-sm rounded-circle">
              <ChevronLeft size={16} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`btn btn-sm rounded-circle fw-bold detail-salle-page-btn ${currentPage === i + 1 ? 'bg-m2l-red text-white' : 'btn-light'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages} className="btn btn-light btn-sm rounded-circle">
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SalleAvis;
