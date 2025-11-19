import React, { useState } from 'react';
import './Politisti.css';

const Politisti = () => {
  const [politisti, setPolitisti] = useState([
    { id: 1, grad: 'Agent', nume: 'Ionescu', prenume: 'Mihai', unitate: 'București' },
    { id: 2, grad: 'Comisar', nume: 'Popescu', prenume: 'Andrei', unitate: 'Cluj' },
    { id: 3, grad: 'Inspector', nume: 'Dumitrescu', prenume: 'Maria', unitate: 'Timișoara' }
  ]);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    grad: '',
    nume: '',
    prenume: '',
    unitate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPolitist = {
      id: politisti.length + 1,
      ...formData
    };
    setPolitisti([...politisti, newPolitist]);
    setFormData({ grad: '', nume: '', prenume: '', unitate: '' });
  };

  const handleDelete = (id) => { debugger;
    if (window.confirm('Sigur doriți să ștergeți acest polițist?')) {
      setPolitisti(politisti.filter(p => p.id !== id));
    }
  };

  const filteredPolitisti = politisti.filter(p =>
    p.nume.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.prenume.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.grad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.unitate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="politisti">
      <div className="section-header">
        <h1>Polițiști</h1>
        <div className="header-stats">
          <span className="stat-badge">
            <span className="stat-badge-icon">👮</span>
            {politisti.length} polițiști înregistrați
          </span>
        </div>
      </div>

      {/* Lista polițiști */}
      <div className="panel">
        <div className="panel-header">
          <h3>Lista polițiști</h3>
          <input
            type="text"
            className="input search-input"
            placeholder="Caută după nume, prenume, grad sau unitate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Grad</th>
                <th>Nume</th>
                <th>Prenume</th>
                <th>Unitate</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {filteredPolitisti.length > 0 ? (
                filteredPolitisti.map(p => (
                  <tr key={p.id}>
                    <td><strong>#{p.id}</strong></td>
                    <td>{p.grad}</td>
                    <td>{p.nume}</td>
                    <td>{p.prenume}</td>
                    <td>{p.unitate}</td>
                    <td>
                      <button className="btn-icon" title="Editează">✏️</button>
                      <button 
                        className="btn-icon btn-icon-danger" 
                        title="Șterge"
                        onClick={() => handleDelete(p.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-message">
                    Nu există polițiști care să corespundă căutării
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formular adaugare */}
      <div className="panel">
        <div className="panel-header">
          <h3>Adaugă polițist nou</h3>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="grad">Grad</label>
              <input
                type="text"
                id="grad"
                name="grad"
                className="input"
                placeholder="Ex: Agent, Comisar, Inspector..."
                value={formData.grad}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nume">Nume</label>
              <input
                type="text"
                id="nume"
                name="nume"
                className="input"
                placeholder="Nume de familie"
                value={formData.nume}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenume">Prenume</label>
              <input
                type="text"
                id="prenume"
                name="prenume"
                className="input"
                placeholder="Prenume"
                value={formData.prenume}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="unitate">Unitate</label>
              <input
                type="text"
                id="unitate"
                name="unitate"
                className="input"
                placeholder="Ex: București, Cluj, Timișoara..."
                value={formData.unitate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <span className="icon">+</span>
              Adaugă polițist
            </button>
            <button type="reset" className="btn btn-secondary" onClick={() => setFormData({ grad: '', nume: '', prenume: '', unitate: '' })}>
              Resetează
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Politisti;