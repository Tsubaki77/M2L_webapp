import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/Calendrier.css';
import { CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { reservationToEvent, eventOnDate } from '../../utils/calendarUtils';

const CalendarCard = () => {
  const navigate = useNavigate();
  const [date,   setDate]   = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.getReservations()
      .then(data => setEvents(data.map(reservationToEvent)))
      .catch(() => setEvents([]));
  }, []);

  return (
    <div
      className="card border-0 shadow text-white overflow-hidden dash-cal-card"
      style={{ backgroundColor: '#430000', borderRadius: '24px' }}
    >
      <div className="card-body p-3">
        <div className="d-flex align-items-center gap-2 mb-2">
          <CalendarDays size={18} color="#ADABAB" />
          <h5 className="mb-0 fw-bold" style={{ color: '#FAFAFA', fontSize: '1.3rem' }}>Calendrier</h5>
        </div>

        <Calendar
          onChange={setDate}
          value={date}
          className="custom-calendar"
          locale="fr-FR"
          onClickDay={(clickedDate) => {
            navigate('/calendrier', { state: { dateFromDashboard: clickedDate } });
          }}
          tileContent={({ date: tileDate, view }) => {
            if (view !== 'month') return null;
            const dayEvents = events.filter(e => eventOnDate(e, tileDate));
            if (dayEvents.length === 0) return null;

            return (
              <div className="d-flex justify-content-center gap-1 mt-1 flex-wrap">
                {dayEvents.slice(0, 3).map(ev => (
                  <div
                    key={ev.id}
                    className="rounded-circle"
                    style={{
                      width: '5px',
                      height: '5px',
                      backgroundColor: ev.color.border,
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CalendarCard;
