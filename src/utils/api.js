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
    // AUTHENTIFICATION DÉSACTIVÉE - LOGOUT DÉSACTIVÉ
    // sessionStorage.removeItem('m2l_token');
    // window.location.href = '/login';
    console.log('Logout désactivé en mode test');
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

  request: async (endpoint, options = {}) => {
    const token = sessionStorage.getItem('m2l_token'); 
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

<<<<<<< Updated upstream
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
=======
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (response.status === 401) {
      // AUTHENTIFICATION DÉSACTIVÉE - REDIRECT 401 DÉSACTIVÉ
      // sessionStorage.removeItem('m2l_token');
      // window.location.href = '/login';
      console.log('Erreur 401 - Authentification désactivée en mode test');
      return;
>>>>>>> Stashed changes
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
  // 3. GESTION DES GESTIONNAIRES (CRUD)
  // ---------------------------------------------------------
  
  // Récupérer la liste (GET)
  getGestionnaires: async () => {
    const res = await api.request('/api/gestionnaires');
    return res.json();
  },

  // Créer (POST)
  createGestionnaires: async (gestionnaireData) => {
    const res = await api.request('/api/gestionnaires', {
      method: 'POST',
      body: JSON.stringify(gestionnaireData)
    });
    return res.json();
  },

  // Supprimer (DELETE)
  deleteGestionnaires: async (id) => {
    return api.request(`/api/gestionnaires/${id}`, { 
        method: 'DELETE' 
    });
  }

}