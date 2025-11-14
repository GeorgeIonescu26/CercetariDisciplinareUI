import React, { useState } from 'react';
import './AdaugaCercetareModal.css';

const AdaugaCercetareModal = ({ isOpen, onClose }) => {
  const [numar, setNumar] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cercetare adăugată (mock-up):\nNr: ${numar}\nData: ${data}`);
    setNumar('');
    setData('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Adaugă cercetare disciplinară</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Număr cercetare
            <input
              type="text"
              value={numar}
              onChange={e => setNumar(e.target.value)}
              required
            />
          </label>

          <label>
            Data cercetare
            <input
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              required
            />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="btn-submit">Salvează</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Anulează</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdaugaCercetareModal;
