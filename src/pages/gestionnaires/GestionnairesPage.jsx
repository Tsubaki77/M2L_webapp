import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Users } from 'lucide-react';
import { api } from '../../utils/api';

const EMPTY_FORM = {
  identifiant:        '',
  email:              '',
  nom:                '',
  prenom:             '',
  mot_de_passe:       '',
  nouveau_mot_de_passe: '',
};

const GestionnairesPage = () => {
  const [gestionnaires, setGestionnaires]     = useState([]);
  const [isLoading,     setIsLoading]         = useState(true);
  const [error,         setError]             = useState('');

  // Modale
  const [showModal, setShowModal]   = useState(false);
  const [editing,   setEditing]     = useState(null); // null = création, objet = édition
  const [form,      setForm]        = useState(EMPTY_FORM);
  const [saving,    setSaving]      = useState(false);
  const [formError, setFormError]   = useState('');

  // Suppression
  const [deletingId, setDeletingId] = useState(null);

  const fetchGestionnaires = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getGestionnaires();
      setGestionnaires(data);
    } catch (err) {
      setError(err.message || 'Impossible de charger les gestionnaires.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchGestionnaires(); }, [fetchGestionnaires]);

  // ── Modale ──

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setShowModal(true);
  };

  const openEdit = (g) => {
    setEditing(g);
    setForm({
      identifiant:          g.identifiant ?? '',
      email:                g.email       ?? '',
      nom:                  g.nom         ?? '',
      prenom:               g.prenom      ?? '',
      mot_de_passe:         '',
      nouveau_mot_de_passe: '',
    });
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      if (editing) {
        // Mise à jour : n'envoyer que les champs renseignés
        const payload = {};
        if (form.nom)                  payload.nom                  = form.nom;
        if (form.prenom)               payload.prenom               = form.prenom;
        if (form.email)                payload.email                = form.email;
        if (form.nouveau_mot_de_passe) {
          payload.mot_de_passe         = form.mot_de_passe;
          payload.nouveau_mot_de_passe = form.nouveau_mot_de_passe;
        }
        await api.updateGestionnaire(editing.id, payload);
      } else {
        await api.createGestionnaire({
          identifiant: form.identifiant,
          email:       form.email,
          nom:         form.nom,
          prenom:      form.prenom,
          mot_de_passe: form.mot_de_passe,
        });
      }
      closeModal();
      fetchGestionnaires();
    } catch (err) {
      setFormError(err.message || 'Une erreur est survenue.');
    } finally {
      setSaving(false);
    }
  };

  // ── Suppression ──

  const handleDelete = async (g) => {
    if (!confirm(`Supprimer le gestionnaire "${g.identifiant}" ?`)) return;
    setDeletingId(g.id);
    try {
      await api.deleteGestionnaire(g.id);
      setGestionnaires(prev => prev.filter(x => x.id !== g.id));
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression.');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Rendu ──

  if (isLoading) return (
    <div className="gest-state">
      <div className="spinner-border" style={{ color: 'var(--m2l-red)' }} />
    </div>
  );

  if (error) return (
    <div className="gest-state">
      <p className="text-danger fw-bold">{error}</p>
      <button className="btn bg-m2l-red text-white rounded-pill" onClick={fetchGestionnaires}>Réessayer</button>
    </div>
  );

  return (
    <div className="gest-wrapper">

      {/* ── Header ── */}
      <div className="gest-header">
        <div>
          <h5 className="gest-header-title">Gestionnaires ({gestionnaires.length})</h5>
          <p className="gest-header-sub">Gérez les comptes gestionnaires de la plateforme.</p>
        </div>
        <button className="btn bg-m2l-red text-white rounded-pill d-flex align-items-center gap-2 px-4" onClick={openCreate}>
          <Plus size={17} /> Nouveau gestionnaire
        </button>
      </div>

      {/* ── Tableau ── */}
      {gestionnaires.length === 0 ? (
        <div className="gest-empty">
          <Users size={48} className="mb-3 text-muted opacity-50" />
          <p className="text-muted">Aucun gestionnaire enregistré.</p>
        </div>
      ) : (
        <div className="gest-table-card">
          <table className="table table-hover mb-0">
            <thead className="gest-thead">
              <tr>
                <th>Identifiant</th>
                <th>Nom complet</th>
                <th>Email</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gestionnaires.map(g => (
                <tr key={g.id}>
                  <td className="fw-bold text-dark align-middle">{g.identifiant}</td>
                  <td className="align-middle">{g.prenom} {g.nom}</td>
                  <td className="align-middle text-muted">{g.email}</td>
                  <td className="align-middle text-end">
                    <button
                      className="btn btn-sm btn-light border me-2"
                      onClick={() => openEdit(g)}
                      title="Modifier"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(g)}
                      disabled={deletingId === g.id}
                      title="Supprimer"
                    >
                      {deletingId === g.id
                        ? <Loader2 size={14} className="spinner-icon" />
                        : <Trash2 size={14} />
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modale création / édition ── */}
      {showModal && (
        <>
          <div className="gest-backdrop" />
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold">
                    {editing ? `Modifier : ${editing.identifiant}` : 'Nouveau gestionnaire'}
                  </h5>
                  <button className="btn-close" onClick={closeModal} />
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body px-4 py-3">
                    {formError && <div className="login-error mb-3">{formError}</div>}

                    <div className="row g-3">
                      {!editing && (
                        <div className="col-12">
                          <label className="creer-salle-label">Identifiant *</label>
                          <input
                            type="text"
                            name="identifiant"
                            className="form-control"
                            value={form.identifiant}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      )}

                      <div className="col-md-6">
                        <label className="creer-salle-label">Prénom</label>
                        <input
                          type="text"
                          name="prenom"
                          className="form-control"
                          value={form.prenom}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="creer-salle-label">Nom</label>
                        <input
                          type="text"
                          name="nom"
                          className="form-control"
                          value={form.nom}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-12">
                        <label className="creer-salle-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>

                      {!editing ? (
                        <div className="col-12">
                          <label className="creer-salle-label">Mot de passe *</label>
                          <input
                            type="password"
                            name="mot_de_passe"
                            className="form-control"
                            value={form.mot_de_passe}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      ) : (
                        <>
                          <div className="col-12">
                            <label className="creer-salle-label">Mot de passe actuel (requis pour changer)</label>
                            <input
                              type="password"
                              name="mot_de_passe"
                              className="form-control"
                              value={form.mot_de_passe}
                              onChange={handleChange}
                              autoComplete="current-password"
                            />
                          </div>
                          <div className="col-12">
                            <label className="creer-salle-label">Nouveau mot de passe</label>
                            <input
                              type="password"
                              name="nouveau_mot_de_passe"
                              className="form-control"
                              value={form.nouveau_mot_de_passe}
                              onChange={handleChange}
                              autoComplete="new-password"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="modal-footer border-0 pt-0 px-4 pb-4 gap-2">
                    <button type="button" className="btn btn-light rounded-pill px-4" onClick={closeModal}>
                      <X size={16} className="me-1" /> Annuler
                    </button>
                    <button type="submit" className="btn bg-m2l-red text-white rounded-pill px-4" disabled={saving}>
                      {saving
                        ? <><Loader2 size={16} className="me-1 spinner-icon" /> Enregistrement...</>
                        : editing ? 'Mettre à jour' : 'Créer le compte'
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GestionnairesPage;
