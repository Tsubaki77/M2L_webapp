import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Users, CalendarCheck, Loader2 } from 'lucide-react';
import { api } from '../../utils/api';


const ListeLigues = () => {
  const navigate = useNavigate();
  const [ligues, setLigues]       = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  const fetchLigues = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getLigues();
      setLigues(data);
    } catch {
      setError('Impossible de charger les ligues.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchLigues(); }, [fetchLigues]);

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
            <h2 className="page-header-title">Ligues : {ligues.length}</h2>
          </div>

          <div className="flex-grow-1 overflow-y-auto custom-scroll px-1">
            <div className="d-flex flex-column gap-3">
              {ligues.map((l) => (
                <div
                  key={l.id}
                  className="bg-white border border-secondary-subtle rounded-3 p-3 shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3"
                  style={{ borderLeft: '4px solid #CC4040' }}
                >
                  <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <div className="row w-100 align-items-center m-0 text-nowrap">

                      <div className="col-6 d-flex align-items-center ps-0 overflow-hidden">
                        <Shield size={16} className="me-2 text-secondary flex-shrink-0" />
                        <span className="fw-bold text-dark text-truncate">{l.nom}</span>
                      </div>

                      <div className="col-3 d-flex align-items-center border-start ps-3 overflow-hidden">
                        <Users size={16} className="me-2 text-secondary flex-shrink-0" />
                        <span className="text-secondary small text-truncate">
                          {l.nbAdherents} adhérent{l.nbAdherents > 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="col-3 d-flex align-items-center border-start ps-3 overflow-hidden">
                        <CalendarCheck size={16} className="me-2 text-secondary flex-shrink-0" />
                        <span className="text-secondary small text-truncate">
                          {l.nbReservations} réservation{l.nbReservations > 1 ? 's' : ''}
                        </span>
                      </div>

                    </div>
                  </div>

                  <button
                    className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center ms-1 shadow-sm"
                    style={{ width: '34px', height: '34px' }}
                    onClick={() => navigate(`/adherents/ligues/${l.id}`)}
                  >
                    <ChevronRight size={18} className="text-muted" />
                  </button>
                </div>
              ))}

              {ligues.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <p className="fs-5">Aucune ligue trouvée.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeLigues;
