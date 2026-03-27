import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Trophy, Building2 } from 'lucide-react';
import { api } from '../../../utils/api';
import SalleCaracteristiques from './components/SalleCaracteristiques';
import SalleAvis from './components/SalleAvis';
import SalleAdministration from './components/SalleAdministration';

const DetailSalles = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [salle, setSalle]         = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState('');

  const fetchSalle = useCallback(() => {
    setIsLoading(true);
    api.getSalle(id)
      .then(setSalle)
      .catch(() => setError('Impossible de charger cette salle.'))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => { fetchSalle(); }, [fetchSalle]);

  const handleHoraireStatutChange = (horaireId, nouveauStatut) => {
    setSalle((prev) => ({
      ...prev,
      horaires: prev.horaires.map((h) =>
        h.id === horaireId ? { ...h, statut: nouveauStatut } : h
      ),
    }));
  };

  if (isLoading) return (
    <div className="detail-salle-state">
      <div className="spinner-border" style={{ color: 'var(--m2l-red)' }} />
    </div>
  );

  if (error || !salle) return (
    <div className="detail-salle-state">
      <h3 className="text-muted">{error || 'Salle introuvable'}</h3>
      <button className="btn bg-m2l-red text-white rounded-pill mt-3" onClick={() => navigate('/mes_salles')}>
        Retour à mes salles
      </button>
    </div>
  );

  const estSport = salle.typeSalle?.categorie === 'sport';

  return (
    <div className="detail-salle-wrapper">
      <div className="detail-salle-scroll custom-scroll">
        <div className="container-fluid px-4 mt-3 pb-5">

          <div className="page-header mb-4">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="page-header-title mb-1">{salle.nom}</h2>
                  <div className="detail-salle-header-adresse">
                    <MapPin size={13} className="me-1" /> {salle.adresse}{salle.ville ? `, ${salle.ville}` : ''}
                  </div>
                </div>
                <span className="badge rounded-pill px-3 py-2 bg-white text-dark shadow-sm d-none d-md-flex align-items-center gap-1">
                  {estSport ? <Trophy size={15} /> : <Building2 size={15} />}
                  {salle.typeSalle?.libelle ?? '—'}
                </span>
              </div>
            </div>
          </div>

          <Link to="/mes_salles" className="detail-salle-back-link mb-3 d-inline-flex align-items-center gap-2">
            <ArrowLeft size={15} /> Retour à mes salles
          </Link>

          <div className="detail-salle-photo mb-4">
            <img
              src={salle.photo ? `http://localhost:8000${salle.photo}` : '/assets/estetic/salle-placeholder.png'}
              alt={salle.nom}
              className="w-100 h-100 object-fit-cover"
            />
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <SalleCaracteristiques
                salle={salle}
                onHoraireStatutChange={handleHoraireStatutChange}
              />
              <div className="mt-4">
                <SalleAvis />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="detail-salle-sticky">
                <SalleAdministration salle={salle} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailSalles;
