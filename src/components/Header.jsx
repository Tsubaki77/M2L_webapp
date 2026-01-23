import React from 'react';
import { Bell, Settings, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header 
      className="sticky-top" 
      style={{ 
        height: '80px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 1020,
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <h1 className='ms-4'>Dashboard</h1>
      <div className=" me-4">
      
        <div className="d-flex align-items-center gap-3">
          
          <div 
            className="rounded-circle overflow-hidden border border-2 border-light d-flex align-items-center justify-content-center bg-secondary-subtle"
            style={{ width: '40px', height: '40px' }}
          >
             {/* A remplacer par connexion à l'API */}
             <img 
               src="" 
               alt="Profile" 
               style={{ width: '100%', height: '100%', objectFit: 'cover',}} 
             />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;