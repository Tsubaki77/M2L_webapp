import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CalendarDays, LayoutGrid, LayoutTemplate, List } from 'lucide-react';

// 1. IMPORTS
import '../../css/Calendrier.css'; // Mon CSS custom qui écrase react-calendar
import { parseDateFR, getColorForEvent, getWeekDates } from '../../utils/calendarUtils.js'; // Ma boîte à outils externe
import { requestData } from '../data/requestData'; // Mock de données de réservations

// Mes 4 composants de vue découpés pour plus de clarté
import MonthView from './MonthView.jsx';
import WeekView from './WeekView.jsx';
import DayView from './DayView.jsx';
import ListView from './ListView.jsx';

const Calendrier = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 2. CONTEXTE : D'où vient l'utilisateur ?
  // location.state = les infos cachées envoyées par navigate() sur les autres pages
  const dateFromDash = location.state?.dateFromDashboard; // S'il a cliqué sur le mini-calendrier
  const salleFiltre = location.state?.salleNom;           // S'il vient de la page d'une salle

  // 3. ÉTATS (STATES)
  // Si je viens du dashboard, je me cale sur la date cliquée. Sinon, on force à Oct 2025 pour les tests (mock de données)
  const [activeDate, setActiveDate] = useState(dateFromDash ? new Date(dateFromDash) : new Date(2025, 9, 1)); 
  const [selectedDate, setSelectedDate] = useState(dateFromDash ? new Date(dateFromDash) : new Date(2025, 9, 12)); 
  
  // Si je viens du dashboard -> vue 'day' direct. Sinon vue 'month'.
  const [currentView, setCurrentView] = useState(dateFromDash ? 'day' : 'month');

  // 4. PRÉPARATION DES DONNÉES
  // Je convertis mes dates texte (JJ/MM/AAAA) en vrais objets Date JS + j'ajoute les couleurs
  const allEvents = requestData.map(req => ({
    id: req.id,
    date: parseDateFR(req.date || req.startDate),
    title: req.objet || req.league,
    time: req.startTime || 'Journée',
    duration: req.endTime ? `Fin: ${req.endTime}` : req.type,
    location: req.roomName,
    type: req.type || 'Réservation',
    color: getColorForEvent(req) 
  }));

  // Je filtre : si on m'a demandé une salle précise, je ne garde que ses events.
  const events = salleFiltre ? allEvents.filter(e => e.location === salleFiltre) : allEvents;

  // 5. ACTIONS
  const handleEventClick = (e, eventId) => {
    e.stopPropagation(); // Évite le double-clic sur la case du jour en dessous
    // Je vais sur la page détail avec l'info 'fromCalendar' pour qu'elle cache les boutons valider/refuser
    navigate(`/demandes/${eventId}`, { state: { fromCalendar: true } });
  };

  // Petite fonction pour reculer/avancer dans le temps
  const shiftDate = (months, weeks, days) => {
    setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth() + months, activeDate.getDate() + (weeks * 7) + days));
  };

  // Les flèches s'adaptent selon la vue actuelle (Mois = saut de 1 mois. Semaine = saut de 1 semaine...)
  const handlePrev = () => currentView === 'month' || currentView === 'list' ? shiftDate(-1, 0, 0) : currentView === 'week' ? shiftDate(0, -1, 0) : shiftDate(0, 0, -1);
  const handleNext = () => currentView === 'month' || currentView === 'list' ? shiftDate(1, 0, 0) : currentView === 'week' ? shiftDate(0, 1, 0) : shiftDate(0, 0, 1);
  
  // Bouton Today
  const handleToday = () => { const today = new Date(); setActiveDate(today); setSelectedDate(today); };

  // Titre généré dynamiquement (ex: "Octobre 2025" ou "12 - 18 Octobre")
  const getDynamicTitle = () => {
    if (currentView === 'month' || currentView === 'list') return activeDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    if (currentView === 'day') return activeDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    // Logique spéciale vue semaine (à cheval sur 2 mois ou pas)
    const week = getWeekDates(activeDate);
    const [first, last] = [week[0], week[6]];
    return first.getMonth() === last.getMonth() 
      ? `${first.getDate()} - ${last.getDate()} ${last.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`
      : `${first.getDate()} ${first.toLocaleDateString('fr-FR', { month: 'short' })} - ${last.getDate()} ${last.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}`;
  };

  // 6. RENDU
  return (
    <div className="d-flex flex-column h-100 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-0 flex-shrink-0"></div>

      <div className="card border-0 shadow-sm rounded-4 flex-grow-1 mx-4 mb-4 overflow-hidden bg-white d-flex flex-column">
        
        {/* LA BARRE D'OUTILS */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom flex-shrink-0">
          
          {/* Le bouton de la vue active passe en fond blanc text-dark) */}
          <div className="d-flex bg-light rounded-3 border p-1 gap-1">
            <button onClick={() => setCurrentView('month')} className={`btn btn-sm px-2 transition-all ${currentView === 'month' ? 'bg-white shadow-sm rounded-2 text-dark' : 'text-muted hover-bg-light border-0'}`}><CalendarDays size={18} /></button>
            <button onClick={() => setCurrentView('week')} className={`btn btn-sm px-2 transition-all ${currentView === 'week' ? 'bg-white shadow-sm rounded-2 text-dark' : 'text-muted hover-bg-light border-0'}`}><LayoutGrid size={18} /></button>
            <button onClick={() => setCurrentView('day')} className={`btn btn-sm px-2 transition-all ${currentView === 'day' ? 'bg-white shadow-sm rounded-2 text-dark' : 'text-muted hover-bg-light border-0'}`}><LayoutTemplate size={18} /></button>
            <button onClick={() => setCurrentView('list')} className={`btn btn-sm px-2 transition-all ${currentView === 'list' ? 'bg-white shadow-sm rounded-2 text-dark' : 'text-muted hover-bg-light border-0'}`}><List size={18} /></button>
          </div>
          
          {/* Navigation Centrale */}
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-sm btn-light border rounded-circle p-1" onClick={handlePrev}><ChevronLeft size={20} /></button>
            <h4 className="m-0 fw-bold text-dark fs-5 text-capitalize text-center" style={{ minWidth: '220px' }}>{getDynamicTitle()}</h4>
            <button className="btn btn-sm btn-light border rounded-circle p-1" onClick={handleNext}><ChevronRight size={20} /></button>
          </div>

          {/* Badge rouge si je filtre par salle */}
          <div>{salleFiltre && <span className="badge bg-danger mt-2">Filtré par salle : {salleFiltre}</span>}</div>

          <div className="d-flex align-items-center gap-2">
            <button className="btn text-white fw-bold px-3 py-1 rounded-pill shadow-sm" style={{ backgroundColor: '#CC4040' }} onClick={handleToday}>Today</button>
          </div>
        </div>

        {/* AFFICHAGE DES COMPOSANTS */}
        {currentView === 'month' && <MonthView events={events} activeDate={activeDate} setActiveDate={setActiveDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setCurrentView={setCurrentView} handleEventClick={handleEventClick} />}
        {currentView === 'week' && <WeekView events={events} activeDate={activeDate} handleEventClick={handleEventClick} />}
        {currentView === 'day' && <DayView events={events} activeDate={activeDate} handleEventClick={handleEventClick} />}
        {currentView === 'list' && <ListView events={events} activeDate={activeDate} handleEventClick={handleEventClick} />}
        
      </div>
    </div>
  );
};

export default Calendrier;