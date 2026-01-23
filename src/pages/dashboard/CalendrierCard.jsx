import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { CalendarDays } from 'lucide-react';

const CalendarCard = () => {
  const [date, setDate] = useState(new Date());

  // --- Simulation à remplacer par données Api ---
  const reservations = [
    new Date(2026, 0, 24), 
    new Date(2026, 0, 28), 
    new Date(2026, 1, 5),  
  ];

  // Fonction vérifie si une date précise (dateToCheck) correspond à L'UNE des dates de réservation.
  const hasReservation = (dateToCheck) => {
    // La méthode .some() renvoie VRAI si au moins un élément du tableau correspond
    return reservations.some(resaDate => 
      // On compare Jour, Mois et Année strictement
      resaDate.getDate() === dateToCheck.getDate() &&
      resaDate.getMonth() === dateToCheck.getMonth() &&
      resaDate.getFullYear() === dateToCheck.getFullYear()
    );
  };

  return (
    <>
      <style>
        {`
          /* Conteneur principal */
          .custom-calendar { 
            width: 100%; 
            height: 300px;
            background: transparent !important;
            border: none !important;
            font-family: inherit; 
            color: #FAFAFA !important; 
          }
          
          /* Barre + Flèches */
          .react-calendar__navigation button {
            color: #FAFAFA !important;
            min-width: 44px; 
            background: none; 
            font-size: 1.1rem;
            font-weight: bold;
          }
        
          .react-calendar__navigation button:enabled:hover,
          .react-calendar__navigation button:enabled:focus {
            background-color: #770505;
            border-radius: 8px;
          }

          /* Jour de la semaine */
          .react-calendar__month-view__weekdays__weekday {
            color: #ADABAB !important; 
            font-size: 0.75rem; 
            text-transform: uppercase;
            text-decoration: none !important;
          }
          
          .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
            cursor: default;
          }

          /* D. LES TUILES  */
          .react-calendar__tile {
            color: #FAFAFA; 
            padding: 10px 6px; 
            background: none; 
            text-align: center;
            font-size: 0.9rem;
            position: relative; 
            z-index: 1;
          }
          
          /* Quand on passe la souris sur un jour */
          .react-calendar__tile:enabled:hover,
          .react-calendar__tile:enabled:focus {
            background-color: #770505; 
            border-radius: 12px; 
          }

          /* Jour sélectionné*/
          .react-calendar__tile--active {
            background: #CC4040 !important; 
            border-radius: 12px;
            color: #FAFAFA !important;
          }

          /* Aujourd'hui */
          .react-calendar__tile--now {
            background: #ADABAB !important;
            border-radius: 12px;
          }`}
      </style>

      <div 
        className="card border-0 shadow text-white overflow-hidden" 
        style={{ 
          backgroundColor: '#430000', 
          borderRadius: '24px', 
          width: '70%', 
          minWidth: '300px' 
        }}
      >
        <div className="card-body p-4">
          
          {/* Header de la Card Titre + Icone */}
          <div className="d-flex align-items-center gap-2 mb-2">
              <CalendarDays size={20} color="#ADABAB" /> 
              <h5 className="mb-0 fw-bold" style={{ color: '#FAFAFA' }}>Calendrier</h5>
          </div>

          {/* --- Le composant calendrier --- */}
          <Calendar 
            // Quand on clique sur une date, on met à jour le State
            onChange={setDate} 
            // La valeur affichée (le jour sélectionné)
            value={date} 
            // On applique notre CSS perso
            className="custom-calendar"
            // On force la langue en Français
            locale="fr-FR"
            
            // --- Les points ---
            // Cette prop 'tileContent' est une fonction qui s'exécute pour CHAQUE jour affiché.
            // Elle reçoit la date du jour en question ({ date }) et la vue ({ view }).
            tileContent={({ date, view }) => {
              // On ne veut afficher les points que dans la vue "Mois"
              // ET seulement si la date est dans notre tableau de réservations
              if (view === 'month' && hasReservation(date)) {
                return (
                  // Si c'est vrai, on injecte ce petit rond sous le chiffre
                  <div className="d-flex justify-content-center mt-1">
                    <div 
                      className="rounded-circle" 
                      style={{ 
                        width: '5px', 
                        height: '5px', 
                        backgroundColor: '#FAFAFA' 
                      }}
                    />
                  </div>
                );
              }
              // Sinon, on n'affiche rien de plus
              return null;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarCard;