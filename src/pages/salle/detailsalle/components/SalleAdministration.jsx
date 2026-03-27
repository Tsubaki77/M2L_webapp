import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, History, UserCog, Trash2 } from 'lucide-react';
import { api } from '../../../../utils/api';

const SalleAdministration = ({ salle, onDelete }) => {
  const navigate     = useNavigate();
  const isSuperAdmin = api.isSuperAdmin();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Supprimer définitivement la salle "${salle.nom}" ?`)) return;
    setDeleting(true);
    try {
      await api.deleteSalle(salle.id);
      onDelete?.();
      navigate('/mes_salles');
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression.');
      setDeleting(false);
    }
  };

  const logs = [
    salle.createdAt && {
      date:   new Date(salle.createdAt).toLocaleDateString('fr-FR'),
      action: 'Création de la fiche',
      user:   salle.gestionnaire?.identifiant ?? 'Gestionnaire',
    },
    salle.updatedAt && {
      date:   new Date(salle.updatedAt).toLocaleDateString('fr-FR'),
      action: 'Dernière modification',
      user:   salle.gestionnaire?.identifiant ?? 'Gestionnaire',
    },
  ].filter(Boolean);

  return (
    <div className="d-flex flex-column gap-4">

      {/* Disponibilité */}
      <div className="card detail-salle-card">
        <div className="card-body p-4 text-center">
          <h5 className="detail-salle-section-title">Disponibilité</h5>
          <button
            className="detail-salle-planning-btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate('/calendrier', { state: { salleNom: salle.nom } })}
          >
            <CalendarCheck size={18} /> Consulter le planning
          </button>
        </div>
      </div>

      {/* Administration */}
      <div className="card detail-salle-card">
        <div className="card-body p-4">
          <h5 className="detail-salle-section-title">Administration</h5>

          <button className="editBtn-mixed mb-3" onClick={() => navigate(`/salles/modifier/${salle.id}`)}>
            <span className="text-content">Modifier la fiche salle</span>
            <svg className="svg-pen" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
            </svg>
          </button>

          {isSuperAdmin && (
            <button
              className="btn btn-outline-danger w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 mb-4"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 size={16} /> Supprimer la salle
            </button>
          )}

          {logs.length > 0 && (
            <>
              <h6 className="detail-salle-sub-title d-flex align-items-center gap-2 mb-3">
                <History size={15} /> Historique
              </h6>
              <div className="d-flex flex-column">
                {logs.map((log, index) => (
                  <div key={index} className="d-flex gap-3 mb-3">
                    <div className="d-flex flex-column align-items-center">
                      <div className="detail-salle-log-icon">
                        <UserCog size={15} className="text-secondary" />
                      </div>
                      {index !== logs.length - 1 && <div className="detail-salle-log-line" />}
                    </div>
                    <div className="pt-1">
                      <p className="mb-0 fw-bold text-dark text-uppercase small">{log.action}</p>
                      <p className="mb-0 text-muted" style={{ fontSize: '0.7rem' }}>
                        {log.user} • {log.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default SalleAdministration;
