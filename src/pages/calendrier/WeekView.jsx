import React from 'react';
import { getWeekDates } from '../../utils/calendarUtils.js'; 

const WeekView = ({ events, activeDate, handleEventClick }) => {
  // 1. GÉNÉRATION DES 7 JOURS
  const weekDates = getWeekDates(activeDate);

  return (
    <div className="flex-grow-1 d-flex w-100 overflow-hidden bg-light">
      
      {/* 2. BOUCLE SUR LES 7 COLONNES */}
      {weekDates.map((day, idx) => {
        // Filtre les events pour ne garder que ceux de CETTE colonne (ce jour-là)
        const dayEvents = events.filter(e => e.date.toDateString() === day.toDateString());
        
        // Vérifie si la colonne en cours correspond à la date d'aujourd'hui 
        const isToday = day.toDateString() === new Date().toDateString();

        return (
          // flex-fill : chaque colonne prend la même place. 14.28% = 100% divisé par 7 jours
          <div key={idx} className="flex-fill border-end bg-white d-flex flex-column" style={{ width: '14.28%', minWidth: '120px' }}>
            
            {/* 3. EN-TÊTE DE LA COLONNE (Jour & Date) */}
            <div className="text-center py-2 border-bottom">
              <div className="small text-muted text-uppercase fw-bold">
                {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
              </div>
              
              {/* Le numéro du jour (Passe en rouge "bg-danger" si c'est aujourd'hui) */}
              <div className={`fs-5 fw-bold d-inline-block rounded-circle ${isToday ? 'bg-danger text-white' : 'text-dark'}`} style={{ width: '35px', height: '35px', lineHeight: '35px' }}>
                {day.getDate()}
              </div>
            </div>
            
            {/* 4. CONTENU DE LA COLONNE (Les réservations) */}
            <div className="p-2 flex-grow-1 overflow-auto">
              
              {/* On boucle sur les events du jour pour créer les petites cartes */}
              {dayEvents.map(ev => (
                <div 
                  key={ev.id} 
                  // Injecte la couleur dynamique de la ligue (ev.color)
                  className={`p-2 mb-2 rounded border shadow-sm ${ev.color}`} 
                  style={{ cursor: 'pointer' }} 
                  onClick={(e) => handleEventClick(e, ev.id)} // Go vers la vue détail
                >
                  <div className="fw-bold small">{ev.title}</div>
                  <div style={{ fontSize: '0.75rem' }}>{ev.time} - {ev.location}</div>
                </div>
              ))}

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default WeekView;