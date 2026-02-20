import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  UploadCloud, 
  X, 
  CheckCircle2, 
  Building2, 
  Trophy, 
  Users, 
  Ruler 
} from 'lucide-react';

const CreerSalle = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Liste des équipements possibles (basée mock data)
  const equipementsDisponibles = [
    "Wifi Fibre", "Écran Tactile 85\"", "Sonorisation Bose", 
    "Machine à café grain", "Climatisation", "Tableau blanc", "Vidéoprojecteur"
  ];

  const [formData, setFormData] = useState({
    nom: '',
    type: 'reunion',
    capacite: '',
    superficie: '',
    adresse: '',
    ville: '',
    description: '',
    equipements: []
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const toggleEquipement = (eq) => {
    const exists = formData.equipements.includes(eq);
    if (exists) {
      setFormData({
        ...formData,
        equipements: formData.equipements.filter(item => item !== eq)
      });
    } else {
      setFormData({
        ...formData,
        equipements: [...formData.equipements, eq]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvelle salle créée :", formData);
    alert("Salle ajoutée avec succès ! (Simulation)");
    navigate('/mes_salles');
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
    
      {/* Header et Filtres */}
        <div className="d-flex align-items-center gap-4 p-4 rounded-3 shadow-sm mb-4 flex-shrink-0" style={{ backgroundColor: '#430000' }}>
            <h2 className="text-white fw-bold m-0 fs-4 text-uppercase" style={{ letterSpacing: '1px' }}>
            Ajoutez une nouvelle salle
            </h2>
        </div>

      <div className="flex-grow-1 overflow-auto p-2">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              
              {/* Colonne Gauche - Infos de base */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                  <h5 className="fw-bold mb-4" style={{ color: '#430000' }}>Informations de base</h5>
                  
                  <div className="mb-3">
                    <label htmlFor="nom" className="form-label small fw-bold">NOM DE LA SALLE</label>
                    <input 
                      type="text" id="nom" className="form-control" 
                      placeholder="Ex: Salle Prestige" required
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="type" className="form-label small fw-bold">TYPE D'ESPACE</label>
                    <select id="type" className="form-select" onChange={handleInputChange}>
                      <option value="reunion">Réunion / Bureau</option>
                      <option value="sport">Sport / Gymnase</option>
                      <option value="conf">Conférence</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="capacite" className="form-label small fw-bold">CAPACITÉ (PERS.)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><Users size={16}/></span>
                        <input type="number" id="capacite" className="form-control" placeholder="Ex: 20" onChange={handleInputChange}/>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="superficie" className="form-label small fw-bold">SUPERFICIE (M²)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><Ruler size={16}/></span>
                        <input type="text" id="superficie" className="form-control" placeholder="Ex: 45m²" onChange={handleInputChange}/>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="adresse" className="form-label small fw-bold">ADRESSE</label>
                    <input type="text" id="adresse" className="form-control" placeholder="Rue, numéro..." onChange={handleInputChange}/>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="ville" className="form-label small fw-bold">VILLE</label>
                    <input type="text" id="ville" className="form-control" placeholder="Ex: Melun" onChange={handleInputChange}/>
                  </div>
                </div>
              </div>

              {/* Colonne Droite - Équipements et Description */}
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
                          className={`badge rounded-pill p-2 px-3 border cursor-pointer transition-all d-flex align-items-center gap-2 ${
                            formData.equipements.includes(eq) 
                            ? 'bg-success text-white border-success' 
                            : 'bg-white text-secondary border-light'
                          }`}
                          style={{ cursor: 'pointer' }}
                        >
                          {formData.equipements.includes(eq) && <CheckCircle2 size={14}/>}
                          {eq}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label small fw-bold">DESCRIPTION DE LA SALLE</label>
                    <textarea 
                      id="description" className="form-control" rows="8" 
                      placeholder="Décrivez les atouts de la salle..."
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

                {/* image */}
                <div className="row">
                    <div className="mb-3 mt-3 mt-xl-0">
                        <label className="mb-0 fw-bold text-uppercase small">Avatar de la salle</label>
                        <p className="text-muted small">Taille recommandée : 800x400 (px).</p>

                        {/* Input caché qui sera déclenché par le clic sur la div */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="d-none" 
                            onChange={(e) => console.log("Fichier sélectionné :", e.target.files[0])} 
                        />

                        <div 
                            className="border-2 border-dashed rounded-4 p-5 text-center bg-light transition-all"
                            onClick={() => fileInputRef.current.click()} // Déclenche l'input caché
                            style={{ 
                                borderStyle: 'dashed', 
                                borderColor: '#dee2e6', 
                                cursor: 'pointer',
                                transition: '0.3s' 
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = '#430000'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = '#dee2e6'}
                        >
                            <div className="dz-message needsclick">
                                <i className="h3 text-muted ri-upload-cloud-2-line"></i>
                                <h4 className="fw-bold">Glissez vos fichiers ici ou cliquez pour uploader.</h4>
                                <p className="text-muted small mb-0">Les fichiers sélectionnés apparaîtront ici.</p>
                            </div>
                        </div>

                        
                        <div className="dropzone-previews mt-3" id="file-previews"></div>
                    </div>
                </div>

              {/* Bouton Créer */}
              <div className="col-12 mb-5">
                <button type="submit" className="editBtn-mixed py-3 shadow-lg">
                  <span className="text-content">ENREGISTRER LA SALLE</span>
                  <svg className="svg-pen" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .hover-bg-white:hover { background-color: #fff !important; border-color: #CC4040 !important; }
        .cursor-pointer { cursor: pointer; }
        
        .editBtn-mixed {
          width: 100%;
          height: 60px;
          border-radius: 16px;
          border: none;
          background-color: #430000;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          cursor: pointer;
        }

        .text-content {
          color: white;
          font-weight: 700;
          letter-spacing: 2px;
          z-index: 2;
          transition: all 0.3s;
        }

        .svg-pen {
          height: 22px;
          fill: white;
          position: absolute;
          right: -50px;
          z-index: 3;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .editBtn-mixed:hover .text-content {
          transform: translateX(-20px);
          opacity: 0.7;
        }

        .editBtn-mixed:hover .svg-pen {
          right: 30px;
        }

        .editBtn-mixed:active { transform: scale(0.95); }
      `}</style>
    </div>
  );
};

export default CreerSalle;