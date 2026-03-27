import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, CheckCircle2, UploadCloud, Users, Loader2, Image, MapPin } from 'lucide-react';
import { api } from '../../../utils/api';
import TypeSalleSelect from '../creersalle/components/TypeSalleSelection';
import EquipementsForm from '../creersalle/components/EquipementsForm';
import HorairesForm    from '../creersalle/components/HorairesForm';

// Correspondance jour label → numéro
const JOURS_TO_NUM = {
  Lundi: 1, Mardi: 2, Mercredi: 3, Jeudi: 4,
  Vendredi: 5, Samedi: 6, Dimanche: 7,
};
const JOURS_LABELS = { 1: 'Lundi', 2: 'Mardi', 3: 'Mercredi', 4: 'Jeudi', 5: 'Vendredi', 6: 'Samedi', 7: 'Dimanche' };

// Convertit les horaires API → format HorairesForm
const apiHorairesToForm = (apiHoraires = []) =>
  [1, 2, 3, 4, 5, 6, 7].map(jour => {
    const found = apiHoraires.find(h => JOURS_TO_NUM[h.jour] === jour);
    return {
      jourSemaine:    jour,
      estOuvert:      found ? found.statut === 'ouvert' : false,
      heureOuverture: found?.heureOuverture ?? '08:00',
      heureFermeture: found?.heureFermeture ?? '22:00',
    };
  });

const ModifierSalle = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const fileInputRef = useRef(null);

  const [isLoading,    setIsLoading]    = useState(true);
  const [isSaving,     setIsSaving]     = useState(false);
  const [error,        setError]        = useState('');
  const [typesSalles,  setTypesSalles]  = useState({ sport: [], evenement: [] });
  const [selectedType, setSelectedType] = useState(null);
  const [horaires,     setHoraires]     = useState([]);
  const [photoFile,    setPhotoFile]    = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState(null);

  const [formData, setFormData] = useState({
    nom: '', capacite: '', adresse: '', ville: '', description: '', equipements: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [salle, types] = await Promise.all([
          api.getSalle(id),
          api.getTypesSalles(),
        ]);

        setTypesSalles(types);

        // Pré-remplissage
        setFormData({
          nom:         salle.nom          ?? '',
          capacite:    salle.capacite     ?? '',
          adresse:     salle.adresse      ?? '',
          ville:       salle.ville        ?? '',
          description: salle.description  ?? '',
          equipements: salle.equipements  ?? [],
        });

        // Type salle : retrouver l'objet complet dans la liste
        const allTypes = [...(types.sport ?? []), ...(types.evenement ?? [])];
        const found = allTypes.find(t =>
          t.libelle === salle.typeSalle?.libelle &&
          t.categorie === salle.typeSalle?.categorie
        );
        setSelectedType(found ?? salle.typeSalle ?? null);

        // Horaires
        setHoraires(apiHorairesToForm(salle.horaires));

        // Photo existante
        if (salle.photo) {
          setExistingPhoto(`http://localhost:8000${salle.photo}`);
          setPhotoPreview(`http://localhost:8000${salle.photo}`);
        }
      } catch (err) {
        setError(err.message || 'Impossible de charger la salle.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { id: fieldId, value } = e.target;
    setFormData(prev => ({ ...prev, [fieldId]: value }));
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
    if (!horaires.some(h => h.estOuvert)) {
      setError('La salle doit être ouverte au moins un jour par semaine.');
      return;
    }

    try {
      setIsSaving(true);

      // Photo : uploader seulement si un nouveau fichier a été sélectionné
      let photo = existingPhoto ?? null;
      if (photoFile) {
        photo = await api.uploadPhoto(photoFile);
      }

      // Transformation horaires → format API (tous les 7 jours)
      const horairesApi = horaires.map(h => ({
        jour:           JOURS_LABELS[h.jourSemaine],
        heureOuverture: h.heureOuverture,
        heureFermeture: h.heureFermeture,
        statut:         h.estOuvert ? 'ouvert' : 'ferme',
      }));

      await api.updateSalle(id, {
        nom:         formData.nom,
        adresse:     formData.adresse,
        ville:       formData.ville,
        capacite:    parseInt(formData.capacite),
        typeSalle:   { libelle: selectedType.libelle, categorie: selectedType.categorie },
        description: formData.description || null,
        equipements: formData.equipements,
        ...(photo !== null && { photo }),
        horaires:    horairesApi,
      });

      navigate(`/salles/${id}`);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <div className="detail-salle-state">
      <div className="spinner-border" style={{ color: 'var(--m2l-red)' }} />
    </div>
  );

  return (
    <div className="creer-salle-wrapper">
      <div className="creer-salle-header">
        <h2 className="creer-salle-header-title">Modifier la salle</h2>
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
                    <input type="text" id="nom" className="form-control" value={formData.nom} required onChange={handleChange} />
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
                      <input type="number" id="capacite" className="form-control" min="1" value={formData.capacite} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="creer-salle-label">Adresse *</label>
                    <input type="text" id="adresse" className="form-control" value={formData.adresse} required onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="creer-salle-label">Ville *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><MapPin size={16} /></span>
                      <input type="text" id="ville" className="form-control" value={formData.ville} required onChange={handleChange} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="creer-salle-label">Description</label>
                    <textarea id="description" className="form-control" rows="4" value={formData.description} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* COLONNE DROITE */}
              <div className="col-lg-6">
                <div className="creer-salle-card mb-4">
                  <h5 className="creer-salle-card-title">Équipements disponibles</h5>
                  <EquipementsForm
                    selected={formData.equipements}
                    onChange={(eq) => setFormData(prev => ({ ...prev, equipements: eq }))}
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
                <button
                  type="button"
                  className="btn bg-m2l-dark rounded-pill py-3 fw-bold w-50 text-white"
                  onClick={() => navigate(`/salles/${id}`)}
                  disabled={isSaving}
                >
                  <X size={18} className="me-2" /> Annuler
                </button>
                <button
                  type="submit"
                  className="btn bg-m2l-red rounded-pill py-3 fw-bold w-50 text-white d-flex align-items-center justify-content-center gap-2"
                  disabled={isSaving}
                >
                  {isSaving
                    ? <><Loader2 size={18} className="spinner-icon" /> Enregistrement...</>
                    : <><CheckCircle2 size={18} /> Enregistrer les modifications</>
                  }
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierSalle;
