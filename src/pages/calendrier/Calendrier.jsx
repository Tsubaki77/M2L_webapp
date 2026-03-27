import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CalendarDays, LayoutGrid, LayoutTemplate, List } from 'lucide-react';

import { api } from '../../utils/api';
import { getWeekDates, reservationToEvent } from '../../utils/calendarUtils.js';

import MonthView from './MonthView.jsx';
import WeekView from './WeekView.jsx';
import DayView from './DayView.jsx';
import ListView from './ListView.jsx';

const Calendrier = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const salleFiltre = location.state?.salleNom ?? null;

  const [activeDate,  setActiveDate]  = useState(new Date());
  const [currentView, setCurrentView] = useState('week');
  const [events,      setEvents]      = useState([]);
  const [isLoading,   setIsLoading]   = useState(true);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getReservations();
      setEvents(data.map(reservationToEvent));
    } catch {
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const filteredEvents = salleFiltre
    ? events.filter(e => e.salle?.nom === salleFiltre)
    : events;

  const handleEventClick = (e, eventId) => {
    e.stopPropagation();
    navigate(`/demandes/${eventId}`);
  };

  const shiftDate = (months, weeks, days) => {
    setActiveDate(prev => new Date(
      prev.getFullYear(),
      prev.getMonth() + months,
      prev.getDate() + (weeks * 7) + days
    ));
  };

  const handlePrev = () => {
    if (currentView === 'month' || currentView === 'list') shiftDate(-1, 0, 0);
    else if (currentView === 'week') shiftDate(0, -1, 0);
    else shiftDate(0, 0, -1);
  };

  const handleNext = () => {
    if (currentView === 'month' || currentView === 'list') shiftDate(1, 0, 0);
    else if (currentView === 'week') shiftDate(0, 1, 0);
    else shiftDate(0, 0, 1);
  };

  const handleToday = () => setActiveDate(new Date());

  const getDynamicTitle = () => {
    if (currentView === 'month' || currentView === 'list') {
      return activeDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    }
    if (currentView === 'day') {
      return activeDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
    const week  = getWeekDates(activeDate);
    const first = week[0];
    const last  = week[6];
    return first.getMonth() === last.getMonth()
      ? `${first.getDate()} – ${last.getDate()} ${last.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`
      : `${first.getDate()} ${first.toLocaleDateString('fr-FR', { month: 'short' })} – ${last.getDate()} ${last.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}`;
  };

  return (
    <div className="cal-wrapper">
      <div className="cal-card">

        {/* ── Barre d'outils ── */}
        <div className="cal-toolbar">

          {/* Sélecteur de vue */}
          <div className="cal-view-switcher">
            <button
              className={`cal-view-btn${currentView === 'month' ? ' active' : ''}`}
              onClick={() => setCurrentView('month')}
              title="Vue mois"
            >
              <CalendarDays size={17} />
            </button>
            <button
              className={`cal-view-btn${currentView === 'week' ? ' active' : ''}`}
              onClick={() => setCurrentView('week')}
              title="Vue semaine"
            >
              <LayoutGrid size={17} />
            </button>
            <button
              className={`cal-view-btn${currentView === 'day' ? ' active' : ''}`}
              onClick={() => setCurrentView('day')}
              title="Vue jour"
            >
              <LayoutTemplate size={17} />
            </button>
            <button
              className={`cal-view-btn${currentView === 'list' ? ' active' : ''}`}
              onClick={() => setCurrentView('list')}
              title="Vue liste"
            >
              <List size={17} />
            </button>
          </div>

          {/* Navigation centrale */}
          <div className="cal-nav">
            <button className="cal-nav-btn" onClick={handlePrev}><ChevronLeft size={20} /></button>
            <h5 className="cal-title">{getDynamicTitle()}</h5>
            <button className="cal-nav-btn" onClick={handleNext}><ChevronRight size={20} /></button>
          </div>

          {/* Droite */}
          <div className="d-flex align-items-center gap-2">
            {salleFiltre && (
              <span className="badge bg-danger">Salle : {salleFiltre}</span>
            )}
            <button className="cal-today-btn" onClick={handleToday}>Aujourd'hui</button>
          </div>
        </div>

        {/* ── Légende ── */}
        <div className="cal-legend">
          <span className="cal-legend-item">
            <span className="cal-legend-dot" style={{ background: '#fef3c7', borderColor: '#d97706' }} />
            En attente
          </span>
          <span className="cal-legend-item">
            <span className="cal-legend-dot" style={{ background: '#dcfce7', borderColor: '#16a34a' }} />
            Validée
          </span>
          <span className="cal-legend-item">
            <span className="cal-legend-dot" style={{ background: '#fee2e2', borderColor: '#dc2626' }} />
            Refusée
          </span>
        </div>

        {/* ── Vues ── */}
        {isLoading ? (
          <div className="cal-loading">
            <div className="spinner-border" style={{ color: 'var(--m2l-red)' }} />
          </div>
        ) : (
          <>
            {currentView === 'month' && (
              <MonthView
                events={filteredEvents}
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                setCurrentView={setCurrentView}
                handleEventClick={handleEventClick}
              />
            )}
            {currentView === 'week' && (
              <WeekView
                events={filteredEvents}
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                setCurrentView={setCurrentView}
                handleEventClick={handleEventClick}
              />
            )}
            {currentView === 'day' && (
              <DayView
                events={filteredEvents}
                activeDate={activeDate}
                handleEventClick={handleEventClick}
              />
            )}
            {currentView === 'list' && (
              <ListView
                events={filteredEvents}
                activeDate={activeDate}
                handleEventClick={handleEventClick}
              />
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Calendrier;
