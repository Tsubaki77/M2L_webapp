import React, { useState, useEffect } from "react";
import { Users, Plus, Edit, Trash2, CheckCircle, X, Eye, EyeOff } from "lucide-react";
import Swal from 'sweetalert2';


const gestionnairesData = [
  { id: '1', email: 'jean.dupont@example.com', firstName: 'Jean', lastName: 'Dupont', phone: '0612345678', status: 'active', createdAt: new Date('2024-01-15') },
  { id: '2', email: 'marie.martin@example.com', firstName: 'Marie', lastName: 'Martin', phone: '0698765432', status: 'active', createdAt: new Date('2024-02-20') },
  { id: '3', email: 'pierre.durand@example.com', firstName: 'Pierre', lastName: 'Durand', phone: '0712345678', status: 'inactive', createdAt: new Date('2024-03-10') },
];

const Gestioncomptes = () => {
  const [gestionnaires, setGestionnaires] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingGestionnaire, setEditingGestionnaire] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ 
    id: '',
    lastName: '', 
    firstName: '',
    email: '', 
    phone: '', 
    password: '' 
  });

  useEffect(() => { 
    setGestionnaires(gestionnairesData); 
  }, []);

  const openModal = (gestionnaire = null) => {
    if (gestionnaire) {
      setEditingGestionnaire(gestionnaire);
      setFormData({ 
        id: gestionnaire.id,
        lastName: gestionnaire.lastName, 
        firstName: gestionnaire.firstName,
        email: gestionnaire.email, 
        phone: gestionnaire.phone || '', 
        password: '' 
      });
    } else {
      setEditingGestionnaire(null);
      setFormData({ 
        id: '',
        lastName: '',
        firstName: '', 
        email: '', 
        phone: '', 
        password: '' 
      });
    }
    setShowPassword(false);
    setShowModal(true);
  };

  const closeModal = () => { 
    setShowModal(false); 
    setEditingGestionnaire(null);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.id) {
      Swal.fire({
        title: 'Erreur',
        text: 'L\'identifiant est requis.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#430000'
      });
      return;
    }
    
    if (editingGestionnaire) {
      // Vérifier si le nouvel ID n'est pas déjà utilisé par un autre gestionnaire
      const idExists = gestionnaires.some(g => g.id === formData.id && g.id !== editingGestionnaire.id);
      if (idExists) {
        Swal.fire({
          title: 'Erreur',
          text: 'Cet identifiant existe déjà. Veuillez en choisir un autre.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#430000'
        });
        return;
      }
      
      setGestionnaires(gestionnaires.map(g => 
        g.id === editingGestionnaire.id ? { ...g, ...formData } : g
      ));
      Swal.fire({
        title: 'Succès',
        text: 'Gestionnaire modifié avec succès',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#430000'
      });
    } else {
      // Vérifier si l'ID existe déjà pour un nouveau gestionnaire
      const idExists = gestionnaires.some(g => g.id === formData.id);
      if (idExists) {
        Swal.fire({
          title: 'Erreur',
          text: 'Cet identifiant existe déjà. Veuillez en choisir un autre.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#430000'
        });
        return;
      }
      
      const newGestionnaire = { 
        id: formData.id,
        ...formData, 
        status: 'active', 
        createdAt: new Date() 
      };
      setGestionnaires([...gestionnaires, newGestionnaire]);
      Swal.fire({
        title: 'Succès',
        text: 'Gestionnaire créé avec succès',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#430000'
      });
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?', 
      text: "Cette action est irréversible !", 
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: 'Oui, supprimer', 
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#CC4040',
      cancelButtonColor: '#430000'
    });
    if (result.isConfirmed) {
      setGestionnaires(gestionnaires.filter(g => g.id !== id));
      Swal.fire({
        title: 'Supprimé',
        text: 'Gestionnaire supprimé',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#430000'
      });
    }
  };

  const handleToggleStatus = (id) => {
    setGestionnaires(gestionnaires.map(g => 
      g.id === id ? { ...g, status: g.status === 'active' ? 'inactive' : 'active' } : g
    ));
    Swal.fire({
      title: 'Statut modifié', 
      text: 'Le statut du gestionnaire a été mis à jour', 
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#430000'
    });
  };

  return (
    <div className="dash-wrapper">
      <div className="creer-salle-header">
        <Users size={28} />
        <h1 className="creer-salle-header-title">Gestion des gestionnaires</h1>
      </div>

      <div className="creer-salle-body">
        <div className="creer-salle-container">
          <div className="creer-salle-card">
            <h2 className="creer-salle-card-title">Gestion des comptes</h2>

            <div className="page-actions" style={{ justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button className="page-btn" onClick={() => openModal()}>
                <Plus size={16} />
                Ajouter un gestionnaire
              </button>
            </div>

            {gestionnaires.length > 0 ? (
              <table className="page-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gestionnaires.map(g => (
                    <tr key={g.id}>
                      <td><span className="page-table-id">{g.id}</span></td>
                      <td>{g.lastName}</td>
                      <td>{g.firstName}</td>
                      <td>{g.email}</td>
                      <td>{g.phone || 'Non renseigné'}</td>
                      <td>
                        <span className={`page-status-badge ${g.status === 'active' ? 'page-status-active' : 'page-status-inactive'}`}>
                          {g.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td>
                        <div className="page-actions-cell">
                          <button className="page-action-btn" onClick={() => openModal(g)} title="Modifier">
                            <Edit size={18} />
                          </button>
                          <button className="page-action-btn" onClick={() => handleToggleStatus(g.id)} title={g.status === 'active' ? 'Désactiver' : 'Activer'}>
                            <CheckCircle size={18} />
                          </button>
                          <button className="page-action-btn" onClick={() => handleDelete(g.id)} title="Supprimer">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="page-empty-state">
                <Users size={50} className="page-empty-state-icon" />
                <p>Aucun gestionnaire trouvé</p>
                <button className="page-btn" onClick={() => openModal()}>
                  <Plus size={16} />
                  Ajouter le premier gestionnaire
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="page-modal-overlay" onClick={closeModal}>
          <div className="page-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="page-modal-header">
              <h3>{editingGestionnaire ? 'Modifier le gestionnaire' : 'Ajouter un gestionnaire'}</h3>
              <button onClick={closeModal} className="page-modal-close-btn">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="page-modal-body">
                <div className="page-form-group">
                  <label className="page-form-label">ID *</label>
                  <input type="text" className="page-form-input" placeholder="Identifiant" required value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
                </div>
                <div className="page-form-group">
                  <label className="page-form-label">Nom *</label>
                  <input type="text" className="page-form-input" placeholder="Nom" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </div>
                <div className="page-form-group">
                  <label className="page-form-label">Prénom *</label>
                  <input type="text" className="page-form-input" placeholder="Prénom" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </div>
                <div className="page-form-group">
                  <label className="page-form-label">Email *</label>
                  <input type="email" className="page-form-input" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="page-form-group">
                  <label className="page-form-label">Téléphone</label>
                  <input type="tel" className="page-form-input" placeholder="Téléphone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                {!editingGestionnaire && (
                  <div className="page-form-group">
                    <label className="page-form-label">Mot de passe *</label>
                    <div className="page-password-container">
                      <input type={showPassword ? 'text' : 'password'} className="page-form-input" placeholder="Mot de passe" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                      <button type="button" className="page-password-toggle" onClick={() => setShowPassword(!showPassword)} title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="page-modal-footer">
                <button type="button" onClick={closeModal} className="page-modal-btn page-modal-btn-cancel">Annuler</button>
                <button type="submit" className="page-modal-btn page-modal-btn-submit">{editingGestionnaire ? 'Modifier' : 'Créer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gestioncomptes;