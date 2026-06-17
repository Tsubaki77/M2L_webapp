// On récupère l'adresse du serveur depuis l'URL du navigateur.
// Comme ça, peu importe l'IP du réseau, ça fonctionne toujours
// tant que le PC et l'appareil sont sur le même réseau Wi-Fi.
export const BASE_URL = `http://${window.location.hostname}:8000`;

export const api = {

  // ==========================================================
  // CONNEXION / DÉCONNEXION
  // ==========================================================

  // Envoie l'identifiant et le mot de passe à l'API,
  // puis stocke le token reçu dans le sessionStorage.
  login: async (identifiant, password) => {
    const response = await fetch(`${BASE_URL}/api/login_check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifiant, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Identifiants invalides');
    }

    const data = await response.json();
    if (data.token) {
      sessionStorage.setItem('m2l_token', data.token);
    }
    return data;
  },

  // Supprime le token et redirige vers la page de connexion.
  logout: () => {
    sessionStorage.removeItem('m2l_token');
    window.location.href = '/login';
  },

  // Lit le token JWT stocké et retourne les infos de l'utilisateur connecté.
  // Le token est en 3 parties séparées par des points ; la 2e partie contient les données.
  getUser: () => {
    const token = sessionStorage.getItem('m2l_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(
        window.atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
      );
      return { identifiant: payload.username, roles: payload.roles || [] };
    } catch {
      return null;
    }
  },

  // Vérifie si l'utilisateur connecté est super-administrateur.
  isSuperAdmin: () => {
    const user = api.getUser();
    return user?.roles?.includes('ROLE_SUPER_ADMIN') ?? false;
  },

  // ==========================================================
  // REQUÊTE DE BASE (utilisée par toutes les autres méthodes)
  // ==========================================================

  // Centralise les appels à l'API : ajoute le token automatiquement
  // et redirige vers /login si la session a expiré (code 401).
  request: async (endpoint, options = {}) => {
    const token = sessionStorage.getItem('m2l_token');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    // Session expirée : on déconnecte et on redirige
    if (response.status === 401) {
      sessionStorage.removeItem('m2l_token');
      window.location.href = '/login';
      return;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message
        || (errorData.erreurs && errorData.erreurs.join(', '))
        || `Erreur ${response.status}`
      );
    }

    return response;
  },

  // ==========================================================
  // PROFIL DE L'UTILISATEUR CONNECTÉ
  // ==========================================================

  getMe: async () => {
    const res = await api.request('/api/me');
    return res.json();
  },

  // ==========================================================
  // GESTION DES GESTIONNAIRES
  // ==========================================================

  getGestionnaires: async () => {
    const res = await api.request('/api/gestionnaires');
    return res.json();
  },

  createGestionnaire: async (data) => {
    const res = await api.request('/api/gestionnaires', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateGestionnaire: async (id, data) => {
    const res = await api.request(`/api/gestionnaires/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Active ou désactive le compte d'un gestionnaire (statut: 'actif' | 'inactif')
  updateGestionnaireStatut: async (id, statut) => {
    const res = await api.request(`/api/gestionnaires/${id}/statut`, {
      method: 'PATCH',
      body: JSON.stringify({ statut }),
    });
    return res.json();
  },

  deleteGestionnaire: async (id) => {
    await api.request(`/api/gestionnaires/${id}`, { method: 'DELETE' });
  },

  // ==========================================================
  // GESTION DES TYPES DE SALLES
  // ==========================================================

  getTypesSalles: async () => {
    const res = await api.request('/api/types-salles');
    return res.json();
  },

  createTypeSalle: async (data) => {
    const res = await api.request('/api/types-salles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // ==========================================================
  // GESTION DES SALLES
  // ==========================================================

  // Récupère toutes les salles (admin) ou filtrées par catégorie
  getSalles: async (categorie = null) => {
    const url = categorie ? `/api/salles?categorie=${categorie}` : '/api/salles';
    const res = await api.request(url);
    return res.json();
  },

  // Récupère uniquement les salles du gestionnaire connecté
  getMesSalles: async () => {
    const res = await api.request('/api/mes-salles');
    return res.json();
  },

  getSalle: async (id) => {
    const res = await api.request(`/api/salles/${id}`);
    return res.json();
  },

  createSalle: async (data) => {
    const res = await api.request('/api/salles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateSalle: async (id, data) => {
    const res = await api.request(`/api/salles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteSalle: async (id) => {
    await api.request(`/api/salles/${id}`, { method: 'DELETE' });
  },

  // Upload d'une photo — on n'utilise pas JSON ici mais FormData
  // car on envoie un fichier binaire
  uploadPhoto: async (file) => {
    const token = sessionStorage.getItem('m2l_token');
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Erreur lors de l'upload");
    }
    const data = await response.json();
    return data.url;
  },

  // ==========================================================
  // GESTION DES HORAIRES
  // ==========================================================

  // Change le statut d'un horaire (ouvert / fermé) pour un jour donné
  updateHoraireStatut: async (id, statut) => {
    const res = await api.request(`/api/horaires/${id}/statut`, {
      method: 'PATCH',
      body: JSON.stringify({ statut }),
    });
    return res.json();
  },

  // ==========================================================
  // GESTION DES RÉSERVATIONS
  // ==========================================================

  // Récupère toutes les réservations (on peut filtrer par date)
  getReservations: async (params = {}) => {
    const query = params.date ? `?date=${params.date}` : '';
    const res = await api.request(`/api/reservations${query}`);
    return res.json();
  },

  createReservation: async (data) => {
    const res = await api.request('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Valide ou refuse une réservation (VALIDEE / REFUSEE)
  updateReservationStatut: async (id, statut) => {
    const res = await api.request(`/api/reservations/${id}/statut`, {
      method: 'PATCH',
      body: JSON.stringify({ statut }),
    });
    return res.json();
  },

  deleteReservation: async (id) => {
    await api.request(`/api/reservations/${id}`, { method: 'DELETE' });
  },
};
