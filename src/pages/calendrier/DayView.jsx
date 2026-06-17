import React from 'react';
import { CalendarDays } from 'lucide-react';
import { eventOnDate, parseTime } from '../../utils/calendarUtils';

const HEURE_DEBUT  = 7;
const HEURE_FIN     = 22;
const HAUTEUR_HEURE = 64;

// Vue jour : la même grille horaire que la vue semaine, mais avec une seule colonne
const DayView = ({ events, activeDate, handleEventClick }) => {
  const dayEvents = events.filter(e => eventOnDate(e, activeDate));
  const heures    = Array.from({ length: HEURE_FIN - HEURE_DEBUT }, (_, i) => HEURE_DEBUT + i);
  const isToday   = activeDate.toDateString() === new Date().toDateString();

  return (
    <div className="cal-timegrid-wrapper">

      <div className="cal-timegrid-header">
        <div className="cal-timegrid-gutter" />
        <div className={`cal-timegrid-col-header${isToday ? ' today' : ''}`} style={{ flex: 1 }}>
          <div className="cal-timegrid-weekday">
            {activeDate.toLocaleDateString('fr-FR', { weekday: 'long' })}
          </div>
          <div className={`cal-timegrid-daynum${isToday ? ' today-num' : ''}`}>
            {activeDate.getDate()} {activeDate.toLocaleDateString('fr-FR', { month: 'short' })}
          </div>
        </div>
      </div>

      <div className="cal-timegrid-body custom-scroll">
        <div className="cal-timegrid-inner" style={{ height: `${(HEURE_FIN - HEURE_DEBUT) * HAUTEUR_HEURE}px` }}>

          <div className="cal-timegrid-hours">
            {heures.map(h => (
              <div key={h} className="cal-timegrid-hour-label" style={{ height: `${HAUTEUR_HEURE}px` }}>
                {String(h).padStart(2, '0')}:00
              </div>
            ))}
          </div>

          <div className="cal-timegrid-col" style={{ flex: 1 }}>
            {heures.map(h => (
              <div
                key={h}
                className="cal-timegrid-hour-line"
                style={{ top: `${(h - HEURE_DEBUT) * HAUTEUR_HEURE}px` }}
              />
            ))}

            {dayEvents.length === 0 && (
              <div className="cal-day-empty">
                <CalendarDays size={40} className="mb-2 opacity-25" />
                <div>Aucune réservation ce jour</div>
              </div>
            )}

            {dayEvents.map(ev => {
              const debut  = parseTime(ev.heureDebut);
              const fin    = parseTime(ev.heureFin);
              const top    = (debut - HEURE_DEBUT) * HAUTEUR_HEURE;
              const height = Math.max((fin - debut) * HAUTEUR_HEURE, 30);

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
                  {ev.adherent && (
                    <div className="cal-event-sub">
                      {ev.adherent.prenom} {ev.adherent.nom}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DayView;
