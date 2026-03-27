import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ChevronRight, Calendar, User, Loader2, Clock } from 'lucide-react';
import { api } from '../../utils/api';
import { statutLabel, getColorForStatut } from '../../utils/calendarUtils';

const STATUTS = [
  { value: 'all',        label: 'Toutes' },
  { value: 'EN_ATTENTE', label: 'En attente' },
  { value: 'VALIDEE',    label: 'Validées' },
  { value: 'REFUSEE',    label: 'Refusées' },
];

const ListeDemandes = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter]             = useState('EN_ATTENTE');
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState(null);

  const fetchReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getReservations();
      setReservations(data);
    } catch {
      setError('Impossible de charger les demandes.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

  const handleStatut = async (id, statut) => {
    try {
      await api.updateReservationStatut(id, statut);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut } : r))
      );
    } catch (err) {
      alert(err.message || 'Erreur lors de la mise à jour.');
    }
  };

  const filtered = filter === 'all'
    ? reservations
    : reservations.filter((r) => r.statut === filter);

  return (
    <div className="d-flex flex-column h-100">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Loader2 size={48} className="spinner-icon" style={{ color: '#CC4040' }} />
        </div>
      ) : error ? (
        <div className="alert alert-danger m-4">{error}</div>
      ) : (
        <div className="d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>

          <div className="page-header mb-3 flex-shrink-0">
            <h2 className="page-header-title">Demandes de réservation : {reservations.length}</h2>
          </div>

          {/* Filtres */}
          <div className="d-flex gap-2 mb-3 flex-shrink-0 px-1">
            {STATUTS.map((s) => (
              <button
                key={s.value}
                onClick={() => setFilter(s.value)}
                className={`btn btn-sm rounded-pill px-3 fw-bold ${filter === s.value ? 'bg-m2l-dark text-white' : 'btn-light text-secondary'}`}
              >
                {s.label}
                <span className="ms-2 badge rounded-pill bg-white text-dark">
                  {s.value === 'all' ? reservations.length : reservations.filter((r) => r.statut === s.value).length}
                </span>
              </button>
            ))}
          </div>

          <div className="flex-grow-1 overflow-y-auto custom-scroll px-1">
            <div className="d-flex flex-column gap-3">
              {filtered.map((r) => {
                const color = getColorForStatut(r.statut);
                return (
                  <div
                    key={r.id}
                    className="bg-white border border-secondary-subtle rounded-3 p-3 shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3"
                    style={{ borderLeft: `4px solid ${color.border}` }}
                  >
                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                      <div className="row w-100 align-items-center m-0 text-nowrap">

                        {/* Demandeur */}
                        <div className="col-3 d-flex align-items-center ps-0 overflow-hidden">
                          <User size={16} className="me-2 text-secondary flex-shrink-0" />
                          <div className="overflow-hidden">
                            <div className="fw-bold text-dark text-truncate small">
                              {r.adherent ? `${r.adherent.prenom} ${r.adherent.nom}` : '—'}
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                              {r.adherent?.email}
                            </div>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="col-4 d-flex align-items-center border-start ps-3 overflow-hidden">
                          <Calendar size={16} className="me-2 text-secondary flex-shrink-0" />
                          <span className="text-secondary small text-truncate">
                            {r.dateDebut === r.dateFin
                              ? r.dateDebut
                              : `${r.dateDebut} → ${r.dateFin}`}
                          </span>
                        </div>

                        {/* Horaires */}
                        <div className="col-3 d-flex align-items-center border-start ps-3 overflow-hidden">
                          <Clock size={16} className="me-2 text-secondary flex-shrink-0" />
                          <span className="text-secondary small text-truncate">
                            {r.heureDebut} – {r.heureFin}
                          </span>
                        </div>

                        {/* Statut */}
                        <div className="col-2 d-flex justify-content-end">
                          <span
                            className="badge rounded-pill small fw-bold px-3 py-2"
                            style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                          >
                            {statutLabel(r.statut)}
                          </span>
                        </div>

                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2 border-start ps-3 flex-shrink-0">
                      {r.statut === 'EN_ATTENTE' && (
                        <>
                          <button
                            onClick={() => handleStatut(r.id, 'VALIDEE')}
                            className="btn btn-outline-success btn-sm d-flex align-items-center gap-1 px-3 rounded-pill fw-bold"
                          >
                            <Check size={14} /> Valider
                          </button>
                          <button
                            onClick={() => handleStatut(r.id, 'REFUSEE')}
                            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 px-3 rounded-pill fw-bold"
                          >
                            <X size={14} /> Refuser
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center ms-1 shadow-sm"
                        style={{ width: '34px', height: '34px' }}
                        onClick={() => navigate(`/demandes/${r.id}`)}
                      >
                        <ChevronRight size={18} className="text-muted" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <p className="fs-5">Aucune demande pour ce filtre.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeDemandes;
