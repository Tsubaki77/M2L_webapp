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

  const hasReservation = (dateToCheck) => {
    return reservations.some(resaDate => 
      resaDate.getDate() === dateToCheck.getDate() &&
      resaDate.getMonth() === dateToCheck.getMonth() &&
      resaDate.getFullYear() === dateToCheck.getFullYear()
    );
  };

  return (
    <>
    <style>
      {`
        /* =========================================
        1. CONFIGURATION GÉNÉRALE & NAVIGATION
        ========================================= */
        .custom-calendar { 
          width: 100%; 
          height: 100%;
          background: transparent !important;
          border: none !important;
          font-family: inherit; 
          color: #FAFAFA !important; 
          display: flex;
          flex-direction: column;
        }

        /* La zone de contenu (Mois/Année/Jours) prend tout l'espace restant */
        .react-calendar__viewContainer {
          flex-grow: 1; 
        }

        /* Barre de Navigation (Mois 2026 ...) */
        .react-calendar__navigation {
          background: transparent !important;
          border-bottom: none !important;
          height: 40px !important;
          margin-bottom: 10px !important;
        }

        .react-calendar__navigation button {
          color: #FAFAFA !important;
          min-width: 40px;
          background: none;
          font-size: 1.2rem !important;
          font-weight: 500 !important;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .react-calendar__navigation__arrow {
          font-size: 1.8rem !important;
          font-weight: 300 !important;
          padding-bottom: 4px;
        }

        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: rgba(255, 255, 255, 0.1) !important;
          border-radius: 8px;
        }

        /* =========================================
        2. VUE CLASSIQUE (JOURS DE LA SEMAINE & TUILES)
        ========================================= */
        
        /* Lundi, Mardi... */
        .react-calendar__month-view__weekdays__weekday {
          color: #ADABAB !important; 
          font-size: 0.75rem; 
          text-transform: uppercase;
          text-decoration: none !important;
          padding-bottom: 10px;
        }
        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
          cursor: default;
        }

        /* Les cases des jours (1, 2, 3...) */
        .react-calendar__tile {
          color: #FAFAFA; 
          background: none; 
          text-align: center;
          font-size: 0.9rem;
          position: relative; 
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 40px; 
          padding: 7px 4px !important;
        }

        /* =========================================
        3. VUES "ZOOM" (SÉLECTION MOIS & ANNÉES)
        J'ai regroupé les deux vues ici car le style est identique
        ========================================= */

        /* Conteneurs (Grille) */
        .react-calendar__year-view__months, 
        .react-calendar__decade-view__years {
          display: flex !important;
          flex-wrap: wrap !important;
          align-content: center !important; /* Centre verticalement dans la carte */
          height: 100%;
          padding: 10px 0;
        }

        /* Boutons (Janvier... ou 2026...) */
        .react-calendar__year-view__months__month,
        .react-calendar__decade-view__years__year {
          flex: 0 0 33.3333% !important; /* 3 par ligne */
          max-width: 33.3333% !important;
          font-size: 1rem !important;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 12px !important;
          padding: 15px 0 !important;
          margin-bottom: 15px !important; /* Espace entre les lignes */
        }

        /* Suppression de la marge pour les 3 derniers éléments (bas de la grille) */
        .react-calendar__year-view__months__month:nth-last-child(-n+3),
        .react-calendar__decade-view__years__year:nth-last-child(-n+3) {
          margin-bottom: 0 !important;
        }

        /* =========================================
        4. ÉTATS INTERACTIFS (HOVER, ACTIVE, NOW)
        Applicable à toutes les tuiles (Jours, Mois, Années)
        ========================================= */

        /* Hover */
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus,
        .react-calendar__year-view__months__month:hover,
        .react-calendar__decade-view__years__year:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px;
        }

        /* Élément sélectionné (Rouge) */
        .react-calendar__tile--active,
        .react-calendar__tile--hasActive {
          background: #CC4040 !important; 
          border-radius: 12px;
          color: #FAFAFA !important;
        }

        /* Aujourd'hui (Gris/Transparent) */
        .react-calendar__tile--now {
          background: #ADABAB !important;
          border-radius: 12px;
        }
      `}
    </style>

      {/* J'ai gardé tes dimensions exactes ici */}
      <div 
        className="card border-0 shadow text-white overflow-hidden" 
        style={{ 
          backgroundColor: '#430000', 
          borderRadius: '24px', 
          width: '70%', 
          minWidth: '300px', 
          height: '390px'
        }}
      >
        <div className="card-body p-3"> {/* p-3 au lieu de p-1 pour aérer légèrement les bords */}
          
          {/* Header de la Card Titre + Icone */}
          <div className="d-flex align-items-center gap-2 mb-2">
              <CalendarDays size={18} color="#ADABAB" /> 
              <h5 className="mb-0 fw-bold" style={{ color: '#FAFAFA', fontSize: '1.3rem' }}>Calendrier</h5>
          </div>

          {/* --- Le composant calendrier --- */}
          <Calendar 
            onChange={setDate} 
            value={date} 
            className="custom-calendar"
            locale="fr-FR"
            tileContent={({ date, view }) => {
              if (view === 'month' && hasReservation(date)) {
                return (
                  // Margin top réduit pour coller au chiffre
                  <div className="mt-2">
                    <div 
                      className="rounded-circle" 
                      style={{ 
                        width: '4px', 
                        height: '4px', 
                        backgroundColor: '#FAFAFA' 
                      }} 
                    />
                  </div>
                );
              }
              return null;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarCard;