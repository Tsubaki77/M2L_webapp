import React from 'react';
import { getWeekDates, eventOnDate, parseTime } from '../../utils/calendarUtils';

// Grille horaire affichée : de 7h à 22h
const HEURE_DEBUT  = 7;
const HEURE_FIN     = 22;
const HAUTEUR_HEURE = 64; // hauteur en pixels d'une heure dans la grille

// Vue semaine : une grille avec les heures en colonne de gauche
// et les 7 jours de la semaine en colonnes
const WeekView = ({ events, activeDate, setActiveDate, setCurrentView, handleEventClick }) => {
  const weekDates = getWeekDates(activeDate);
  const heures    = Array.from({ length: HEURE_FIN - HEURE_DEBUT }, (_, i) => HEURE_DEBUT + i);
  const today     = new Date();

  // Cliquer sur l'en-tête d'un jour bascule sur la vue "jour"
  const handleDayHeaderClick = (date) => {
    setActiveDate(date);
    setCurrentView('day');
  };

  return (
    <div className="cal-timegrid-wrapper">

      {/* En-têtes des 7 jours */}
      <div className="cal-timegrid-header">
        <div className="cal-timegrid-gutter" />
        {weekDates.map((day, i) => {
          const isToday = day.toDateString() === today.toDateString();
          return (
            <div
              key={i}
              className={`cal-timegrid-col-header${isToday ? ' today' : ''}`}
              onClick={() => handleDayHeaderClick(day)}
            >
              <div className="cal-timegrid-weekday">
                {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
              </div>
              <div className={`cal-timegrid-daynum${isToday ? ' today-num' : ''}`}>
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Corps de la grille, qui peut défiler verticalement */}
      <div className="cal-timegrid-body custom-scroll">
        <div className="cal-timegrid-inner" style={{ height: `${(HEURE_FIN - HEURE_DEBUT) * HAUTEUR_HEURE}px` }}>

          {/* Colonne avec les heures affichées */}
          <div className="cal-timegrid-hours">
            {heures.map(h => (
              <div key={h} className="cal-timegrid-hour-label" style={{ height: `${HAUTEUR_HEURE}px` }}>
                {String(h).padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {/* Une colonne par jour de la semaine */}
          {weekDates.map((day, di) => {
            const dayEvents = events.filter(e => eventOnDate(e, day));
            return (
              <div key={di} className="cal-timegrid-col">
                {/* Traits horizontaux délimitant chaque heure */}
                {heures.map(h => (
                  <div
                    key={h}
                    className="cal-timegrid-hour-line"
                    style={{ top: `${(h - HEURE_DEBUT) * HAUTEUR_HEURE}px` }}
                  />
                ))}

                {/* Réservations du jour, positionnées selon leur horaire */}
                {dayEvents.map(ev => {
                  const debut  = parseTime(ev.heureDebut);
                  const fin    = parseTime(ev.heureFin);
                  const top    = (debut - HEURE_DEBUT) * HAUTEUR_HEURE;
                  const height = Math.max((fin - debut) * HAUTEUR_HEURE, 24);

                  return (
                    <div
                      key={ev.id}
                      className="cal-timegrid-event"
                      style={{
                        top:         `${top}px`,
                        height:      `${height}px`,
                        background:  ev.color.bg,
                        borderColor: ev.color.border,
                        color:       ev.color.text,
                      }}
                      onClick={(e) => handleEventClick(e, ev.id)}
                    >
                      <div className="cal-event-time">
                        {ev.heureDebut?.slice(0, 5)} – {ev.heureFin?.slice(0, 5)}
                      </div>
                      <div className="cal-event-title">{ev.motif}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default WeekView;
