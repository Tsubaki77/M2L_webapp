import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { eventOnDate } from '../../utils/calendarUtils';

const MAX_AFFICHES = 2; // nombre de réservations affichées par jour avant le "+X de plus"

// Vue mois : utilise la librairie react-calendar et ajoute les réservations
// du jour directement dans chaque case
const MonthView = ({ events, activeDate, setActiveDate, setCurrentView, handleEventClick }) => {

  // Cliquer sur un jour bascule sur la vue "jour" correspondante
  const handleDayClick = (date) => {
    setActiveDate(date);
    setCurrentView('day');
  };

  return (
    <div className="flex-grow-1 overflow-auto p-2 w-100">
      <Calendar
        value={activeDate}
        activeStartDate={activeDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveDate(activeStartDate)}
        onClickDay={handleDayClick}
        locale="fr-FR"
        className="big-m2l-calendar"

        tileContent={({ date, view }) => {
          if (view !== 'month') return null;

          const dayEvents = events.filter(e => eventOnDate(e, date));

          return (
            <div className="w-100 text-start mt-1 d-flex flex-column gap-1">
              {dayEvents.slice(0, MAX_AFFICHES).map(ev => (
                <div
                  key={ev.id}
                  className="cal-month-event"
                  style={{
                    background:  ev.color.bg,
                    borderColor: ev.color.border,
                    color:       ev.color.text,
                  }}
                  onClick={(e) => handleEventClick(e, ev.id)}
                >
                  {ev.heureDebut?.slice(0, 5)} {ev.motif}
                </div>
              ))}
              {dayEvents.length > MAX_AFFICHES && (
                <div className="cal-month-more">+{dayEvents.length - MAX_AFFICHES} de plus</div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default MonthView;
