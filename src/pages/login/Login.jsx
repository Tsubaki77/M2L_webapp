import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react'; 

const Login = () => {
  const navigate = useNavigate();
  
  // --- 1. ÉTATS (STATES) ---
  const [identifiant, setIdentifiant] = useState(''); // Stocke ce que l'utilisateur tape (admin)
  const [password, setPassword] = useState('');       // Stocke le mot de passe (admin)
  const [showPassword, setShowPassword] = useState(false); // Switch pour voir/cacher le mot de passe
  const [error, setError] = useState(''); // Stocke le message d'erreur si le login échoue

  // --- 2. LOGIQUE DE CONNEXION ---
  const handleLogin = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page au clic sur le bouton
    
    // Sécurité : on vérifie que les champs ne sont pas vides
    if (!identifiant || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    // --- LOGIQUE MOCKÉE (TEMPORAIRE) ---
    // Tant qu'on n'a pas de Backend, on simule un compte admin
    if (identifiant === 'admin' && password === 'admin') {
      navigate('/'); // Redirige vers le Dashboard
    } else {
      // Si les identifiants sont faux, on déclenche l'affichage du message d'erreur
      setError("L'identifiant ou le mot de passe est incorrect"); 
    }
  };

  return (
    <div className="d-flex vh-100 overflow-hidden bg-light">
      
      {/* --- GAUCHE : LE FORMULAIRE --- */}
      <div className="d-flex flex-column bg-white shadow-lg overflow-y-auto" style={{ width: '100%', maxWidth: '450px', zIndex: 10 }}>
        <div className="p-4 p-sm-5 my-auto">
          
          {/* Logo M2L */}
          <div className="mb-4 text-center">
             <img src="assets/logo/Logo_M2L.svg" alt="Logo M2L" className="img-fluid" />
          </div>
          
          <h4 className="mt-0 fw-bold text-dark fs-3">Log In</h4>
          <p className="text-muted mb-4">Connectez-vous !</p>

          {/* AFFICHAGE CONDITIONNEL DE L'ERREUR */}
          {error && (
            <div className="alert alert-danger py-2 small fw-bold text-center border-0 shadow-sm">
              {error}
            </div>
          )}

          {/* FORMULAIRE */}
          <form onSubmit={handleLogin}>
            
            {/* Champ Identifiant */}
            <div className="form-floating mb-3">
              <input 
                type="text" 
                className="form-control bg-light border-0 shadow-none" 
                id="identifiant" 
                placeholder="Identifiant"
                value={identifiant} 
                onChange={(e) => setIdentifiant(e.target.value)} 
              />
              <label htmlFor="identifiant" className="text-muted">Identifiant</label>
            </div>

            {/* Champ Password avec toggle d'affichage */}
            <div className="form-floating mb-3 position-relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control bg-light border-0 shadow-none pe-5" 
                id="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="text-muted">Mot de passe</label>
              
              {/* Bouton absolu pour switcher entre Eye et EyeOff */}
              <button 
                type="button" 
                className="btn position-absolute top-50 end-0 translate-middle-y text-muted border-0 shadow-none"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 5 }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Mot de passe oublié */}
            <div className="mb-4 text-end">
              <Link to="/forget-password" className="text-muted text-decoration-none">
                <small className="fw-semibold">Mot de passe oublié ?</small>
              </Link>
            </div>

            <div className="mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input border-secondary" id="checkbox-signin" />
                <label className="form-check-label text-secondary small fw-medium" htmlFor="checkbox-signin">
                  Se souvenir de moi
                </label>
              </div>
            </div>

            {/* Bouton de validation (Couleur Rouge M2L) */}
            <div className="d-grid mb-4">
              <button 
                className="btn text-white fw-bold py-2 shadow-sm" 
                type="submit"
                style={{ backgroundColor: '#CC4040' }}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- DROITE : L'IMAGE DE FOND ET LES ARGUMENTS (VISIBLE UNIQUEMENT SUR DESKTOP) --- */}
      <div 
        className="flex-grow-1 d-none d-md-flex align-items-center justify-content-center position-relative p-5"
        style={{ 
          backgroundColor: '#430000', 
          backgroundImage: 'url(assets/estetic/loginimg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay sombre pour que le texte blanc ressorte bien sur l'image */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
        
        {/* Contenu Suplémentaire */}
        <div className="position-relative text-white" style={{ zIndex: 2, maxWidth: '600px' }}>
          <h2 className="mb-4 fw-bold display-5">Espace Gestionnaire</h2>
          <p className="lead fs-4 mb-5 text-light opacity-75">
            Prenez le contrôle des infrastructures de la Maison des Ligues.
          </p>
          
          {/* Liste des fonctionnalités clés avec icônes Check */}
          <ul className="list-unstyled fs-5">
            <li className="mb-4 d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0" style={{ backgroundColor: '#CC4040', width: '40px', height: '40px' }}>
                <Check size={20} />
              </div>
              <span className="fw-medium">Validation rapide des demandes de réservation</span>
            </li>
            
            <li className="mb-4 d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0" style={{ backgroundColor: '#CC4040', width: '40px', height: '40px' }}>
                <Check size={20} />
              </div>
              <span className="fw-medium">Suivi en direct de l'occupation des salles</span>
            </li>
            
            <li className="mb-4 d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0" style={{ backgroundColor: '#CC4040', width: '40px', height: '40px' }}>
                <Check size={20} />
              </div>
              <span className="fw-medium">Administration centralisée des équipements sportifs</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;