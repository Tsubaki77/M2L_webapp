import React from 'react';
import { Clock, MapPin, CalendarDays } from 'lucide-react';

const DayView = ({ events, activeDate, handleEventClick }) => {
  // 1. FILTRE : Je garde uniquement les events du jour affiché
  const dayEvents = events.filter(e => e.date.toDateString() === activeDate.toDateString());

  return (
    <div className="flex-grow-1 overflow-auto p-4 bg-light w-100">
      <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
        
        {/* HEADER */}
        <div className="card-header bg-white border-bottom py-3">
          <h5 className="mb-0 fw-bold" style={{ color: '#430000' }}>Programme du jour</h5>
        </div>
        
        {/* BODY */}
        <div className="card-body p-0">
          
          {/* 2. CONDITION : Des events aujourd'hui ? */}
          {dayEvents.length > 0 ? (
            <div className="list-group list-group-flush">
              
              {/* Trie par heure (08h avant 10h) et je boucle */}
              {dayEvents.sort((a,b) => a.time.localeCompare(b.time)).map(ev => (
                <div 
                  key={ev.id} 
                  className="list-group-item p-4 d-flex gap-4 align-items-center border-bottom hover-bg-light transition-all" 
                  style={{ cursor: 'pointer' }} 
                  onClick={(e) => handleEventClick(e, ev.id)} // Go vers la vue détail
                >
                  
                  {/* Gauche : Heure / Durée */}
                  <div className="text-center" style={{ minWidth: '80px' }}>
                    <h4 className="fw-bold mb-0 text-dark">{ev.time}</h4>
                    <small className="text-muted">{ev.duration}</small>
                  </div>
                  
                  {/* Droite : Infos + Couleur dynamique de la ligue (ev.color) */}
                  <div className={`p-3 rounded-3 border flex-grow-1 ${ev.color}`}>
                    <h5 className="fw-bold mb-1">{ev.title}</h5>
                    <div className="d-flex gap-3 small mt-2 opacity-75">
                      <span className="d-flex align-items-center gap-1"><MapPin size={14}/> {ev.location}</span>
                      <span className="d-flex align-items-center gap-1 text-uppercase fw-bold"><Clock size={14}/> {ev.type}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            
            <div className="p-5 text-center text-muted">
              {/* 3. EMPTY STATE : Rien de prévu aujourd'hui */}
              <CalendarDays size={48} className="mb-3 opacity-25" />
              <h5>Aucune réservation prévue.</h5>
            </div>
            
          )}

        </div>
      </div>
    </div>
  );
};

export default DayView;