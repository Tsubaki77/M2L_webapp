import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, User, Shield, Briefcase, CalendarCheck, Loader2 } from 'lucide-react';
import { api } from '../../utils/api';

// Page qui liste les membres d'une ligue, avec leur rôle et leur nombre de réservations.
// Clic sur un membre -> liste de ses réservations.
const ListeMembres = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [membres, setMembres]     = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  const fetchMembres = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getMembresLigue(id);
      setMembres(data);
    } catch {
      setError('Impossible de charger les membres de cette ligue.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchMembres(); }, [fetchMembres]);

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
              onClick={() => navigate('/adherents')}
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="page-header-title m-0">Membres : {membres.length}</h2>
          </div>

          <div className="flex-grow-1 overflow-y-auto custom-scroll px-1">
            <div className="d-flex flex-column gap-3">
              {membres.map((m) => (
                <div
                  key={m.id}
                  className="bg-white border border-secondary-subtle rounded-3 p-3 shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3"
                  style={{ borderLeft: '4px solid #CC4040' }}
                >
                  <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <div className="row w-100 align-items-center m-0 text-nowrap">

                      <div className="col-4 d-flex align-items-center ps-0 overflow-hidden">
                        <User size={16} className="me-2 text-secondary flex-shrink-0" />
                        <span className="fw-bold text-dark text-truncate small">{m.prenom} {m.nom}</span>
                      </div>

                      <div className="col-3 d-flex align-items-center border-start ps-3 overflow-hidden">
                        <Shield size={16} className="me-2 text-secondary flex-shrink-0" />
                        <span className="text-secondary small text-truncate">{m.ligue}</span>
                      </div>

                      <div className="col-2 d-flex align-items-center border-start ps-3 overflow-hidden">
                        <Briefcase size={16} className="me-2 text-secondary flex-shrink-0" />
                        <span className="text-secondary small text-truncate">{m.poste}</span>
                      </div>

                      <div className="col-3 d-flex align-items-center border-start ps-3 overflow-hidden">
                        <CalendarCheck size={16} className="me-2 text-secondary flex-shrink-0" />
                        <span className="text-secondary small text-truncate">
                          {m.nbReservations} réservation{m.nbReservations > 1 ? 's' : ''}
                        </span>
                      </div>

                    </div>
                  </div>

                  <button
                    className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center ms-1 shadow-sm"
                    style={{ width: '34px', height: '34px' }}
                    onClick={() => navigate(`/adherents/membres/${m.id}`)}
                  >
                    <ChevronRight size={18} className="text-muted" />
                  </button>
                </div>
              ))}

              {membres.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <p className="fs-5">Aucun membre dans cette ligue.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeMembres;
