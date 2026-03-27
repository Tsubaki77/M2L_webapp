// Génère les 7 jours d'une semaine à partir du lundi
export const getWeekDates = (date) => {
  const monday = new Date(date);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

// Couleur selon le statut de la réservation
export const getColorForStatut = (statut) => {
  switch (statut) {
    case 'VALIDEE':   return { bg: '#dcfce7', border: '#16a34a', text: '#15803d' };
    case 'REFUSEE':   return { bg: '#fee2e2', border: '#dc2626', text: '#b91c1c' };
    case 'EN_ATTENTE':
    default:          return { bg: '#fef3c7', border: '#d97706', text: '#b45309' };
  }
};

// Transforme une réservation API en event calendrier
export const reservationToEvent = (r) => ({
  id:        r.id,
  dateDebut: new Date(r.dateDebut),
  dateFin:   new Date(r.dateFin),
  heureDebut: r.heureDebut,
  heureFin:   r.heureFin,
  motif:     r.motif || 'Réservation',
  statut:    r.statut,
  adherent:  r.adherent ?? null,
  salle:     r.salle    ?? null,
  color:     getColorForStatut(r.statut),
});

// Parse "HH:MM" → nombre décimal d'heures (ex: "14:30" → 14.5)
export const parseTime = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h + m / 60;
};

// Vérifie si un event est visible sur un jour donné
export const eventOnDate = (event, date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const debut = new Date(event.dateDebut);
  debut.setHours(0, 0, 0, 0);
  const fin = new Date(event.dateFin);
  fin.setHours(0, 0, 0, 0);
  return d >= debut && d <= fin;
};

// Label du statut en français
export const statutLabel = (statut) => {
  switch (statut) {
    case 'VALIDEE':    return 'Validée';
    case 'REFUSEE':    return 'Refusée';
    case 'EN_ATTENTE': return 'En attente';
    default:           return statut ?? '—';
  }
};
