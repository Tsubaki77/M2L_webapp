import React from 'react';

const JOURS = [
  { id: 1, label: 'Lundi' },
  { id: 2, label: 'Mardi' },
  { id: 3, label: 'Mercredi' },
  { id: 4, label: 'Jeudi' },
  { id: 5, label: 'Vendredi' },
  { id: 6, label: 'Samedi' },
  { id: 7, label: 'Dimanche' },
];

const HorairesForm = ({ horaires, onChange }) => {
  const toggleJour = (jourId) => {
    onChange(horaires.map((h) =>
      h.jourSemaine === jourId ? { ...h, estOuvert: !h.estOuvert } : h
    ));
  };

  const handleHeure = (jourId, champ, valeur) => {
    onChange(horaires.map((h) =>
      h.jourSemaine === jourId ? { ...h, [champ]: valeur } : h
    ));
  };

  return (
    <div className="creer-salle-horaires">
      {JOURS.map((jour) => {
        const h = horaires.find((h) => h.jourSemaine === jour.id);
        return (
          <div key={jour.id} className="creer-salle-horaire-row">
            <div className="creer-salle-horaire-jour">
              <div
                className={`creer-salle-toggle ${h.estOuvert ? 'ouvert' : ''}`}
                onClick={() => toggleJour(jour.id)}
              >
                <span className="creer-salle-toggle-thumb" />
              </div>
              <span className="creer-salle-horaire-label">{jour.label}</span>
            </div>
            {h.estOuvert ? (
              <div className="creer-salle-horaire-heures">
                <input
                  type="time"
                  className="form-control form-control-sm"
                  value={h.heureOuverture}
                  onChange={(e) => handleHeure(jour.id, 'heureOuverture', e.target.value)}
                />
                <span className="text-muted small">→</span>
                <input
                  type="time"
                  className="form-control form-control-sm"
                  value={h.heureFermeture}
                  onChange={(e) => handleHeure(jour.id, 'heureFermeture', e.target.value)}
                />
              </div>
            ) : (
              <span className="creer-salle-horaire-ferme">Fermé</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HorairesForm;
