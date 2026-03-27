import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../../../../utils/api';

const SalleCaracteristiques = ({ salle, onHoraireStatutChange }) => {
  const isSuperAdmin = api.isSuperAdmin();

  const handleToggleStatut = async (horaire) => {
    const nouveauStatut = horaire.statut === 'ouvert' ? 'ferme' : 'ouvert';
    try {
      await api.updateHoraireStatut(horaire.id, nouveauStatut);
      onHoraireStatutChange?.(horaire.id, nouveauStatut);
    } catch (err) {
      alert(err.message || 'Erreur lors de la mise à jour.');
    }
  };

  return (
    <div className="card detail-salle-card">
      <div className="card-body p-4">
        <h4 className="detail-salle-section-title">Caractéristiques</h4>

        <div className="row gy-4 mb-4">
          <div className="col-md-6 text-center">
            <div className="detail-salle-stat-label">Capacité</div>
            <div className="detail-salle-stat-value">{salle.capacite} personnes</div>
          </div>
          <div className="col-md-6 text-center">
            <div className="detail-salle-stat-label">Ville</div>
            <div className="detail-salle-stat-value">{salle.ville ?? '—'}</div>
          </div>
          <div className="col-md-6 text-center">
            <div className="detail-salle-stat-label">Adresse</div>
            <div className="detail-salle-stat-value">{salle.adresse}</div>
          </div>
          <div className="col-md-6 text-center">
            <div className="detail-salle-stat-label">Type</div>
            <div className="detail-salle-stat-value">{salle.typeSalle?.libelle ?? '—'}</div>
          </div>
        </div>

        <hr className="opacity-25 my-4" />

        {salle.description && (
          <div className="mb-4">
            <h6 className="detail-salle-sub-title">Description</h6>
            <p className="text-secondary">{salle.description}</p>
          </div>
        )}

        {salle.equipements?.length > 0 && (
          <div className="mb-4">
            <h6 className="detail-salle-sub-title">Équipements inclus</h6>
            <div className="d-flex flex-nowrap gap-2 pb-2 custom-scroll" style={{ overflowX: 'auto' }}>
              {salle.equipements.map((eq, i) => (
                <span key={i} className="badge bg-light text-secondary border rounded-pill py-2 px-3 fw-normal d-flex align-items-center flex-shrink-0">
                  <CheckCircle2 size={13} className="me-2 text-success" /> {eq}
                </span>
              ))}
            </div>
          </div>
        )}

        {salle.horaires?.length > 0 && (
          <div>
            <h6 className="detail-salle-sub-title">Horaires d'ouverture</h6>
            <div className="d-flex flex-column gap-1">
              {[...salle.horaires].map((h) => (
                <div key={h.id} className="detail-salle-horaire-row">
                  <span className="detail-salle-horaire-jour">{h.jour}</span>
                  {h.statut === 'ouvert' ? (
                    <span className="detail-salle-horaire-heures">
                      {h.heureOuverture?.slice(0, 5)} → {h.heureFermeture?.slice(0, 5)}
                    </span>
                  ) : (
                    <span className="detail-salle-horaire-ferme">Fermé</span>
                  )}
                  <span
                    className={`badge rounded-pill ms-2 ${h.statut === 'ouvert' ? 'bg-success' : 'bg-secondary'}`}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {h.statut === 'ouvert' ? 'Ouvert' : 'Fermé'}
                  </span>
                  <button
                    className="btn btn-sm btn-light ms-2 rounded-pill"
                    style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                    onClick={() => handleToggleStatut(h)}
                    title={h.statut === 'ouvert' ? 'Fermer ce jour' : 'Rouvrir ce jour'}
                  >
                    {h.statut === 'ouvert' ? 'Fermer' : 'Rouvrir'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalleCaracteristiques;
