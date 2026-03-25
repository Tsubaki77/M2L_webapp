const BASE_URL = 'http://localhost:8000';

export const api = {
  // ---------------------------------------------------------
  // 1. AUTHENTIFICATION & SESSION
  // ---------------------------------------------------------
  
  login: async (identifiant, password) => {
    const response = await fetch(`${BASE_URL}/api/login_check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifiant: identifiant, password: password }),
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

  // Récupère l'identité de celui qui est connecté au navigateur

  getUser: () => {
    const token = sessionStorage.getItem('m2l_token');
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      return {
        identifiant: payload.username,
        roles: payload.roles || []
      };
    } catch (e) {
      console.error("Erreur de décodage du token", e);
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
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      sessionStorage.removeItem('m2l_token'); 
      window.location.href = '/login';
    }

    return response;
  },

  // ---------------------------------------------------------
  // 3. GESTION DES ADMINS 
  // ---------------------------------------------------------
  
  getAdmins: async () => {
    const res = await api.request('/api/admins');
    return res.json();
  },

  createAdmin: async (adminData) => {
    const res = await api.request('/api/admins', {
      method: 'POST',
      body: JSON.stringify(adminData)
    });
    return res.json();
  },

  deleteAdmin: async (id) => {
    return api.request(`/api/admins/${id}`, { method: 'DELETE' });
  },

  // ---------------------------------------------------------
  // 4. GESTION DES SALLES
  // ---------------------------------------------------------

  getSalles: async () => {
    const res = await api.request('/api/salles');
    return res.json();
  },

  getMySalles: async () => {
    const res = await api.request('/api/mes_salles');
    return res.json();
  },
  
  getOneSalle: async (id) => {
    const res = await api.request(`/api/salles/${id}`);
    return res.json();
  },

  createSalle: async (salleData) => {
    const res = await api.request('/api/salles', {
      method: 'POST',
      body: JSON.stringify(salleData)
    });
    return res.json();
  },

  updateSalle: async (id, salleData) => {
    const res = await api.request(`/api/salles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(salleData)
    });
    return res.json();
  },

  // ---------------------------------------------------------
  // 5. RÉSERVATIONS & ADHÉRENTS
  // ---------------------------------------------------------

  getReservations: async () => {
    const res = await api.request('/api/reservations');
    return res.json();
  },

  updateStatutReservation: async (id, statut) => {
    const res = await api.request(`/api/reservations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ statut: statut })
    });
    return res.json();
  },

  getAdherents: async () => {
    const res = await api.request('/api/adherents');
    return res.json();
  },

  // ---------------------------------------------------------
  // 6. TABLES DE RÉFÉRENCE (SPORTS, ÉVÈNEMENTS)
  // ---------------------------------------------------------

  getSports: async () => {
    const res = await api.request('/api/sports');
    return res.json();
  },

  getEvenements: async () => {
    const res = await api.request('/api/evenements');
    return res.json();
  },

  // ---------------------------------------------------------
  // 7. COMMENTAIRES 
  // ---------------------------------------------------------

  getCommentairesBySalle: async (idSalle) => {
    const res = await api.request(`/api/salles/${idSalle}/commentaires`);
    return res.json();
  },

  deleteCommentaire: async (id) => {
    return api.request(`/api/commentaires/${id}`, { method: 'DELETE' });
  }
};