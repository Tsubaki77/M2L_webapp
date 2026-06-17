import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const MdpOublie = () => {
  const [email, setEmail]             = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // true = on affiche le message de succès
  const [error, setError]             = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Veuillez saisir votre adresse email.');
      return;
    }

    // Pas d'API branchée pour l'instant : on simule juste l'envoi du mail
    setError('');
    setIsSubmitted(true);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">

      <div className="card border-0 shadow-lg rounded-4 p-4 p-sm-5" style={{ width: '100%', maxWidth: '450px' }}>

        <div className="text-center mb-4">
          <img src="assets/logo/Logo_M2L.svg" alt="Logo M2L" className="img-fluid" />
        </div>

        {!isSubmitted ? (
          /* Étape 1 : on demande l'email */
          <>
            <h4 className="fw-bold text-dark text-center mb-2">Mot de passe oublié ?</h4>
            <p className="text-muted text-center mb-4 small">
              Entrez l'adresse email associée à votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

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
                  autoCapitalize="none"
                />
                <label htmlFor="email" className="text-muted">Adresse Email</label>
                <Mail size={20} className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
              </div>

              <button type="submit" className="btn bg-m2l-red text-white fw-bold py-2 w-100 shadow-sm mb-4">
                Envoyer le lien
              </button>
            </form>
          </>
        ) : (
          /* Étape 2 : confirmation après l'envoi */
          <div className="text-center py-4">
            <CheckCircle size={60} color="#198754" className="mb-3" />
            <h4 className="fw-bold text-dark mb-2">Email envoyé !</h4>
            <p className="text-muted small mb-4">
              Si le compte <strong>{email}</strong> existe, un email contenant les instructions de réinitialisation vient de vous être envoyé.
            </p>
          </div>
        )}

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
