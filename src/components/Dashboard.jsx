import React, { useState } from 'react';
import './Dashboard.css';
import AdaugaCercetareModal from './AdaugaCercetareModal';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCercetare, setSelectedCercetare] = useState(27);
  const [activeTab, setActiveTab] = useState('gen');

  const cercetari = [
    { id: 27, data: '2025-06-05', politist: 'Ionescu Mihai', abatere: 'Conduită rutieră', status: 'solutionata' },
    { id: 26, data: '2025-05-14', politist: 'Popescu Andrei', abatere: 'Neîndeplinire atribuții', status: 'in-lucru' },
    { id: 25, data: '2025-03-03', politist: 'Dumitrescu Maria', abatere: 'Abatere disciplinară', status: 'respinsa' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'solutionata': return 'status-ok';
      case 'in-lucru': return 'status-pend';
      case 'respinsa': return 'status-err';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'solutionata': return 'Soluționată';
      case 'in-lucru': return 'În lucru';
      case 'respinsa': return 'Respinsă';
      default: return status;
    }
  };

  return (
    <div className="dashboard">
      <div className="section-header">
        <h1>Cercetări disciplinare</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <span className="icon">+</span>
          Adaugă cercetare
        </button>
      </div>

      {/* Filters Panel */}
      <div className="panel filters-panel">
        <div className="filters">
          <input type="text" className="input" placeholder="Căutare număr / polițist" />
          <select className="select">
            <option value="">Toate statusurile</option>
            <option value="in-lucru">În lucru</option>
            <option value="solutionata">Soluționată</option>
            <option value="respinsa">Respinsă</option>
          </select>
          <select className="select">
            <option value="">Toate abaterile</option>
            <option value="neindeplinire">Neîndeplinire atribuții</option>
            <option value="conducta">Conduită rutieră</option>
            <option value="alta">Abatere disciplinară</option>
          </select>
          <input type="date" className="input" />
          <input type="date" className="input" />
          <button className="btn btn-primary">Aplică filtre</button>
          <button className="btn btn-secondary">Reset</button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-blue">📊</div>
          <div className="stat-content">
            <div className="stat-label">Total cercetări</div>
            <div className="stat-value">27</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-yellow">⏳</div>
          <div className="stat-content">
            <div className="stat-label">În lucru</div>
            <div className="stat-value">8</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-green">✓</div>
          <div className="stat-content">
            <div className="stat-label">Soluționate</div>
            <div className="stat-value">15</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-red">✗</div>
          <div className="stat-content">
            <div className="stat-label">Respinse</div>
            <div className="stat-value">4</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid">
        {/* Lista cercetări */}
        <div className="panel">
          <div className="panel-header">
            <h3>Lista cercetări</h3>
            <span className="badge">27 înregistrări</span>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nr</th>
                  <th>Data</th>
                  <th>Polițist</th>
                  <th>Abatere</th>
                  <th>Status</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {cercetari.map(c => (
                  <tr key={c.id} className={selectedCercetare === c.id ? 'selected' : ''}>
                    <td><strong>#{c.id}</strong></td>
                    <td>{new Date(c.data).toLocaleDateString('ro-RO')}</td>
                    <td>{c.politist}</td>
                    <td>{c.abatere}</td>
                    <td>
                      <span className={`status ${getStatusClass(c.status)}`}>
                        {getStatusLabel(c.status)}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-icon" 
                        title="Vezi detalii"
                        onClick={() => setSelectedCercetare(c.id)}
                      >
                        👁️
                      </button>
                      <button className="btn-icon" title="Editează">✏️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detaliu cercetare */}
        <div className="panel">
          <div className="panel-header">
            <h3>Detaliu cercetare #{selectedCercetare}</h3>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <div 
              className={`tab ${activeTab === 'gen' ? 'active' : ''}`}
              onClick={() => setActiveTab('gen')}
            >
              Date generale
            </div>
            <div 
              className={`tab ${activeTab === 'fapte' ? 'active' : ''}`}
              onClick={() => setActiveTab('fapte')}
            >
              Fapte
            </div>
            <div 
              className={`tab ${activeTab === 'docs' ? 'active' : ''}`}
              onClick={() => setActiveTab('docs')}
            >
              Documente
            </div>
            <div 
              className={`tab ${activeTab === 'sol' ? 'active' : ''}`}
              onClick={() => setActiveTab('sol')}
            >
              Soluții
            </div>
          </div>

          {/* Tab Panes */}
          <div className="tabpanes">
            {activeTab === 'gen' && (
              <div className="pane active">
                <div className="kv">
                  <div className="kv-label">Număr</div>
                  <div className="kv-value">27</div>
                  
                  <div className="kv-label">Data</div>
                  <div className="kv-value">2025-06-05</div>
                  
                  <div className="kv-label">Dispoziție</div>
                  <div className="kv-value">#12 / 2025-05-20</div>
                  
                  <div className="kv-label">Act sesizare</div>
                  <div className="kv-value">#7 / 2025-05-22</div>
                  
                  <div className="kv-label">Termen prescripție</div>
                  <div className="kv-value">2026-06-05</div>
                  
                  <div className="kv-label">Termen decădere</div>
                  <div className="kv-value">2025-09-05</div>
                  
                  <div className="kv-label">Polițiști</div>
                  <div className="kv-value">
                    <div className="chips">
                      <span className="chip chip-primary">Ionescu Mihai — Cercetat</span>
                      <span className="chip chip-secondary">Vasilescu Dan — Membru comisie</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fapte' && (
              <div className="pane active">
                <div className="kv">
                  <div className="kv-label">Perioadă</div>
                  <div className="kv-value">2025-01-15 → 2025-02-10</div>
                  
                  <div className="kv-label">Abatere</div>
                  <div className="kv-value">Conduită rutieră</div>
                  
                  <div className="kv-label">Descriere</div>
                  <div className="kv-value">A încălcat regulile de circulație în timpul serviciului.</div>
                </div>
              </div>
            )}

            {activeTab === 'docs' && (
              <div className="pane active">
                <div className="kv">
                  <div className="kv-label">Raport cercetare</div>
                  <div className="kv-value">#RC-112 / 2025-06-01</div>
                  
                  <div className="kv-label">Hotărâre judecătorească</div>
                  <div className="kv-value">#HJ-22 / 2025-06-10</div>
                  
                  <div className="kv-label">Anexe</div>
                  <div className="kv-value">
                    <div className="chips">
                      <span className="chip chip-file">📄 Proces verbal.pdf</span>
                      <span className="chip chip-file">🖼️ Foto incident.jpg</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sol' && (
              <div className="pane active">
                <div className="kv">
                  <div className="kv-label">Soluție raport</div>
                  <div className="kv-value">Avertisment scris</div>
                  
                  <div className="kv-label">Soluție propusă</div>
                  <div className="kv-value">Mustrare</div>
                  
                  <div className="kv-label">Soluție șef</div>
                  <div className="kv-value">
                    <span className="badge badge-success">Aprobată</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="panel-footer">
            <button className="btn btn-secondary">Anulează</button>
            <button className="btn btn-primary">Salvează modificări</button>
          </div>
        </div>
      </div>

      {showModal && <AdaugaCercetareModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;