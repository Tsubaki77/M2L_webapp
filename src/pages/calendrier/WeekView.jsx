import React from 'react';
import { getWeekDates, eventOnDate, parseTime } from '../../utils/calendarUtils';

const HOUR_START = 7;
const HOUR_END   = 22;
const HOUR_H     = 64; // px par heure

const WeekView = ({ events, activeDate, setActiveDate, setCurrentView, handleEventClick }) => {
  const weekDates = getWeekDates(activeDate);
  const hours     = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i);
  const today     = new Date();

  const handleDayHeaderClick = (date) => {
    setActiveDate(date);
    setCurrentView('day');
  };

  return (
    <div className="cal-timegrid-wrapper">

      {/* ── En-têtes colonnes ── */}
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

      {/* ── Corps scrollable ── */}
      <div className="cal-timegrid-body custom-scroll">
        <div className="cal-timegrid-inner" style={{ height: `${(HOUR_END - HOUR_START) * HOUR_H}px` }}>

          {/* Colonne des heures */}
          <div className="cal-timegrid-hours">
            {hours.map(h => (
              <div key={h} className="cal-timegrid-hour-label" style={{ height: `${HOUR_H}px` }}>
                {String(h).padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {/* Colonnes jours */}
          {weekDates.map((day, di) => {
            const dayEvents = events.filter(e => eventOnDate(e, day));
            return (
              <div key={di} className="cal-timegrid-col">
                {/* Lignes horaires */}
                {hours.map(h => (
                  <div
                    key={h}
                    className="cal-timegrid-hour-line"
                    style={{ top: `${(h - HOUR_START) * HOUR_H}px` }}
                  />
                ))}

                {/* Événements */}
                {dayEvents.map(ev => {
                  const start  = parseTime(ev.heureDebut);
                  const end    = parseTime(ev.heureFin);
                  const top    = (start - HOUR_START) * HOUR_H;
                  const height = Math.max((end - start) * HOUR_H, 24);

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
