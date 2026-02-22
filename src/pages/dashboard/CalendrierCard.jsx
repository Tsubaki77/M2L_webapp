import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom'; 
import 'react-calendar/dist/Calendar.css'; 
import '../../css/Calendrier.css'; // Notre CSS personnalisé pour le calendrier
import { CalendarDays } from 'lucide-react';

// 1. MOCKDATA & UTILS
import { requestData } from '../data/requestData';

// Transformer les dates texte "JJ/MM/AAAA" en vrais objets Date JS
const parseDateFR = (dateStr) => {
  if (!dateStr) return new Date();
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day);
};

const CalendarCard = () => {
  // Navigation pour envoyer l'utilisateur sur la page /calendrier
  const navigate = useNavigate();

  // État de la date (Par défaut sur Octobre 2025 pour voir nos fausses données direct)
  const [date, setDate] = useState(new Date(2025, 9, 12)); 

  // --- LOGIQUE DES RÉSERVATIONS ---
  
  // Crée un tableau qui contient toutes les dates de réservation converties en objets Date
  const reservationDates = requestData.map(req => parseDateFR(req.date || req.startDate));

  // Fonction qui vérifie si une date précise a une réservation prévue
  const hasReservation = (dateToCheck) => {
    return reservationDates.some(resaDate => 
      resaDate.getDate() === dateToCheck.getDate() &&
      resaDate.getMonth() === dateToCheck.getMonth() &&
      resaDate.getFullYear() === dateToCheck.getFullYear()
    );
  };

  return (
    <>
      {/* 2. STRUCTURE DE LA CARTE */}
      <div 
        className="card border-0 shadow text-white overflow-hidden" 
        style={{ backgroundColor: '#430000', borderRadius: '24px', width: '70%', minWidth: '300px', height: '390px' }}
      >
        <div className="card-body p-3"> 
          
          {/* Header : Icône + Titre */}
          <div className="d-flex align-items-center gap-2 mb-2">
              <CalendarDays size={18} color="#ADABAB" /> 
              <h5 className="mb-0 fw-bold" style={{ color: '#FAFAFA', fontSize: '1.3rem' }}>Calendrier</h5>
          </div>

          {/* 3. COMPOSANT CALENDRIER */}
          <Calendar 
            onChange={setDate} 
            value={date} 
            className="custom-calendar"
            locale="fr-FR"
            defaultActiveStartDate={new Date(2025, 9, 1)} // On force l'affichage sur Octobre 2025 pour le test
            
            // ACTION AU CLIC : On envoie l'utilisateur vers la page Calendrier complète
            // On glisse la date cliquée dans le "state" pour que la page de destination s'ouvre au bon endroit
            onClickDay={(clickedDate) => {
              navigate('/calendrier', { state: { dateFromDashboard: clickedDate } });
            }}

            // INJECTION VISUELLE : Ajoute un petit point blanc sous le numéro si une réservation existe
            tileContent={({ date, view }) => {
              if (view === 'month' && hasReservation(date)) {
                return (
                  <div className="mt-2">
                    <div className="rounded-circle" style={{ width: '4px', height: '4px', backgroundColor: '#FAFAFA' }} />
                  </div>
                );
              }
              return null;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarCard;