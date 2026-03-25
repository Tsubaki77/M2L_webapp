const BASE_URL = 'http://localhost:8000';

export const api = {

  // ---------------------------------------------------------
  // 1. AUTHENTIFICATION & SESSION
  // ---------------------------------------------------------

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

  logout: () => {
    sessionStorage.removeItem('m2l_token');
    window.location.href = '/login';
  },

  // Décode le token JWT et retourne l'utilisateur connecté
  getUser: () => {
    const token = sessionStorage.getItem('m2l_token');
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64    = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload   = JSON.parse(window.atob(base64));

      return {
        identifiant: payload.username,
        roles: payload.roles || [],
      };
    } catch (e) {
      console.error('Erreur de décodage du token', e);
      return null;
    }
  },

  // ---------------------------------------------------------
  // 2. MÉTHODE DE BASE
  // ---------------------------------------------------------

  // Toutes les requêtes authentifiées passent par ici
  request: async (endpoint, options = {}) => {
    const token = sessionStorage.getItem('m2l_token');

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Token expiré ou invalide → déconnexion automatique
    if (response.status === 401) {
      sessionStorage.removeItem('m2l_token');
      window.location.href = '/login';
      return;
    }

    // Pour toute autre erreur HTTP on lève une exception avec le message Symfony
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

  // ---------------------------------------------------------
  // 3. GESTION DES GESTIONNAIRES
  // ---------------------------------------------------------

  // Récupérer la liste complète
  getGestionnaires: async () => {
    const res = await api.request('/api/gestionnaires');
    return res.json();
  },

  // Créer un gestionnaire
  createGestionnaire: async (gestionnaireData) => {
    const res = await api.request('/api/gestionnaires', {
      method: 'POST',
      body: JSON.stringify(gestionnaireData),
    });
    return res.json();
  },

  // Supprimer un gestionnaire par son ID
  deleteGestionnaire: async (id) => {
    await api.request(`/api/gestionnaires/${id}`, { method: 'DELETE' });
  },

};
