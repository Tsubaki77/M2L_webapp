import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, Loader2 } from 'lucide-react';
import { api } from '../../utils/api';
import { statutLabel, getColorForStatut } from '../../utils/calendarUtils';

// Page qui liste les réservations d'un membre (filtrées côté API selon le
// gestionnaire connecté : seulement ses salles, sauf pour le super-admin).
const ListeReservationsMembre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adherent, setAdherent]         = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState(null);

  const fetchReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getReservationsMembre(id);
      setAdherent(data.adherent);
      setReservations(data.reservations);
    } catch {
      setError('Impossible de charger les réservations de cet adhérent.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

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

          <div className="page-header mb-3 flex-shrink-0 d-flex align-items-center gap-3">
            <button
              className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: '34px', height: '34px' }}
              onClick={() => navigate(adherent?.ligue ? `/adherents/ligues/${adherent.ligue.id}` : '/adherents')}
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="page-header-title m-0">
              Réservations de {adherent?.prenom} {adherent?.nom} : {reservations.length}
            </h2>
          </div>

          <div className="flex-grow-1 overflow-y-auto custom-scroll px-1">
            <div className="d-flex flex-column gap-3">
              {reservations.map((r) => {
                const color = getColorForStatut(r.statut);
                return (
                  <div
                    key={r.id}
                    className="bg-white border border-secondary-subtle rounded-3 p-3 shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3"
                    style={{ borderLeft: `4px solid ${color.border}` }}
                  >
                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                      <div className="row w-100 align-items-center m-0 text-nowrap">

                        <div className="col-4 d-flex align-items-center ps-0 overflow-hidden">
                          <span className="fw-bold text-dark text-truncate small">{r.salle?.nom ?? '—'}</span>
                        </div>

                        <div className="col-4 d-flex align-items-center border-start ps-3 overflow-hidden">
                          <Calendar size={16} className="me-2 text-secondary flex-shrink-0" />
                          <span className="text-secondary small text-truncate">
                            {r.dateDebut === r.dateFin ? r.dateDebut : `${r.dateDebut} → ${r.dateFin}`}
                          </span>
                        </div>

                        <div className="col-2 d-flex align-items-center border-start ps-3 overflow-hidden">
                          <Clock size={16} className="me-2 text-secondary flex-shrink-0" />
                          <span className="text-secondary small text-truncate">{r.heureDebut} – {r.heureFin}</span>
                        </div>

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
                  </div>
                );
              })}

              {reservations.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <p className="fs-5">Aucune réservation pour cet adhérent.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeReservationsMembre;
