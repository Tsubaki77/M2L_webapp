import React from 'react';
import { CalendarDays, Clock, User } from 'lucide-react';
import { statutLabel } from '../../utils/calendarUtils';

const ListView = ({ events, activeDate, handleEventClick }) => {
  const monthStart = new Date(activeDate.getFullYear(), activeDate.getMonth(), 1);

  const upcoming = [...events]
    .filter(e => e.dateFin >= monthStart)
    .sort((a, b) => a.dateDebut - b.dateDebut);

  // Grouper par date de début
  const groups = {};
  upcoming.forEach(ev => {
    const key = ev.dateDebut.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day:     'numeric',
      month:   'long',
      year:    'numeric',
    });
    if (!groups[key]) groups[key] = [];
    groups[key].push(ev);
  });

  if (Object.keys(groups).length === 0) {
    return (
      <div className="cal-list-empty">
        <CalendarDays size={48} className="mb-3 opacity-25" />
        <p className="text-muted mb-0">Aucune réservation ce mois-ci</p>
      </div>
    );
  }

  return (
    <div className="cal-list custom-scroll">
      {Object.entries(groups).map(([dateLabel, dayEvents]) => (
        <div key={dateLabel} className="cal-list-group">
          <div className="cal-list-date">{dateLabel}</div>
          {dayEvents.map(ev => (
            <div
              key={ev.id}
              className="cal-list-item"
              style={{ borderLeftColor: ev.color.border }}
              onClick={(e) => handleEventClick(e, ev.id)}
            >
              <div className="cal-list-item-left">
                <div className="cal-list-time">
                  <Clock size={13} />
                  {ev.heureDebut?.slice(0, 5)} – {ev.heureFin?.slice(0, 5)}
                </div>
                <div className="cal-list-motif">{ev.motif}</div>
                {ev.adherent && (
                  <div className="cal-list-adherent">
                    <User size={12} /> {ev.adherent.prenom} {ev.adherent.nom}
                  </div>
                )}
              </div>
              <span
                className="cal-list-badge"
                style={{
                  background:  ev.color.bg,
                  borderColor: ev.color.border,
                  color:       ev.color.text,
                }}
              >
                {statutLabel(ev.statut)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListView;
