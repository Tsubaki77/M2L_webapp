import React from 'react';
import { BellDot } from 'lucide-react';

const NotifCard = () => {
  return (
    <div className="card border-0 shadow-sm text-white overflow-hidden position-relative" style={{borderRadius: '16px', backgroundColor: '#ADABAB', width: '50%', height: '200px' }}>
      {/* --- Décorations arrière-plan --- */}
      <div style={{ position: 'absolute', top: '-50px', right: '-180px', zIndex: 0, opacity: 0.8, pointerEvents: 'none'}}>
        <svg width="400" height="400" viewBox="0 0 873 952" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M371.063 302.614L558.084 322.35L387.469 266.432L46.2373 0L371.063 302.614Z" fill="#CC4040"/>
          <path d="M305.442 411.161L174.199 184.2L338.253 351.953L866.505 401.293L305.442 411.161Z" fill="#CC4040"/>
          <path d="M448.557 572.784L337.279 724.76L471.458 605.227L873 444.092L448.557 572.784Z" fill="#CC4040"/>
          <path d="M388.125 461.251L649.808 462.029L422.592 519.505L113.798 952L388.125 461.251Z" fill="#CC4040"/>
          <path d="M175.79 499.642L94.5527 329.615L136.453 504.595L88.9136 935.567L175.79 499.642Z" fill="#CC4040"/>
          <path d="M302.395 498.79L178.35 729.783L234.901 501.801L0 24.9064L302.395 498.79Z" fill="#CC4040"/>
        </svg>
      </div>

      {/* --- Contenu de la card --- */}
      <div className="card-body p-4 position-relative z-1 d-flex flex-column h-100">
        {/* Icône */}
        <div className="mb-1">
          <div className="d-flex align-items-center justify-content-center rounded" style={{ width: '50px', height: '50px', backgroundColor: '#848181' }}>
            <BellDot size={24} />
          </div>
        </div>
        {/* Textes */}
        <div className="mb-4"> 
          <h3 className="fw-bold text-white">3</h3>
          <p className="small mb-0">Notifications</p>
        </div>
          
      </div>
    </div>
  );
};

export default NotifCard;