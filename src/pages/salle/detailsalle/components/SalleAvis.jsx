import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

// Mock temporaire — à remplacer quand l'entité Commentaire sera complète
const MOCK_AVIS = [
  { id: 1, user: 'Marie D.',   note: 5, date: '12/01/2025', content: 'Salle impeccable, très bien équipée.' },
  { id: 2, user: 'Thomas R.',  note: 4, date: '08/01/2025', content: 'Bonne salle, accès facile.' },
  { id: 3, user: 'Sophie L.',  note: 3, date: '02/01/2025', content: 'Correct mais quelques équipements manquants.' },
  { id: 4, user: 'Paul M.',    note: 5, date: '28/12/2024', content: 'Parfait pour notre événement.' },
  { id: 5, user: 'Julie B.',   note: 4, date: '20/12/2024', content: 'Très agréable, personnel disponible.' },
  { id: 6, user: 'Marc T.',    note: 2, date: '15/12/2024', content: 'Déçu, la climatisation ne fonctionnait pas.' },
  { id: 7, user: 'Anna K.',    note: 5, date: '10/12/2024', content: 'Super expérience, on reviendra !' },
];

const ITEMS_PAR_PAGE = 6;

const RenderStars = ({ note, size = 14 }) => (
  <div className="d-flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} fill={i < note ? '#CC4040' : 'none'} color={i < note ? '#CC4040' : '#ADABAB'} />
    ))}
  </div>
);

const SalleAvis = () => {
  const [filter, setFilter]           = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const reviews  = MOCK_AVIS;
  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.note === parseInt(filter));
  const totalPages   = Math.ceil(filtered.length / ITEMS_PAR_PAGE);
  const currentItems = filtered.slice((currentPage - 1) * ITEMS_PAR_PAGE, currentPage * ITEMS_PAR_PAGE);
  const moyenne      = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.note, 0) / reviews.length).toFixed(1)
    : 0;

  const handleFilter = (val) => { setFilter(val); setCurrentPage(1); };

  return (
    <div className="card detail-salle-card">
      <div className="card-body p-4">

        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
          <div>
            <h4 className="detail-salle-section-title mb-1">Avis Adhérents</h4>
            <div className="d-flex align-items-center gap-2 text-muted">
              <span className="fs-3 fw-bold text-dark">{moyenne}</span>
              <RenderStars note={Math.round(moyenne)} />
              <span className="small">({reviews.length} avis)</span>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button onClick={() => handleFilter('all')} className={`btn btn-sm rounded-pill px-3 fw-bold ${filter === 'all' ? 'bg-dark text-white' : 'btn-light text-secondary'}`}>
              Tout
            </button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button key={star} onClick={() => handleFilter(star)} className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-1 ${parseInt(filter) === star ? 'bg-m2l-red text-white' : 'btn-light text-secondary'}`}>
                {star} <Star size={12} fill="currentColor" />
                <span className="opacity-75">({reviews.filter((r) => r.note === star).length})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="d-flex flex-column gap-3 mb-4">
          {currentItems.length > 0 ? currentItems.map((review) => (
            <div key={review.id} className="detail-salle-avis-item">
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="detail-salle-avis-avatar">{review.user.charAt(0)}</div>
                  <div>
                    <h6 className="mb-0 fw-bold fs-6">{review.user}</h6>
                    <span className="small text-muted">{review.date}</span>
                  </div>
                </div>
                <RenderStars note={review.note} />
              </div>
              <p className="mb-0 text-secondary small">{review.content}</p>
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
