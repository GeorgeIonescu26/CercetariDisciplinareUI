import React, { useState } from 'react';
import './Setari.css';

const Setari = () => {
  const [parola, setParola] = useState('');
  const [notificari, setNotificari] = useState(true);

  const handleSave = () => {
    alert(`Setări salvate:\nParolă: ${parola}\nNotificări: ${notificari ? 'Activ' : 'Dezactiv'}`);
    setParola('');
  };

  return (
    <div className="setari-panel">
      <h1>Setări</h1>

      <label>
        Parolă nouă
        <input
          type="password"
          value={parola}
          onChange={e => setParola(e.target.value)}
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={notificari}
          onChange={e => setNotificari(e.target.checked)}
        />
        Notificări email
      </label>

      <button className="btn-save" onClick={handleSave}>Salvează</button>
    </div>
  );
};

export default Setari;
