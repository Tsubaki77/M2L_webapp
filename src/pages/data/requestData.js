// src/data/requestData.js
import { sallesData } from './salleData';

const getRoomName = (id) => {
    const salle = sallesData.find(s => s.id === id);
    return salle ? salle.nom : 'Salle Inconnue';
};

export const requestData = [
    // 1. UNE SEULE JOURNÉE À UN HORAIRE PRÉCIS
    { 
        id: 101, 
        roomId: 1, 
        roomName: getRoomName(1), // Salle Stanislas
        league: 'Ligue de Football', 
        user: 'Jean Dupont', 
        role: 'Coach U15',
        date: '12/10/2025',
        startTime: '14:00',
        endTime: '16:00',
        objet: "Entraînement U15", 
        description: "Préparation match de coupe",
        status: 'pending'
    },

    // 2. UNE JOURNÉE ENTIÈRE
    { 
        id: 102, 
        roomId: 4, 
        roomName: getRoomName(4), // Amphithéâtre
        league: 'Ligue de Basket', 
        user: 'Tony Parker', 
        role: 'Intervenant',
        date: '20/10/2025',
        objet: "Conférence sur le basket",
        description: "Intervention sur les techniques de jeu et la préparation mentale",
        status: 'pending'
    },

    // 3. DEUX JOURS CONSÉCUTIFS SUR UN HORAIRE PRÉCIS
    { 
        id: 103, 
        roomId: 2, 
        roomName: getRoomName(2), // Dojo Régional
        league: 'Ligue de Judo', 
        user: 'Marie Curry', 
        startDate: '14/10/2025',
        endDate: '15/10/2025',
        startTime: '09:00', 
        endTime: '17:00',
        objet: "Stage de judo",
        description: "Préparation intensive pour la compétition régionale",
        status: 'pending'
    },

    // 4. UN MOIS COMPLET (JOURNÉE ENTIÈRE)
    { 
        id: 104, 
        roomId: 5, 
        roomName: getRoomName(5), // Salle Majorelle
        league: 'M2L Administration', 
        user: 'Admin Système', 
        startDate: '01/11/2025',
        endDate: '30/11/2025',
        objet: "Maintenance et mises à jour",
        description: "Accès réservé pour les équipes techniques pendant les travaux de maintenance",
        status: 'pending'
    },

    // 5. UN MOIS COMPLET MAIS SUR UN HORAIRE PRÉCIS
    { 
        id: 105, 
        roomId: 6, 
        roomName: getRoomName(6), // Complexe Omnisports
        league: 'Ligue d\'Escrime', 
        user: 'Laura Flessel', 
        startDate: '01/12/2025',
        endDate: '31/12/2025',
        startTime: '18:00', 
        endTime: '20:00',
        objet: "Entraînement du soir",
        description: "Séances d'entraînement pour les compétiteurs de haut niveau",
        status: 'pending'
    },

    // --- AJOUTS POUR TESTER LE SCROLL ---

    // 6. Réunion rapide
    { 
        id: 106, 
        roomId: 3, 
        roomName: getRoomName(3), // Bureau Foot
        league: 'Ligue de Football', 
        user: 'Zinedine Z.', 
        type: 'creneau',
        date: '15/10/2025',
        startTime: '10:00',
        endTime: '11:00',
        objet: "Réunion de coordination pour les équipes de jeunes",
        description: "Réunion pour discuter des stratégies et planifications des équipes de jeunes",
        status: 'pending'
    },

    // 7. Compétition Dojo (Journée entière)
    { 
        id: 107, 
        roomId: 2, 
        roomName: getRoomName(2), 
        league: 'Ligue Karaté', 
        user: 'Sensei Tanaka', 
        type: 'fullday',
        date: '25/10/2025',
        status: 'pending'
    },

    // 8. Formation sur 3 jours
    { 
        id: 108, 
        roomId: 1, 
        roomName: getRoomName(1), 
        league: 'CROS Lorraine', 
        user: 'Pierre Richard', 
        type: 'multiday',
        startDate: '05/11/2025',
        endDate: '07/11/2025',
        startTime: '08:30',
        endTime: '17:30',
        status: 'pending'
    },

    // 9. Soirée AG
    { 
        id: 109, 
        roomId: 4, 
        roomName: getRoomName(4), 
        league: 'Ligue Tennis', 
        user: 'Yannick Noah', 
        type: 'creneau',
        date: '12/11/2025',
        startTime: '19:00',
        endTime: '23:00',
        status: 'pending'
    },

    // 10. Tournoi Hand (Week-end entier)
    { 
        id: 110, 
        roomId: 6, 
        roomName: getRoomName(6), 
        league: 'Ligue Handball', 
        user: 'Nikola K.', 
        type: 'multiday',
        startDate: '22/11/2025',
        endDate: '23/11/2025',
        status: 'pending'
    },

    // 11. Entretien
    { 
        id: 111, 
        roomId: 3, 
        roomName: getRoomName(3), 
        league: 'Ligue Natation', 
        user: 'Laure M.', 
        type: 'creneau',
        date: '02/12/2025',
        startTime: '14:00',
        endTime: '15:00',
        status: 'pending'
    },

    // 12. Séminaire de fin d'année
    { 
        id: 112, 
        roomId: 1, 
        roomName: getRoomName(1), 
        league: 'M2L Direction', 
        user: 'Le Directeur', 
        type: 'fullday',
        date: '18/12/2025',
        status: 'pending'
    }
];