import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const ListView = ({ events, activeDate, handleEventClick }) => {
  // 1. FILTRE ET TRI DES DONNÉES
  // On garde uniquement les événements à partir du 1er jour du mois affiché (activeDate).
  // On les trie chronologiquement (a.date - b.date).
  const upcomingEvents = events
    .filter(e => e.date >= new Date(activeDate.getFullYear(), activeDate.getMonth(), 1))
    .sort((a, b) => a.date - b.date);

  return (
    <div className="flex-grow-1 overflow-auto p-4 w-100 bg-light">
      <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '900px' }}>
        <div className="list-group list-group-flush">
          
          {/* 2. BOUCLE D'AFFICHAGE */}
          {upcomingEvents.map(ev => (
            <div 
              key={ev.id} 
              className="list-group-item p-3 d-flex align-items-center gap-4 hover-bg-light transition-all" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => handleEventClick(e, ev.id)} // Go page détail
            >
              
              {/* BLOC GAUCHE : La date stylisée (ex: 12 Fév / Lundi) */}
              <div className="text-center border-end pe-4" style={{ minWidth: '120px' }}>
                <div className="fw-bold fs-5" style={{ color: '#430000' }}>
                  {ev.date.getDate()} {ev.date.toLocaleDateString('fr-FR', { month: 'short' })}
                </div>
                <div className="text-muted small">
                  {ev.date.toLocaleDateString('fr-FR', { weekday: 'long' })}
                </div>
              </div>
              
              {/* BLOC MILIEU : Titre et détails (Heure, Durée, Lieu) */}
              <div className="flex-grow-1">
                <h5 className="mb-1 fw-bold text-dark">{ev.title}</h5>
                <div className="text-muted small d-flex gap-3">
                  <span>
                    <Clock size={14} className="me-1"/> {ev.time} ({ev.duration})
                  </span>
                  <span>
                    <MapPin size={14} className="me-1"/> {ev.location}
                  </span>
                </div>
              </div>
              
              {/* BLOC DROITE : La pastille avec la couleur dynamique (ev.color) */}
              <div>
                <span className={`badge rounded-pill ${ev.color} px-3 py-2`}>
                  {ev.type}
                </span>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ListView;