import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Check, Trash2, X, Loader2, Users } from 'lucide-react';
import { api } from '../../utils/api';

// Valeurs vides du formulaire, utilisées à la création et à la réinitialisation.
// "password" sert de mot de passe à la création, et de "nouveau mot de passe"
// (optionnel) en modification.
const FORMULAIRE_VIDE = {
  identifiant: '',
  email:       '',
  nom:         '',
  prenom:      '',
  telephone:   '',
  password:    '',
};

// Page réservée aux super-administrateurs : liste, création, modification,
// activation/désactivation et suppression des comptes gestionnaires
const GestionnairesPage = () => {
  const [gestionnaires, setGestionnaires] = useState([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [error, setError]                 = useState('');

  // États de la fenêtre modale (création / édition)
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null); // null = création, sinon objet en cours d'édition
  const [form, setForm]           = useState(FORMULAIRE_VIDE);
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState('');

  // Id du gestionnaire en cours de suppression ou de changement de statut
  // (pour afficher le spinner sur le bon bouton de la bonne ligne)
  const [deletingId, setDeletingId]  = useState(null);
  const [togglingId, setTogglingId]  = useState(null);

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

  const openCreate = () => {
    setEditing(null);
    setForm(FORMULAIRE_VIDE);
    setFormError('');
    setShowModal(true);
  };

  const openEdit = (g) => {
    setEditing(g);
    setForm({
      identifiant: g.identifiant ?? '',
      email:       g.email       ?? '',
      nom:         g.nom         ?? '',
      prenom:      g.prenom      ?? '',
      telephone:   g.telephone   ?? '',
      password:    '',
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
        // En modification, on n'envoie que les champs réellement remplis
        // (le mot de passe ne change que si on en a saisi un nouveau)
        const payload = {};
        if (form.nom)       payload.nom       = form.nom;
        if (form.prenom)    payload.prenom    = form.prenom;
        if (form.email)     payload.email     = form.email;
        if (form.telephone) payload.telephone = form.telephone;
        if (form.password)  payload.password  = form.password;
        await api.updateGestionnaire(editing.id, payload);
      } else {
        await api.createGestionnaire({
          identifiant: form.identifiant,
          email:       form.email,
          nom:         form.nom,
          prenom:      form.prenom,
          telephone:   form.telephone,
          password:    form.password,
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

  // Bascule un compte entre actif et inactif (sans le supprimer)
  const handleToggleStatut = async (g) => {
    const nouveauStatut = g.statut === 'actif' ? 'inactif' : 'actif';
    setTogglingId(g.id);
    try {
      await api.updateGestionnaireStatut(g.id, nouveauStatut);
      setGestionnaires(prev => prev.map(x => (x.id === g.id ? { ...x, statut: nouveauStatut } : x)));
    } catch (err) {
      alert(err.message || 'Erreur lors du changement de statut.');
    } finally {
      setTogglingId(null);
    }
  };

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

      <div className="page-header mb-4">
        <h2 className="page-header-title d-flex align-items-center gap-2">
          <Users size={20} /> Gestion des comptes
        </h2>
      </div>

      <div className="gest-toolbar">
        <button className="btn bg-m2l-red text-white rounded-pill d-flex align-items-center gap-2 px-4" onClick={openCreate}>
          <Plus size={17} /> Ajouter un gestionnaire
        </button>
      </div>

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
                <th>Nom</th>
                <th>Prénom</th>
                <th>E-mail</th>
                <th>Téléphone</th>
                <th>Statut</th>
                <th className="text-end">Actes</th>
              </tr>
            </thead>
            <tbody>
              {gestionnaires.map(g => (
                <tr key={g.id}>
                  <td className="fw-bold text-dark align-middle">{g.identifiant}</td>
                  <td className="align-middle">{g.nom}</td>
                  <td className="align-middle">{g.prenom}</td>
                  <td className="align-middle text-muted">{g.email}</td>
                  <td className="align-middle text-muted">{g.telephone || '—'}</td>
                  <td className="align-middle">
                    <span className={`gest-statut-badge ${g.statut}`}>
                      {g.statut === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="align-middle text-end">
                    <button
                      className="gest-action-btn"
                      onClick={() => openEdit(g)}
                      title="Modifier"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="gest-action-btn"
                      onClick={() => handleToggleStatut(g)}
                      disabled={togglingId === g.id}
                      title={g.statut === 'actif' ? 'Désactiver le compte' : 'Réactiver le compte'}
                    >
                      {togglingId === g.id
                        ? <Loader2 size={16} className="spinner-icon" />
                        : <Check size={16} />
                      }
                    </button>
                    <button
                      className="gest-action-btn"
                      onClick={() => handleDelete(g)}
                      disabled={deletingId === g.id}
                      title="Supprimer"
                    >
                      {deletingId === g.id
                        ? <Loader2 size={16} className="spinner-icon" />
                        : <Trash2 size={16} />
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fenêtre modale partagée pour créer ou modifier un gestionnaire */}
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
                      {/* L'identifiant ne peut être saisi qu'à la création */}
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

                      <div className="col-md-6">
                        <label className="creer-salle-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="creer-salle-label">Téléphone</label>
                        <input
                          type="tel"
                          name="telephone"
                          className="form-control"
                          value={form.telephone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-12">
                        <label className="creer-salle-label">
                          {editing ? 'Nouveau mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe *'}
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          value={form.password}
                          onChange={handleChange}
                          required={!editing}
                          autoComplete="new-password"
                        />
                      </div>
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
