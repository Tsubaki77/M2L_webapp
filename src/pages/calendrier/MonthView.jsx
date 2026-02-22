import React from 'react';
import Calendar from 'react-calendar';

const MonthView = ({ events, activeDate, setActiveDate, selectedDate, setSelectedDate, setCurrentView, handleEventClick }) => {
  return (
    <div className="flex-grow-1 overflow-auto p-2 w-100">
      
      {/* 1. LE COMPOSANT CALENDRIER */}
      <Calendar 
        // Synchronisation avec nos états (states) du composant parent
        onChange={setSelectedDate} 
        value={selectedDate} 
        activeStartDate={activeDate} 
        onActiveStartDateChange={({ activeStartDate }) => setActiveDate(activeStartDate)}
        locale="fr-FR" 
        className="big-m2l-calendar"
        
        // 2. INTERACTION : Clic sur la case d'un jour (vide ou non)
        // -> Met à jour la date active et bascule direct sur la vue "Jour"
        onClickDay={(val) => { 
          setActiveDate(val); 
          setCurrentView('day'); 
        }}
        
        // 3. INJECTION DU CONTENU DANS LES CASES (tileContent)
        // C'est ici qu'on ajoute nos petites "pilules" de réservation dans la grille
        tileContent={({ date, view }) => {
          // On ne fait ça que si on regarde la vue mensuelle (sécurité)
          if (view === 'month') {
            
            // Cherche tous les events qui tombent exactement sur la date de cette case
            const dayEvents = events.filter(e => e.date.toDateString() === date.toDateString());
            
            return (
              <div className="w-100 text-start mt-1 d-flex flex-column gap-1">
                
                {/* 4. BOUCLE D'AFFICHAGE DES PILULES */}
                {dayEvents.map(ev => (
                  <div 
                    key={ev.id} 
                    // ev.color contient déjà nos classes Bootstrap 
                    className={`px-1 py-1 rounded small border ${ev.color} text-truncate`} 
                    style={{ fontSize: '0.75rem', cursor: 'pointer' }} 
                    
                    // Clic sur la pilule précise -> Go page détail 
                    onClick={(e) => handleEventClick(e, ev.id)} //handleEventClick gère le stopPropagation pour éviter de déclencher le onClick de la case du jour
                  >
                    <span className="fw-bold me-1">{ev.time}</span>
                    {ev.title}
                  </div>
                ))}

              </div>
            );
          }
          return null; // Si on n'est pas en vue mois, on n'injecte rien
        }}
      />

    </div>
  );
};

export default MonthView;