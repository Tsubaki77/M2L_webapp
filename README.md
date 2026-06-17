# M2L - Application Web de Gestion des Salles

## 📖 Description du projet

La **Maison des Ligues de Lorraine (M2L)** est une structure régionale financée par le Conseil Régional. Sa mission de service public consiste à mettre à disposition des ligues sportives (football, tennis, judo, etc.) des infrastructures variées : locaux administratifs, salles de réunion, amphithéâtres et complexes sportifs.

Actuellement, la gestion de ces espaces repose sur des processus manuels vieillissants : les demandes de réservation affluent par téléphone ou par courriel, saturant le secrétariat et augmentant le risque d'erreurs (doubles réservations, oublis, etc.).

La M2L a donc engagé sa transformation numérique afin de moderniser son image et de fluidifier ses échanges avec les ligues.

Cette application web fait partie de cette transformation : elle est destinée aux **gestionnaires** de la M2L (et non aux adhérents, qui disposent de leur propre application mobile) et leur permet de piloter au quotidien les salles dont ils ont la charge : suivi des demandes de réservation, gestion du calendrier d'occupation, gestion des salles et, pour les super-administrateurs, gestion des comptes gestionnaires.

## 🚀 Initialisation du projet

### Prérequis
- [Node.js](https://nodejs.org/)
- L'API M2L (Symfony) démarrée et accessible sur le réseau

### Installation des dépendances

```bash
npm install
```

### Lancer le serveur de développement

```bash
npm run dev
```

L'application est alors disponible sur `http://localhost:5173` (et accessible depuis le réseau local grâce à `server.host: true` dans `vite.config.js`, par exemple pour la tester depuis un téléphone connecté au même Wi-Fi).


> ℹ️ L'URL de l'API est déduite automatiquement de l'hôte utilisé pour ouvrir l'application (`src/utils/api.js`). Aucune configuration d'IP manuelle n'est nécessaire : il suffit que le PC hébergeant l'API Symfony (port `8000`) et l'appareil utilisé soient sur le même réseau.

## ✅ Fonctionnalités mises en place

- **Authentification** des gestionnaires (connexion / déconnexion, session via JWT, mot de passe oublié)
- **Tableau de bord** avec vue d'ensemble : nombre de demandes en attente, mini-calendrier d'occupation, liste des salles
- **Gestion des demandes de réservation** :
  - Liste des demandes filtrable par statut (en attente / validée / refusée)
  - Validation ou refus d'une demande
  - Détail d'une demande de réservation
- **Calendrier d'occupation** des salles (vues mois / semaine / jour / liste), avec code couleur par statut, hors demandes refusées
- **Gestion des salles** :
  - Liste des salles gérées
  - Création, modification et suppression d'une salle
  - Upload de photo pour une salle
  - Gestion des types de salles
- **Gestion des gestionnaires** (réservée aux super-administrateurs) : création, modification, suppression de comptes gestionnaires
- **Gestion des horaires** d'ouverture/disponibilité par salle

## 🔭 Pistes d'évolution possibles

- **Authentification multi-facteurs (MFA)** pour renforcer la sécurité des comptes gestionnaires
- **Messagerie interne** entre un gestionnaire et un adhérent, limitée au contexte d'une réservation en cours (pour échanger des informations complémentaires sur une demande)
- **Vrais commentaires/avis sur les salles** : les avis affichés sont actuellement des données mockées (`SalleAvis.jsx`) et non de réels retours d'adhérents ; il faudrait brancher cette fonctionnalité sur une vraie entité côté API
- **Modération des commentaires** une fois ceux-ci réels (signalement, validation/masquage par un gestionnaire ou un administrateur)
- **Notifications** (email ou in-app) lors d'une nouvelle demande de réservation, lors 'un changement de statut de réservation, pour informer l'adhérent sans qu'il ait à revenir consulter l'application.
- **Statistiques d'usage des salles** (taux d'occupation, salles les plus demandées) pour aider la M2L à piloter ses infrastructures

---

Pour plus d'informations sur le contexte et les spécifications fonctionnelles, se référer au cahier des charges du projet.
