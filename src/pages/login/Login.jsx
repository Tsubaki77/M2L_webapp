import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { api } from '../../utils/api';

const Login = () => {
  const navigate = useNavigate();

  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState('');
  const [isLoading, setIsLoading]     = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifiant || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      await api.login(identifiant, password);

      const user = api.getUser();

      if (!user || !user.roles.includes('ROLE_GESTIONNAIRE')) {
        sessionStorage.removeItem('m2l_token');
        setError("Accès refusé : vous n'êtes pas gestionnaire.");
        return;
      }

      navigate('/');

    } catch (err) {
      setError("L'identifiant ou le mot de passe est incorrect");
      console.error('Erreur de connexion:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">

      {/* ── GAUCHE : FORMULAIRE ── */}
      <div className="login-form-panel">
        <div className="login-form-inner">

          <div className="login-logo">
            <img src="assets/logo/Logo_M2L.svg" alt="Logo M2L" />
          </div>

          <h1 className="login-title">Log In</h1>
          <p className="login-subtitle">Connectez-vous !</p>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control login-input"
                id="identifiant"
                placeholder="Identifiant"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                disabled={isLoading}
              />
              <label htmlFor="identifiant" className="text-muted">Identifiant</label>
            </div>

            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control login-input pe-5"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <label htmlFor="password" className="text-muted">Mot de passe</label>
              <button
                type="button"
                className="login-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mb-4 text-end">
              <Link to="/forget-password" className="login-forgot-link">
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="login-spinner" />
                  Connexion...
                </>
              ) : (
                'Log In'
              )}
            </button>

          </form>
        </div>
      </div>

      {/* ── DROITE : VISUEL ── */}
      <div className="login-visual-panel">
        <div className="login-visual-overlay" />
        <div className="login-visual-content">
          <h2 className="login-visual-title">Espace Gestionnaire</h2>
          <p className="login-visual-subtitle">
            Prenez le contrôle des infrastructures de la Maison des Ligues.
          </p>
          <ul className="login-features-list">
            {[
              'Validation rapide des demandes de réservation',
              "Suivi en direct de l'occupation des salles",
              'Administration centralisée des équipements sportifs'
            ].map((feature) => (
              <li key={feature} className="login-feature-item">
                <span className="login-feature-icon">
                  <Check size={20} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Login;
