import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, UploadCloud, Users, Loader2, Image, MapPin } from 'lucide-react';
import { api } from '../../../utils/api';
import TypeSalleSelect from './components/TypeSalleSelection';
import EquipementsForm from './components/EquipementsForm';
import HorairesForm from './components/HorairesForm';

const JOURS_LABELS = { 1: 'Lundi', 2: 'Mardi', 3: 'Mercredi', 4: 'Jeudi', 5: 'Vendredi', 6: 'Samedi', 7: 'Dimanche' };

const HORAIRES_DEFAUT = [1, 2, 3, 4, 5, 6, 7].map((jour) => ({
  jourSemaine: jour,
  estOuvert: false,
  heureOuverture: '08:00',
  heureFermeture: '22:00',
}));

const CreerSalle = () => {
  const navigate     = useNavigate();
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading]             = useState(false);
  const [error, setError]                     = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [typesSalles, setTypesSalles]         = useState({ sport: [], evenement: [] });
  const [selectedType, setSelectedType]       = useState(null);
  const [horaires, setHoraires]               = useState(HORAIRES_DEFAUT);
  const [photoFile, setPhotoFile]             = useState(null);
  const [photoPreview, setPhotoPreview]       = useState(null);

  const [formData, setFormData] = useState({
    nom: '', capacite: '', adresse: '', ville: '', description: '', equipements: [],
  });

  useEffect(() => {
    api.getTypesSalles()
      .then((data) => {
        setTypesSalles(data);
        const premier = data.sport?.[0] || data.evenement?.[0];
        if (premier) setSelectedType(premier);
      })
      .catch(() => setError('Impossible de charger les types de salles.'));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nom || !formData.adresse || !formData.ville || !formData.capacite || !selectedType) {
      setError('Veuillez remplir tous les champs obligatoires (nom, adresse, ville, capacité, type).');
      return;
    }
    if (!horaires.some((h) => h.estOuvert)) {
      setError('La salle doit être ouverte au moins un jour par semaine.');
      return;
    }

    try {
      setIsLoading(true);

      let photo = null;
      if (photoFile) {
        photo = await api.uploadPhoto(photoFile);
      }

      // Transformation du format horaires interne → format API
      const horairesApi = horaires
        .filter((h) => h.estOuvert)
        .map((h) => ({
          jour: JOURS_LABELS[h.jourSemaine],
          heureOuverture: h.heureOuverture,
          heureFermeture: h.heureFermeture,
          statut: 'ouvert',
        }));

      await api.createSalle({
        nom: formData.nom,
        adresse: formData.adresse,
        ville: formData.ville,
        capacite: parseInt(formData.capacite),
        typeSalle: { libelle: selectedType.libelle, categorie: selectedType.categorie },
        description: formData.description || null,
        photo,
        horaires: horairesApi,
      });

      navigate('/mes_salles');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="creer-salle-wrapper">
      <div className="creer-salle-header">
        <h2 className="creer-salle-header-title">Ajouter une nouvelle salle</h2>
      </div>

      <div className="creer-salle-body">
        <div className="creer-salle-container">

          {error && <div className="login-error mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-4">

              {/* COLONNE GAUCHE */}
              <div className="col-lg-6">
                <div className="creer-salle-card">
                  <h5 className="creer-salle-card-title">Informations de base</h5>

                  <div className="mb-3">
                    <label className="creer-salle-label">Nom de la salle *</label>
                    <input type="text" id="nom" className="form-control" required onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="creer-salle-label">Type d'espace *</label>
                    <TypeSalleSelect
                      value={selectedType}
                      onChange={setSelectedType}
                      typesSalles={typesSalles}
                      setTypesSalles={setTypesSalles}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="creer-salle-label">Capacité (personnes) *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><Users size={16} /></span>
                      <input type="number" id="capacite" className="form-control" min="1" onChange={handleChange} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="creer-salle-label">Adresse *</label>
                    <input type="text" id="adresse" className="form-control" required onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="creer-salle-label">Ville *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><MapPin size={16} /></span>
                      <input type="text" id="ville" className="form-control" required onChange={handleChange} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="creer-salle-label">Description</label>
                    <textarea id="description" className="form-control" rows="4" onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* COLONNE DROITE */}
              <div className="col-lg-6">
                <div className="creer-salle-card mb-4">
                  <h5 className="creer-salle-card-title">Équipements disponibles</h5>
                  <EquipementsForm
                    selected={formData.equipements}
                    onChange={(eq) => setFormData((prev) => ({ ...prev, equipements: eq }))}
                  />
                </div>

                <div className="creer-salle-card">
                  <h5 className="creer-salle-card-title">Horaires d'ouverture</h5>
                  <HorairesForm horaires={horaires} onChange={setHoraires} />
                </div>
              </div>

              {/* PHOTO */}
              <div className="col-12">
                <label className="creer-salle-label">Photo de la salle</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                />
                {photoPreview ? (
                  <div className="creer-salle-photo-preview" onClick={() => fileInputRef.current.click()}>
                    <img src={photoPreview} alt="Aperçu" className="creer-salle-photo-img" />
                    <div className="creer-salle-photo-overlay">
                      <Image size={22} className="me-2" /> Changer la photo
                    </div>
                  </div>
                ) : (
                  <div className="creer-salle-upload-zone" onClick={() => fileInputRef.current.click()}>
                    <UploadCloud size={30} className="text-muted mb-2" />
                    <p className="fw-bold mb-1">Cliquez pour uploader une photo</p>
                    <p className="text-muted small mb-0">JPG, PNG ou WebP — max 5 Mo</p>
                  </div>
                )}
              </div>

              {/* BOUTONS */}
              <div className="col-12 mb-5 mt-3 d-flex gap-3">
                <button type="button" className="btn bg-m2l-dark rounded-pill py-3 fw-bold w-50 text-white" onClick={() => setShowCancelModal(true)} disabled={isLoading}>
                  <X size={18} className="me-2" /> Annuler
                </button>
                <button type="submit" className="btn bg-m2l-red rounded-pill py-3 fw-bold w-50 text-white d-flex align-items-center justify-content-center gap-2" disabled={isLoading}>
                  {isLoading
                    ? <><Loader2 size={18} className="spinner-icon" /> Enregistrement...</>
                    : <><CheckCircle2 size={18} /> Enregistrer</>
                  }
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {showCancelModal && (
        <>
          <div className="creer-salle-backdrop" />
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg p-3">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Annuler la création ?</h5>
                </div>
                <div className="modal-body text-secondary">
                  Êtes-vous sûr ? Les données saisies seront perdues.
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-light rounded-pill px-4" onClick={() => setShowCancelModal(false)}>Non, continuer</button>
                  <button className="btn btn-dark rounded-pill px-4" onClick={() => navigate('/mes_salles')}>Oui, annuler</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreerSalle;
