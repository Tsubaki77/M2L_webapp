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

  // Décode le JWT et retourne { identifiant, roles }
  getUser: () => {
    const token = sessionStorage.getItem('m2l_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(window.atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return { identifiant: payload.username, roles: payload.roles || [] };
    } catch {
      return null;
    }
  },

  isSuperAdmin: () => {
    const user = api.getUser();
    return user?.roles?.includes('ROLE_SUPER_ADMIN') ?? false;
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

    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

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
  // 3. PROFIL CONNECTÉ
  // ---------------------------------------------------------

  getMe: async () => {
    const res = await api.request('/api/me');
    return res.json();
  },

  // ---------------------------------------------------------
  // 4. GESTION DES GESTIONNAIRES
  // ---------------------------------------------------------

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

  deleteGestionnaire: async (id) => {
    await api.request(`/api/gestionnaires/${id}`, { method: 'DELETE' });
  },

  // ---------------------------------------------------------
  // 5. GESTION DES TYPES DE SALLES
  // ---------------------------------------------------------

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

  // ---------------------------------------------------------
  // 6. GESTION DES SALLES
  // ---------------------------------------------------------

  getSalles: async (categorie = null) => {
    const url = categorie ? `/api/salles?categorie=${categorie}` : '/api/salles';
    const res = await api.request(url);
    return res.json();
  },

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

  // ---------------------------------------------------------
  // 7. GESTION DES HORAIRES
  // ---------------------------------------------------------

  updateHoraireStatut: async (id, statut) => {
    const res = await api.request(`/api/horaires/${id}/statut`, {
      method: 'PATCH',
      body: JSON.stringify({ statut }),
    });
    return res.json();
  },

  // ---------------------------------------------------------
  // 8. GESTION DES RÉSERVATIONS
  // ---------------------------------------------------------

  // params: { date: 'YYYY-MM-DD' } (optionnel)
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
