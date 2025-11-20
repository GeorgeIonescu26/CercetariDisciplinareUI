
import React, { useState } from 'react';
import NomenclatorCRUD from './NomenclatoareCRUD';
import { nomenclatoareConfig } from './nomenclatoareConfig';
import './Nomenclatoare.css';

const Nomenclatoare = () => {
  const [activeNomenclator, setActiveNomenclator] = useState('abatereDisciplinara');

  const nomenclatoareList = [
    { key: 'abatereDisciplinara', label: 'Abateri Disciplinare', icon: '⚠️' },
    { key: 'rolCercetare', label: 'Roluri Cercetare', icon: '🔍' },
    { key: 'solutiiConsultare', label: 'Soluții Consultare', icon: '💬' },
    { key: 'solutiiPropuse', label: 'Soluții Propuse', icon: '📝' },
    { key: 'solutiiRaport', label: 'Soluții Raport', icon: '📊' },
    { key: 'solutiiRestituire', label: 'Soluții Restituire', icon: '↩️' },
    { key: 'solutiiSef', label: 'Soluții Șef', icon: '👔' }
  ];

  return (
    <div className="nomenclatoare-container">
      <div className="nomenclatoare-sidebar">
        <h3>Nomenclatoare</h3>
        <nav className="nomenclatoare-nav">
          {nomenclatoareList.map(item => (
            <button
              key={item.key}
              className={`nomenclator-item ${activeNomenclator === item.key ? 'active' : ''}`}
              onClick={() => setActiveNomenclator(item.key)}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="nomenclatoare-content">
        <NomenclatorCRUD 
          key={activeNomenclator}
          config={nomenclatoareConfig[activeNomenclator]} 
        />
      </div>
    </div>
  );
};

export default Nomenclatoare;