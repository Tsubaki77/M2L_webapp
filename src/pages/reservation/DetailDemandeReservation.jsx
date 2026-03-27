import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, User, Calendar, Clock, MapPin, Users,
  Check, X, Loader2, AlertCircle,
} from 'lucide-react';
import { api } from '../../utils/api';
import { statutLabel, getColorForStatut } from '../../utils/calendarUtils';

const DetailDemandeReservation = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const location     = useLocation();

  const [reservation, setReservation] = useState(null);
  const [isLoading,   setIsLoading]   = useState(true);
  const [error,       setError]       = useState('');
  const [actionId,    setActionId]    = useState(null); // 'VALIDEE' | 'REFUSEE'

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await api.getReservations();
        const found = data.find(r => r.id === parseInt(id));
        if (!found) {
          setError('Réservation introuvable.');
        } else {
          setReservation(found);
        }
      } catch (err) {
        setError(err.message || 'Impossible de charger la réservation.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  const handleStatut = async (newStatut) => {
    if (!confirm(`${newStatut === 'VALIDEE' ? 'Valider' : 'Refuser'} cette réservation ?`)) return;
    setActionId(newStatut);
    try {
      const updated = await api.updateReservationStatut(reservation.id, newStatut);
      setReservation(prev => ({ ...prev, statut: updated.statut ?? newStatut }));
    } catch (err) {
      alert(err.message || 'Erreur lors de la mise à jour.');
    } finally {
      setActionId(null);
    }
  };

  if (isLoading) return (
    <div className="demande-state">
      <div className="spinner-border" style={{ color: 'var(--m2l-red)' }} />
    </div>
  );

  if (error || !reservation) return (
    <div className="demande-state">
      <AlertCircle size={40} className="text-danger mb-3" />
      <p className="text-danger fw-bold">{error || 'Réservation introuvable.'}</p>
      <button className="btn bg-m2l-red text-white rounded-pill mt-2" onClick={() => navigate(-1)}>
        Retour
      </button>
    </div>
  );

  const color      = getColorForStatut(reservation.statut);
  const isReadOnly = location.state?.fromCalendar ?? false;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const isSameDay = reservation.dateDebut === reservation.dateFin;

  return (
    <div className="demande-wrapper">

      {/* ── Header ── */}
      <div className="demande-header">
        <button className="btn btn-light rounded-circle" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} style={{ color: 'var(--m2l-dark-red)' }} />
        </button>
        <div>
          <h5 className="demande-header-title">Demande #{reservation.id}</h5>
          <span
            className="badge rounded-pill px-3 py-2"
            style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}
          >
            {statutLabel(reservation.statut)}
          </span>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="demande-body custom-scroll">
        <div className="row g-4">

          {/* ── Colonne principale ── */}
          <div className="col-lg-8">

            {/* Demandeur */}
            <div className="card demande-card mb-4">
              <div className="card-body p-4">
                <h6 className="demande-section-title">Demandeur</h6>
                {reservation.adherent ? (
                  <div className="d-flex align-items-center gap-3">
                    <div className="demande-avatar">
                      {reservation.adherent.prenom?.charAt(0)}
                      {reservation.adherent.nom?.charAt(0)}
                    </div>
                    <div>
                      <div className="fw-bold text-dark fs-5">
                        {reservation.adherent.prenom} {reservation.adherent.nom}
                      </div>
                      <div className="text-muted small">{reservation.adherent.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2 text-muted">
                    <User size={20} /> Adhérent inconnu
                  </div>
                )}
              </div>
            </div>

            {/* Détails */}
            <div className="card demande-card mb-4">
              <div className="card-body p-4">
                <h6 className="demande-section-title">Détails de la réservation</h6>

                <div className="row g-3">
                  {/* Dates */}
                  <div className="col-md-6">
                    <div className="demande-info-block">
                      <Calendar size={16} className="text-muted me-2 flex-shrink-0" />
                      <div>
                        <div className="demande-info-label">Date{isSameDay ? '' : 's'}</div>
                        {isSameDay ? (
                          <div className="demande-info-value">{formatDate(reservation.dateDebut)}</div>
                        ) : (
                          <>
                            <div className="demande-info-value">Du {formatDate(reservation.dateDebut)}</div>
                            <div className="demande-info-value">Au {formatDate(reservation.dateFin)}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Horaires */}
                  <div className="col-md-6">
                    <div className="demande-info-block">
                      <Clock size={16} className="text-muted me-2 flex-shrink-0" />
                      <div>
                        <div className="demande-info-label">Créneau</div>
                        <div className="demande-info-value">
                          {reservation.heureDebut?.slice(0, 5)} – {reservation.heureFin?.slice(0, 5)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motif */}
                  <div className="col-12">
                    <div className="demande-info-block">
                      <Users size={16} className="text-muted me-2 flex-shrink-0" />
                      <div>
                        <div className="demande-info-label">Motif</div>
                        <div className="demande-info-value">{reservation.motif || '—'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Salle */}
                  {reservation.salle && (
                    <div className="col-12">
                      <div className="demande-info-block">
                        <MapPin size={16} className="text-muted me-2 flex-shrink-0" />
                        <div>
                          <div className="demande-info-label">Salle</div>
                          <div className="demande-info-value">{reservation.salle.nom}</div>
                          {reservation.salle.adresse && (
                            <div className="text-muted small">{reservation.salle.adresse}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {!isReadOnly && reservation.statut === 'EN_ATTENTE' && (
                  <div className="d-flex gap-3 mt-4 pt-3 border-top">
                    <button
                      className="btn btn-success rounded-pill px-4 d-flex align-items-center gap-2"
                      onClick={() => handleStatut('VALIDEE')}
                      disabled={!!actionId}
                    >
                      {actionId === 'VALIDEE'
                        ? <Loader2 size={16} className="spinner-icon" />
                        : <Check size={16} />
                      }
                      Valider
                    </button>
                    <button
                      className="btn btn-outline-danger rounded-pill px-4 d-flex align-items-center gap-2"
                      onClick={() => handleStatut('REFUSEE')}
                      disabled={!!actionId}
                    >
                      {actionId === 'REFUSEE'
                        ? <Loader2 size={16} className="spinner-icon" />
                        : <X size={16} />
                      }
                      Refuser
                    </button>
                  </div>
                )}

                {/* Statut déjà traité */}
                {!isReadOnly && reservation.statut !== 'EN_ATTENTE' && (
                  <div
                    className="mt-4 p-3 rounded-3 d-flex align-items-center gap-2 small fw-bold"
                    style={{ background: color.bg, color: color.text }}
                  >
                    <AlertCircle size={16} />
                    Cette demande a déjà été {reservation.statut === 'VALIDEE' ? 'validée' : 'refusée'}.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Colonne salle ── */}
          {reservation.salle && (
            <div className="col-lg-4">
              <div className="card demande-card">
                <div className="demande-salle-header">
                  <div className="demande-salle-icon"><MapPin size={28} /></div>
                  <h5 className="fw-bold mb-1 mt-2">{reservation.salle.nom}</h5>
                  <span className="badge bg-white text-dark bg-opacity-75">Salle réservée</span>
                </div>
                <div className="card-body p-4">
                  {reservation.salle.adresse && (
                    <div className="mb-3">
                      <div className="demande-info-label">Adresse</div>
                      <div className="fw-semibold">{reservation.salle.adresse}</div>
                    </div>
                  )}
                  {reservation.salle.capacite && (
                    <div className="mb-3">
                      <div className="demande-info-label">Capacité</div>
                      <div className="fw-bold">
                        <Users size={16} className="me-1 text-muted" />
                        {reservation.salle.capacite} personnes
                      </div>
                    </div>
                  )}
                  <button
                    className="learn-more mt-2"
                    onClick={() => navigate(`/salles/${reservation.salle.id}`)}
                  >
                    <span className="circle"><span className="icon arrow" /></span>
                    <span className="button-text">Voir la fiche salle</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DetailDemandeReservation;
