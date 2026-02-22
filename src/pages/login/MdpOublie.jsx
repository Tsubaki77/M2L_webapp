import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const MdpOublie = () => {
  // 1. ÉTATS (STATES) 
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Bascule l'affichage vers le message de succès
  const [error, setError] = useState('');

  // 2. LOGIQUE D'ENVOI 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation simple
    if (!email) {
      setError("Veuillez saisir votre adresse email.");
      return;
    }

    // LOGIQUE MOCKÉE 
    // C'est ici qu'on branchera l'API plus tard pour envoyer le vrai mail
    setError('');
    setIsSubmitted(true); // On cache le formulaire et on montre le succès
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      
      <div className="card border-0 shadow-lg rounded-4 p-4 p-sm-5" style={{ width: '100%', maxWidth: '450px' }}>
        
        {/* Logo M2L */}
        <div className="text-center mb-4">
          <img src="assets/logo/Logo_M2L.svg" alt="Logo M2L" className="img-fluid" />
        </div>

        {/* 3. RENDU CONDITIONNEL*/}
        {!isSubmitted ? (
          /* ÉTAPE 1 : LE FORMULAIRE DE SAISIE */
          <>
            <h4 className="fw-bold text-dark text-center mb-2">Mot de passe oublié ?</h4>
            <p className="text-muted text-center mb-4 small">
              Entrez l'adresse email associée à votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            {/* Alerte erreur si email vide */}
            {error && (
              <div className="alert alert-danger py-2 small fw-bold text-center border-0 shadow-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-4 position-relative">
                <input 
                    type="email" 
                    className="form-control bg-light border-0 shadow-none pe-5" 
                    id="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // autoCapitalize="none" évite que le clavier mobile mette une majuscule au mail
                    autoCapitalize="none" 
                    />
                <label htmlFor="email" className="text-muted">Adresse Email</label>
                {/* Icône enveloppe positionnée dans l'input */}
                <Mail size={20} className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
              </div>

              <button 
                className="btn text-white fw-bold py-2 w-100 shadow-sm mb-4" 
                type="submit"
                style={{ backgroundColor: '#CC4040' }}
              >
                Envoyer le lien
              </button>
            </form>
          </>
        ) : (
          /* ÉTAPE 2 : LE MESSAGE DE CONFIRMATION (Succès) */
          <div className="text-center py-4">
            <CheckCircle size={60} color="#198754" className="mb-3" />
            <h4 className="fw-bold text-dark mb-2">Email envoyé !</h4>
            <p className="text-muted small mb-4">
              Si le compte <strong>{email}</strong> existe, un email contenant les instructions de réinitialisation vient de vous être envoyé.
            </p>
          </div>
        )}

        {/* 4. NAVIGATION DE RETOUR (Toujours accessible) */}
        <div className="text-center mt-2">
          <Link to="/login" className="text-muted text-decoration-none d-inline-flex align-items-center gap-2 fw-medium">
            <ArrowLeft size={16} /> Retour à la connexion
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MdpOublie;