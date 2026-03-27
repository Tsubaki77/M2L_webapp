import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../../../../utils/api';

const TypeSalleSelection = ({ value, onChange, typesSalles, setTypesSalles }) => {
  const [showForm, setShowForm]       = useState(false);
  const [nouveauType, setNouveauType] = useState('');
  const [categorie, setCategorie]     = useState('sport');

  const allTypes = [...(typesSalles.sport ?? []), ...(typesSalles.evenement ?? [])];

  const handleChange = (e) => {
    const id = parseInt(e.target.value);
    const found = allTypes.find((t) => t.id === id);
    if (found) onChange(found);
  };

  const handleCreer = async () => {
    if (!nouveauType.trim()) return;
    try {
      const type = await api.createTypeSalle({ libelle: nouveauType.trim(), categorie });
      setTypesSalles((prev) => ({
        ...prev,
        [categorie]: [...(prev[categorie] ?? []), type],
      }));
      onChange(type);
      setNouveauType('');
      setShowForm(false);
    } catch (e) {
      console.error('Erreur création type :', e);
    }
  };

  return (
    <div>
      <select
        className="form-select"
        value={value?.id ?? ''}
        onChange={handleChange}
      >
        <option value="" disabled>-- Choisir un type --</option>
        {typesSalles.sport?.length > 0 && (
          <optgroup label="Sports">
            {typesSalles.sport.map((t) => (
              <option key={t.id} value={t.id}>{t.libelle}</option>
            ))}
          </optgroup>
        )}
        {typesSalles.evenement?.length > 0 && (
          <optgroup label="Événements">
            {typesSalles.evenement.map((t) => (
              <option key={t.id} value={t.id}>{t.libelle}</option>
            ))}
          </optgroup>
        )}
      </select>

      {!showForm ? (
        <button type="button" className="creer-salle-btn-nouveau-type" onClick={() => setShowForm(true)}>
          <Plus size={13} /> Type non listé ? Créer
        </button>
      ) : (
        <div className="creer-salle-nouveau-type-form">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Ex: Handball"
            value={nouveauType}
            onChange={(e) => setNouveauType(e.target.value)}
          />
          <select className="form-select form-select-sm" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="sport">Sport</option>
            <option value="evenement">Événement</option>
          </select>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-sm bg-m2l-red text-white rounded-pill px-3" onClick={handleCreer}>Ajouter</button>
            <button type="button" className="btn btn-sm btn-light rounded-pill px-3" onClick={() => setShowForm(false)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeSalleSelection;
