import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, UploadCloud, X, CheckCircle2, 
  Building2, Trophy, Users, Ruler 
} from 'lucide-react';

const CreerSalle = () => {
  const navigate = useNavigate();
  
  // 1. RÉFÉRENCE (useRef) pour l'input de fichier (upload)
  // On déclenche le clic de l'input réel quand on clique sur la zone de drag&drop.
  const fileInputRef = useRef(null);
  
  // 2. ÉTATS (STATES)
  const [showCancelModal, setShowCancelModal] = useState(false); // Gestion de la modale d'alerte
  
  // Objet unique pour le formulaire 
  const [formData, setFormData] = useState({
    nom: '',
    type: 'reunion',
    capacite: '',
    superficie: '',
    adresse: '',
    ville: '',
    description: '',
    equipements: [] // Tableau pour stocker les choix multiples
  });

  // Liste brute pour générer les badges d'équipements
  const equipementsDisponibles = [
    "Wifi Fibre", "Écran", "Sonorisation","Equipements sportifs",
    "Machine à café", "Climatisation", "Tableau blanc", "Vidéoprojecteur", 
    "Table/chaises", "Accès PMR", "Parking", "Espace extérieur", "Vestiaires", "Douches"
  ];

  // 3. LOGIQUE DU FORMULAIRE 

  // Mise à jour dynamique de l'objet formData selon l'ID de l'input
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Gestion des équipements (Add or Remove)
  // Si l'équipement est déjà là, on le filtre (delete), sinon on l'ajoute (...spread)
  const toggleEquipement = (eq) => {
    const exists = formData.equipements.includes(eq);
    setFormData({
      ...formData,
      equipements: exists 
        ? formData.equipements.filter(item => item !== eq)
        : [...formData.equipements, eq]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Envoyer formData vers l'API
    console.log("Nouvelle salle créée :", formData);
    alert("Salle ajoutée avec succès !");
    navigate('/mes_salles');
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
    
      {/* HEADER */}
      <div className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-4 flex-shrink-0" style={{ backgroundColor: '#430000' }}>
          <h2 className="text-white fw-bold m-0 fs-4 text-uppercase">
            Ajoutez une nouvelle salle
          </h2>
      </div>

      <div className="flex-grow-1 overflow-auto p-2">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              
              {/* COLONNE GAUCHE : Identité de la salle */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                  <h5 className="fw-bold mb-4" style={{ color: '#430000' }}>Informations de base</h5>
                  
                  <div className="mb-3">
                    <label className="form-label small fw-bold">NOM DE LA SALLE</label>
                    <input type="text" id="nom" className="form-control" required onChange={handleInputChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">TYPE D'ESPACE</label>
                    <select id="type" className="form-select" onChange={handleInputChange}>
                      <option value="reunion">Eveneme / Bureau</option>
                      <option value="sport">Sport / Gymnase</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold">CAPACITÉ (PERS.)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><Users size={16}/></span>
                        <input type="number" id="capacite" className="form-control" onChange={handleInputChange}/>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold">SUPERFICIE (M²)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><Ruler size={16}/></span>
                        <input type="text" id="superficie" className="form-control" onChange={handleInputChange}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLONNE DROITE : Équipements (Multi-badges) */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                  <h5 className="fw-bold mb-4" style={{ color: '#430000' }}>Détails techniques</h5>
                  
                  <div className="mb-4">
                    <label className="form-label small fw-bold">ÉQUIPEMENTS DISPONIBLES</label>
                    <div className="d-flex flex-wrap gap-2">
                      {equipementsDisponibles.map((eq, index) => (
                        <div 
                          key={index}
                          onClick={() => toggleEquipement(eq)}
                          // Style dynamique : Vert si sélectionné, Blanc sinon
                          className={`badge rounded-pill p-2 px-3 border cursor-pointer transition-all d-flex align-items-center gap-2 ${
                            formData.equipements.includes(eq) ? 'bg-success text-white' : 'bg-white text-secondary'
                          }`}
                        >
                          {formData.equipements.includes(eq) && <CheckCircle2 size={14}/>}
                          {eq}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">DESCRIPTION</label>
                    <textarea id="description" className="form-control" rows="8" onChange={handleInputChange}></textarea>
                  </div>
                </div>
              </div>

              {/* ZONE UPLOAD PHOTO */}
              <div className="col-12">
                  <label className="fw-bold text-uppercase small">Avatar de la salle</label>
                  <input type="file" ref={fileInputRef} className="d-none" onChange={(e) => console.log(e.target.files[0])} />

                  <div 
                    className="border-2 border-dashed rounded-4 p-5 text-center bg-light cursor-pointer"
                    onClick={() => fileInputRef.current.click()} // Le useRef en action
                    style={{ borderStyle: 'dashed', borderColor: '#dee2e6' }}
                  >
                    <UploadCloud size={32} className="text-muted mb-2" />
                    <h4 className="fw-bold">Cliquez pour uploader une photo</h4>
                    <p className="text-muted small">800x400 px recommandé</p>
                  </div>
              </div>

              {/* BOUTONS ACTIONS FINALES */}
              <div className="col-12 mb-5 mt-3 d-flex gap-3">
                <button type="button" className="btn bg-m2l-dark rounded-pill py-3 fw-bold w-50 text-white" onClick={() => setShowCancelModal(true)}>
                  <X size={20} className="me-2" /> Annuler
                </button>

                <button type="submit" className="btn bg-m2l-red rounded-pill py-3 fw-bold w-50 text-white">
                  <CheckCircle2 size={20} className="me-2" /> Enregistrer
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* 4. MODALE DE SÉCURITÉ (ANNULATION) */}
      {showCancelModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
          <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg p-3">
                <div className="modal-header border-0"><h5 className="modal-title fw-bold">Annuler la création ?</h5></div>
                <div className="modal-body text-secondary">Êtes-vous sûr ? Les données saisies seront perdues.</div>
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