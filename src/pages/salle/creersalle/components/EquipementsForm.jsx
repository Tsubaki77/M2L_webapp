import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const EQUIPEMENTS = [
  'Wifi Fibre', 'Écran', 'Sonorisation', 'Équipements sportifs',
  'Machine à café', 'Climatisation', 'Tableau blanc', 'Vidéoprojecteur',
  'Table/chaises', 'Accès PMR', 'Parking', 'Espace extérieur', 'Vestiaires', 'Douches',
];

const EquipementsForm = ({ selected, onChange }) => {
  const toggle = (eq) => {
    onChange(
      selected.includes(eq)
        ? selected.filter((item) => item !== eq)
        : [...selected, eq]
    );
  };

  return (
    <div className="d-flex flex-wrap gap-2">
      {EQUIPEMENTS.map((eq) => (
        <div
          key={eq}
          onClick={() => toggle(eq)}
          className={`creer-salle-badge-eq ${selected.includes(eq) ? 'selected' : ''}`}
        >
          {selected.includes(eq) && <CheckCircle2 size={14} />}
          {eq}
        </div>
      ))}
    </div>
  );
};

export default EquipementsForm;
