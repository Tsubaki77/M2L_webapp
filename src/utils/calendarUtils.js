// calendarUtils.js
export const parseDateFR = (dateStr) => {
  if (!dateStr) return new Date();
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day);
};

export const getColorForEvent = (req) => {
  if (req.league?.includes('Football') || req.league?.includes('Tennis')) return 'bg-success-subtle text-success border-success';
  if (req.league?.includes('Basket') || req.league?.includes('Handball') || req.league?.includes('Natation')) return 'bg-info-subtle text-info border-info';
  if (req.league?.includes('Administration') || req.league?.includes('Direction')) return 'bg-warning-subtle text-dark border-warning';
  if (req.league?.includes('Judo') || req.league?.includes('Karaté')) return 'bg-danger-subtle text-danger border-danger';
  return 'bg-secondary-subtle text-secondary border-secondary';
};

export const getWeekDates = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
  const startOfWeek = new Date(d.setDate(diff));
  return Array.from({ length: 7 }).map((_, i) => new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
};