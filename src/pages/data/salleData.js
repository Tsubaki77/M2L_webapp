// src/data/salleData.js

export const sallesData = [
  {
    id: 1,
    nom: 'Salle Stanislas',
    adresse: '12 Rue de la République, 54000 Nancy',
    ville: 'Nancy (Siège)',
    capacite: 50,
    superficie: '120m²',
    note: 4.8, // Note globale affichée si pas de calcul
    type: 'reunion',
    cat: 'Conseil / VIP',
    status: 'free',
    description: "Salle de prestige située au siège de la M2L. Idéale pour les conseils d'administration et les réceptions VIP. Mobilier en chêne massif et équipements de visio-conférence intégrés.",
    equipements: ['Wifi Fibre', 'Écran Tactile 85"', 'Sonorisation Bose', 'Machine à café Grain', 'Machine à café Grain', 'Machine à café Grain'],
    images: [
       'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
       'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
       'https://images.unsplash.com/photo-1517502884422-41e157d44305?auto=format&fit=crop&w=1000&q=80',
       'https://images.unsplash.com/photo-1505409859467-3a796fd5798e?auto=format&fit=crop&w=1000&q=80' 
    ],
    // 12 Commentaires pour tester la pagination (2 pages de 6)
    commentaires: [
        { id: 1, user: 'Jean Dupont', date: '10/10/2025', note: 5, content: "Salle exceptionnelle, équipement au top pour notre CA." },
        { id: 2, user: 'Marie Curry', date: '12/09/2025', note: 4, content: "Très bien, mais il faisait un peu chaud en début d'après-midi." },
        { id: 3, user: 'Paul Personne', date: '05/09/2025', note: 5, content: "Parfait, rien à redire. Le café est excellent." },
        { id: 4, user: 'Lucas Scott', date: '01/09/2025', note: 3, content: "Problème de connexion au début, résolu par le technicien." },
        { id: 5, user: 'Sarah Connor', date: '20/08/2025', note: 5, content: "Service impeccable, la salle était prête à l'heure." },
        { id: 6, user: 'Tony Stark', date: '15/08/2025', note: 5, content: "Technologie de pointe, j'apprécie l'écran tactile." },
        { id: 7, user: 'Bruce Wayne', date: '10/08/2025', note: 5, content: "Cadre très sombre et classe, convient parfaitement." },
        { id: 8, user: 'Clark Kent', date: '01/08/2025', note: 2, content: "Les chaises ne sont pas adaptées aux personnes de grande taille." },
        { id: 9, user: 'Diana Prince', date: '25/07/2025', note: 5, content: "Magnifique salle, très lumineuse." },
        { id: 10, user: 'Barry Allen', date: '20/07/2025', note: 4, content: "Réservation rapide, tout s'est bien passé." },
        { id: 11, user: 'Hal Jordan', date: '15/07/2025', note: 3, content: "Manque un peu de lumière naturelle le soir." },
        { id: 12, user: 'Arthur Curry', date: '10/07/2025', note: 5, content: "Très bien insonorisée." }
    ]
  },
  {
    id: 2,
    nom: 'Dojo Régional',
    adresse: 'Av. des Sports, 54700 Pont-à-Mousson',
    ville: 'Pont-à-Mousson',
    capacite: 200,
    superficie: '450m²',
    note: 4.5,
    type: 'sport',
    cat: 'Arts Martiaux',
    status: 'busy',
    description: "Surface de combat officielle pour le Judo, Karaté et Aïkido. Vestiaires séparés hommes/femmes avec douches. Gradins pour 150 spectateurs.",
    equipements: ['Tatamis Olympiques', 'Vestiaires', 'Douches', 'Table de marque électronique'],
    images: [
       'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&w=1000&q=80',
       'https://images.unsplash.com/photo-1574680096141-1cddd32e24f7?auto=format&fit=crop&w=1000&q=80'
    ],
    commentaires: [
        { id: 1, user: 'Teddy Riner', date: '12/11/2025', note: 5, content: "Tatamis de qualité olympique, parfait pour les stages." },
        { id: 2, user: 'David Douillet', date: '05/10/2025', note: 4, content: "Vestiaires propres mais un peu petits pour les groupes." },
        { id: 3, user: 'Clarisse A.', date: '01/10/2025', note: 5, content: "Super dojo, très lumineux." }
    ]
  },
  {
    id: 3,
    nom: 'Bureau Ligue Football',
    adresse: 'Z.I. Champigneulles, 54250 Champigneulles',
    ville: 'Champigneulles',
    capacite: 6,
    superficie: '25m²',
    note: 3,
    type: 'bureau',
    cat: 'Bureau',
    status: 'free',
    description: "Petit bureau fonctionnel pour les permanences de la ligue de football ou les entretiens individuels.",
    equipements: ['Bureau 2 postes', 'Imprimante Réseau', 'Wifi'],
    images: [
       'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80'
    ],
    commentaires: [
        { id: 1, user: 'Zinedine Z.', date: '12/06/2025', note: 3, content: "Correct pour un entretien rapide." }
    ]
  },
  {
    id: 4,
    nom: 'Amphithéâtre Technopôle',
    adresse: 'Rue Marconi, 57070 Metz',
    ville: 'Metz',
    capacite: 120,
    superficie: '200m²',
    note: 4.2,
    type: 'conf',
    cat: 'Conférence',
    status: 'free',
    description: "Grand amphithéâtre moderne pour les conférences régionales et les formations théoriques. Acoustique traitée.",
    equipements: ['Pupitre orateur', 'Micro HF', 'Double Vidéoprojection', 'Régie Lumière'],
    images: [
       'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1000&q=80',
       'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1000&q=80',
       'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1000&q=80',
       'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80'
    ],
    commentaires: [
        { id: 1, user: 'Steve Jobs', date: '10/01/2026', note: 5, content: "Le système de projection est incroyable." },
        { id: 2, user: 'Bill Gates', date: '05/01/2026', note: 4, content: "Les sièges sont confortables." },
        { id: 3, user: 'Elon Musk', date: '01/01/2026', note: 3, content: "Pas assez de prises électriques pour l'audience." },
        { id: 4, user: 'Jeff Bezos', date: '20/12/2025', note: 5, content: "Très grande capacité, logistique facile." },
        { id: 5, user: 'Mark Z.', date: '15/12/2025', note: 4, content: "Bonne acoustique." },
        { id: 6, user: 'Larry Page', date: '10/12/2025', note: 5, content: "Parfait pour nos conférences tech." },
        { id: 7, user: 'Sergey Brin', date: '05/12/2025', note: 4, content: "Bien situé." }
    ]
  },
  {
      id: 5,
      nom: 'Salle Majorelle',
      adresse: '12 Rue de la République, 54000 Nancy',
      ville: 'Nancy (Siège)',
      capacite: 12,
      superficie: '35m²',
      note: 4,
      type: 'reunion',
      cat: 'Réunion / Formation',
      status: 'busy',
      description: "Salle de réunion standard, lumineuse et calme. Parfaite pour les commissions de travail.",
      equipements: ['Tableau Blanc', 'Wifi', 'Télévision HDMI'],
      images: [
         'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1000&q=80',
         'https://images.unsplash.com/photo-1495521939206-a217db9df264?auto=format&fit=crop&w=1000&q=80'
      ],
      commentaires: []
  },
  {
      id: 6,
      nom: 'Complexe Omnisports',
      adresse: 'Rue du Stade, 57100 Thionville',
      ville: 'Thionville',
      capacite: 50,
      superficie: '800m²',
      note: 4,
      type: 'sport',
      cat: 'Multisport',
      status: 'free',
      description: "Gymnase polyvalent (Basket, Hand, Volley). Sol parquet rénové en 2024.",
      equipements: ['Paniers réglables', 'Vestiaires collectifs', 'Eclairage LED'],
      images: [
         'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
         'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80'
      ],
      commentaires: []
  }
];