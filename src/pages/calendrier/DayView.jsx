import React from 'react';
import { CalendarDays } from 'lucide-react';
import { eventOnDate, parseTime } from '../../utils/calendarUtils';

const HOUR_START = 7;
const HOUR_END   = 22;
const HOUR_H     = 64;

const DayView = ({ events, activeDate, handleEventClick }) => {
  const dayEvents = events.filter(e => eventOnDate(e, activeDate));
  const hours     = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i);
  const isToday   = activeDate.toDateString() === new Date().toDateString();

  return (
    <div className="cal-timegrid-wrapper">

      {/* ── En-tête ── */}
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

      {/* ── Corps ── */}
      <div className="cal-timegrid-body custom-scroll">
        <div className="cal-timegrid-inner" style={{ height: `${(HOUR_END - HOUR_START) * HOUR_H}px` }}>

          {/* Heures */}
          <div className="cal-timegrid-hours">
            {hours.map(h => (
              <div key={h} className="cal-timegrid-hour-label" style={{ height: `${HOUR_H}px` }}>
                {String(h).padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {/* Colonne unique */}
          <div className="cal-timegrid-col" style={{ flex: 1 }}>
            {hours.map(h => (
              <div
                key={h}
                className="cal-timegrid-hour-line"
                style={{ top: `${(h - HOUR_START) * HOUR_H}px` }}
              />
            ))}

            {dayEvents.length === 0 && (
              <div className="cal-day-empty">
                <CalendarDays size={40} className="mb-2 opacity-25" />
                <div>Aucune réservation ce jour</div>
              </div>
            )}

            {dayEvents.map(ev => {
              const start  = parseTime(ev.heureDebut);
              const end    = parseTime(ev.heureFin);
              const top    = (start - HOUR_START) * HOUR_H;
              const height = Math.max((end - start) * HOUR_H, 30);

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
