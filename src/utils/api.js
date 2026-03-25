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

  // ---------------------------------------------------------
  // 3. GESTION DES GESTIONNAIRES
  // ---------------------------------------------------------

  getGestionnaires: async () => {
    const res = await api.request('/api/gestionnaires');
    return res.json();
  },

  createGestionnaire: async (gestionnaireData) => {
    const res = await api.request('/api/gestionnaires', {
      method: 'POST',
      body: JSON.stringify(gestionnaireData),
    });
    return res.json();
  },

  deleteGestionnaire: async (id) => {
    await api.request(`/api/gestionnaires/${id}`, { method: 'DELETE' });
  },

  // ---------------------------------------------------------
  // 4. GESTION DES TYPES DE SALLES
  // ---------------------------------------------------------

  // Retourne { sport: [...], evenement: [...] }
  getTypesSalles: async () => {
    const res = await api.request('/api/types-salles');
    return res.json();
  },

  // Crée un type s'il n'existe pas déjà, sinon retourne l'existant
  createTypeSalle: async (typeSalleData) => {
    const res = await api.request('/api/types-salles', {
      method: 'POST',
      body: JSON.stringify(typeSalleData),
    });
    return res.json();
  },

  // ---------------------------------------------------------
  // 5. GESTION DES SALLES
  // ---------------------------------------------------------

  // Liste toutes les salles
  getSalles: async () => {
    const res = await api.request('/api/salles');
    return res.json();
  },

  // Salles du gestionnaire connecté uniquement
  getMesSalles: async () => {
    const res = await api.request('/api/mes-salles');
    return res.json();
  },

  // Fiche détaillée d'une salle
  getSalle: async (id) => {
    const res = await api.request(`/api/salles/${id}`);
    return res.json();
  },

  // Créer une salle avec ses horaires
  // { nom, adresse, capacite, typeSalleId, description?, horaires:}
  createSalle: async (salleData) => {
    const res = await api.request('/api/salles', {
      method: 'POST',
      body: JSON.stringify(salleData),
    });
    return res.json();
  },

  // Modifier une salle (et optionnellement ses horaires)
  updateSalle: async (id, salleData) => {
    const res = await api.request(`/api/salles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(salleData),
    });
    return res.json();
  },

  // Supprimer une salle — ROLE_SUPER_ADMIN uniquement
  deleteSalle: async (id) => {
    await api.request(`/api/salles/${id}`, { method: 'DELETE' });
  },

};