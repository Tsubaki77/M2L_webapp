import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Key, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


// ==============================
// Données fictives (simulation API)
// ==============================
const gestionnairesData = [
  {
    id: '1',
    email: 'jean.dupont@example.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    phone: '0612345678',
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'marie.martin@example.com',
    firstName: 'Marie',
    lastName: 'Martin',
    phone: '0698765432',
    status: 'active',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    email: 'pierre.durand@example.com',
    firstName: 'Pierre',
    lastName: 'Durand',
    phone: '0712345678',
    status: 'inactive',
    createdAt: new Date('2024-03-10'),
  },
];

const Gestioncomptes = () => {

  // ==============================
  // Hooks React Router
  // ==============================
  const navigate = useNavigate();
  const location = useLocation();

  // ==============================
  // States (gestion des données)
  // ==============================
  const [gestionnaires, setGestionnaires] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingGestionnaire, setEditingGestionnaire] = useState(null);

  // State du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  // ==============================
  // Chargement des données (simulation API)
  // ==============================
  useEffect(() => {
    setGestionnaires(gestionnairesData);
  }, []);

  // ==============================
  // Statistiques
  // ==============================
  const gestionnairesActifs = gestionnaires.filter(g => g.status === 'active').length;
  const totalGestionnaires = gestionnaires.length;

  // ==============================
  // Ouvrir le modal (ajout ou modification)
  // ==============================
  const openModal = (gestionnaire = null) => {
    if (gestionnaire) {
      // Mode modification
      setEditingGestionnaire(gestionnaire);
      setFormData({
        firstName: gestionnaire.firstName,
        lastName: gestionnaire.lastName,
        email: gestionnaire.email,
        phone: gestionnaire.phone || '',
        password: '',
      });
    } else {
      // Mode création
      setEditingGestionnaire(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
      });
    }
    setShowModal(true);
  };

  // ==============================
  // Fermer le modal
  // ==============================
  const closeModal = () => {
    setShowModal(false);
    setEditingGestionnaire(null);
  };

  // ==============================
  // Ajouter ou modifier un gestionnaire
  // ==============================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingGestionnaire) {
      // Modification d’un gestionnaire existant
      const updated = gestionnaires.map(g =>
        g.id === editingGestionnaire.id
          ? { ...g, ...formData }
          : g
      );

      setGestionnaires(updated);
      Swal.fire('Succès', 'Gestionnaire modifié avec succès', 'success');

    } else {
      // Création d’un nouveau gestionnaire
      const newGestionnaire = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
        createdAt: new Date(),
      };

      setGestionnaires([...gestionnaires, newGestionnaire]);
      Swal.fire('Succès', 'Gestionnaire créé avec succès', 'success');
    }

    closeModal();
  };

  // ==============================
  // Supprimer un gestionnaire
  // ==============================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      setGestionnaires(gestionnaires.filter(g => g.id !== id));
      Swal.fire('Supprimé', 'Gestionnaire supprimé', 'success');
    }
  };

  // ==============================
  // Activer / désactiver un gestionnaire
  // ==============================
  const handleToggleStatus = (id) => {
    setGestionnaires(gestionnaires.map(g =>
      g.id === id
        ? { ...g, status: g.status === 'active' ? 'inactive' : 'active' }
        : g
    ));
  };

  

  // ==============================
  // Rendu JSX
  // ==============================
  return (
    <>
      {/* Carte résumé */}
      <div
        className="card shadow text-white"
        style={{ backgroundColor: '#2C7DA0', borderRadius: '16px', height: '200px', cursor: 'pointer' }}
        onClick={() => navigate('/gestion-comptes')}
      >
        <div className="card-body d-flex flex-column justify-content-between">
          <Users size={30} />
          <div>
            <h3>{gestionnairesActifs}</h3>
            <p>Gestionnaires actifs</p>
            <small>Total: {totalGestionnaires}</small>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5>{editingGestionnaire ? 'Modifier' : 'Ajouter'}</h5>
                  <button onClick={closeModal} type="button">X</button>
                </div>

                <div className="modal-body">
                  <input placeholder="Prénom" required value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />

                  <input placeholder="Nom" required value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />

                  <input type="email" placeholder="Email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                  <input placeholder="Téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

                  {!editingGestionnaire && (
                    <input type="password" placeholder="Mot de passe" required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  )}
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={closeModal}>Annuler</button>
                  <button type="submit">{editingGestionnaire ? 'Modifier' : 'Créer'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Page de gestion */}
      {location.pathname === '/gestion-comptes' && (
        <div className="container mt-4">

          <button className="btn btn-primary mb-3" onClick={() => openModal()}>
            <Plus size={16} /> Ajouter
          </button>

          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {gestionnaires.map(g => (
                <tr key={g.id}>
                  <td>{g.firstName} {g.lastName}</td>
                  <td>{g.email}</td>
                  <td>{g.status}</td>
                  <td>
                    <Edit onClick={() => openModal(g)} />
                    <Key onClick={() => handleResetPassword(g.email)} />
                    <CheckCircle onClick={() => handleToggleStatus(g.id)} />
                    <Trash2 onClick={() => handleDelete(g.id)} />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </>
  );
};

export default Gestioncomptes;