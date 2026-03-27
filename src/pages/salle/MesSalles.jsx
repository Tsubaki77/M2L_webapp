import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Trophy, Briefcase, Loader2, Trash2 } from 'lucide-react';
import { api } from '../../utils/api';

const MesSalles = () => {
  const navigate = useNavigate();
  const isSuperAdmin = api.isSuperAdmin();

  const [salles, setSalles]       = useState([]);
  const [filter, setFilter]       = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState('');

  useEffect(() => {
    const fetchSalles = isSuperAdmin ? api.getSalles : api.getMesSalles;
    fetchSalles()
      .then(setSalles)
      .catch(() => setError('Impossible de charger les salles.'))
      .finally(() => setIsLoading(false));
  }, [isSuperAdmin]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm('Supprimer cette salle ?')) return;
    try {
      await api.deleteSalle(id);
      setSalles((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression.');
    }
  };

  const filteredSalles = salles.filter((s) => {
    if (filter === 'all') return true;
    return s.typeSalle?.categorie === filter;
  });

  return (
    <div className="mes-salles-wrapper">

      <div className="page-header mb-4">
        <h2 className="page-header-title">
          {isSuperAdmin ? 'Toutes les salles' : 'Vos salles en gérance'} : {salles.length}
        </h2>
      </div>

      <div className="mes-salles-actions">
        <div className="mes-salles-filtres">
          <button onClick={() => setFilter('all')} className={`btn rounded-pill px-4 py-2 fw-bold ${filter === 'all' ? 'bg-m2l-dark text-white' : 'text-secondary'}`}>
            Tout voir
          </button>
          <button onClick={() => setFilter('sport')} className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 ${filter === 'sport' ? 'bg-m2l-red text-white' : 'text-secondary'}`}>
            <Trophy size={16} /> Sports
          </button>
          <button onClick={() => setFilter('evenement')} className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 ${filter === 'evenement' ? 'bg-m2l-red text-white' : 'text-secondary'}`}>
            <Briefcase size={16} /> Événements
          </button>
        </div>

        <button className="btn-smart-add" title="Ajouter une salle" onClick={() => navigate('/salle/ajouter')}>
          <div className="icon-plus d-flex align-items-center justify-content-center">
            <Plus size={26} color="#ffffff" />
          </div>
          <span className="btn-text text-white fw-bold">Ajouter une salle</span>
        </button>
      </div>

      <div className="mes-salles-grid-wrapper">
        {isLoading && (
          <div className="mes-salles-state">
            <Loader2 size={32} className="spinner-icon text-muted" />
            <p className="text-muted mt-3">Chargement...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="mes-salles-state">
            <p className="text-danger fw-bold">{error}</p>
          </div>
        )}

        {!isLoading && !error && salles.length === 0 && (
          <div className="mes-salles-empty">
            <div className="mes-salles-empty-icon">🏟️</div>
            <h5 className="fw-bold text-dark mb-2">Aucune salle pour le moment</h5>
            <p className="text-muted mb-4">Créez votre première salle pour commencer.</p>
          </div>
        )}

        {!isLoading && !error && filteredSalles.length > 0 && (
          <div className="row g-4">
            {filteredSalles.map((salle) => (
              <div key={salle.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover-effect">
                  <div className="mes-salles-card-img">
                    <img
                      src={salle.photo ? `http://localhost:8000${salle.photo}` : '/assets/estetic/salle-placeholder.png'}
                      alt={salle.nom}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span className={`mes-salles-badge ${salle.typeSalle?.categorie === 'sport' ? 'bg-m2l-grey' : 'bg-m2l-red'} text-white`}>
                      {salle.typeSalle?.libelle ?? '—'}
                    </span>
                    {isSuperAdmin && (
                      <button
                        className="mes-salles-delete-btn"
                        title="Supprimer"
                        onClick={(e) => handleDelete(e, salle.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column p-3">
                    <h5 className="fw-bold text-dark mb-0 text-truncate" title={salle.nom}>
                      {salle.nom}
                    </h5>
                    <div className="d-flex align-items-center text-secondary small mb-3">
                      <MapPin size={14} className="me-1 text-danger" />
                      {salle.ville ? `${salle.adresse}, ${salle.ville}` : salle.adresse}
                    </div>
                    <div className="mt-auto pt-3 border-top">
                      <button className="learn-more" onClick={() => navigate(`/salles/${salle.id}`)}>
                        <span className="circle" aria-hidden="true"><span className="icon arrow" /></span>
                        <span className="button-text">Voir détails</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && salles.length > 0 && filteredSalles.length === 0 && (
          <div className="mes-salles-state">
            <p className="text-muted">Aucune salle ne correspond à ce filtre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesSalles;
