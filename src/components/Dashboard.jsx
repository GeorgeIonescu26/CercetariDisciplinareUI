import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import AdaugaCercetareModal from './AdaugaCercetareModal';
import { API_BASE_URL, apiClient } from "../apiClient";

const Dashboard = () => {
  // ============ STATE MANAGEMENT ============
  const [cercetari, setCercetari] = useState([]);
  const [selectedCercetareId, setSelectedCercetareId] = useState(null);
  const [activeTab, setActiveTab] = useState('generale');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State pentru filtre
  const [filters, setFilters] = useState({
    searchText: '',
    status: '',
    dataStart: '',
    dataEnd: ''
  });

  // ============ DATA FETCHING ============
  useEffect(() => {
    loadCercetari();
  }, []);

  const loadCercetari = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get(`${API_BASE_URL}api/CercetariDisciplinareIntegration`);
      
      const data = response.data;
      console.log('=== DATE PRIMITE DE LA API ===');
      console.log('Numar total cercetari:', data.length);
      if (data.length > 0) {
        console.log('Prima cercetare completa:', JSON.stringify(data[0], null, 2));
      }
      console.log('==============================');
      
      setCercetari(data);

      if (data.length > 0 && !selectedCercetareId) {
        setSelectedCercetareId(data[0].id);
      }
    } catch (err) {
      setError(err.message);
      console.error("Eroare:", err);
    } finally {
      setLoading(false);
    }
  };

  // ============ UTILITY FUNCTIONS ============
  
  // Formatare dată
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  // Extrage polițistul cercetat (cu nRolCercetareId = 1)
  const getPolitistCercetat = (cercetare) => {
    if (!cercetare || !cercetare.politisti || cercetare.politisti.length === 0) {
      return null;
    }
    
    // Caută polițistul cu rolul 1 (cercetat)
    const politistCercetat = cercetare.politisti.find(p => p.nRolCercetareId === 1);
    
    if (!politistCercetat || !politistCercetat.politist) {
      return null;
    }
    
    return politistCercetat.politist;
  };

  // Extrage membrii comisiei (cu nRolCercetareId != 1)
  const getMembriComisie = (cercetare) => {
    if (!cercetare || !cercetare.politisti) {
      return [];
    }
    return cercetare.politisti.filter(p => p.nRolCercetareId !== 1);
  };

  // Calculare status cercetare
  const getCercetareStatus = (cercetare) => {
    if (cercetare.solutieSefId !== null && cercetare.solutieSefId !== undefined) {
      return 'finalizata';
    }
    if (cercetare.solutieRaportId !== null && cercetare.solutieRaportId !== undefined) {
      return 'in-lucru';
    }
    if (cercetare.rapoarteCercetare) {
      return 'in-lucru';
    }
    if (cercetare.dispozitie) {
      return 'deschisa';
    }
    return 'noua';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'finalizata': { class: 'status-ok', label: 'Finalizată' },
      'in-lucru': { class: 'status-pend', label: 'În lucru' },
      'deschisa': { class: 'status-info', label: 'Deschisă' },
      'noua': { class: 'status-new', label: 'Nouă' }
    };
    return badges[status] || badges['noua'];
  };

  // ============ FILTERING & STATISTICS ============
  
  const cercetariFiltrate = cercetari.filter(cercetare => {
    // Filtrare text (număr cercetare sau nume polițist)
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const politist = getPolitistCercetat(cercetare);
      const numeComplet = politist ? `${politist.nume} ${politist.prenume}`.toLowerCase() : '';
      
      if (!cercetare.numar.toLowerCase().includes(searchLower) && 
          !numeComplet.includes(searchLower)) {
        return false;
      }
    }

    // Filtrare status
    if (filters.status && getCercetareStatus(cercetare) !== filters.status) {
      return false;
    }

    // Filtrare dată început
    if (filters.dataStart && cercetare.data < filters.dataStart) {
      return false;
    }

    // Filtrare dată sfârșit
    if (filters.dataEnd && cercetare.data > filters.dataEnd) {
      return false;
    }

    return true;
  });

  // Calculare statistici
  const statistici = {
    total: cercetari.length,
    finalizate: cercetari.filter(c => getCercetareStatus(c) === 'finalizata').length,
    inLucru: cercetari.filter(c => getCercetareStatus(c) === 'in-lucru').length,
    deschise: cercetari.filter(c => getCercetareStatus(c) === 'deschisa').length,
    noi: cercetari.filter(c => getCercetareStatus(c) === 'noua').length
  };

  // ============ EVENT HANDLERS ============
  
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchText: '',
      status: '',
      dataStart: '',
      dataEnd: ''
    });
  };

  const handleSelectCercetare = (id) => {
    setSelectedCercetareId(id);
    setActiveTab('generale');
  };

  const handleCloseModal = (shouldRefresh) => {
    setShowModal(false);
    if (shouldRefresh) {
      loadCercetari();
    }
  };

  // ============ GET SELECTED DATA ============
  const cercetareSelectata = cercetari.find(c => c.id === selectedCercetareId);
  const politistCercetat = cercetareSelectata ? getPolitistCercetat(cercetareSelectata) : null;
  const membriComisie = cercetareSelectata ? getMembriComisie(cercetareSelectata) : [];

  // ============ RENDER LOADING/ERROR STATES ============
  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Se încarcă cercetările disciplinare...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <h2>❌ Eroare</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadCercetari}>
            Reîncearcă
          </button>
        </div>
      </div>
    );
  }

  // ============ MAIN RENDER ============
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="section-header">
        <h1>Cercetări disciplinare</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <span className="icon">+</span>
          Adaugă cercetare nouă
        </button>
      </div>

      {/* Filters */}
      <div className="panel filters-panel">
        <div className="filters">
          <input 
            type="text" 
            className="input" 
            placeholder="Căutare după număr sau nume polițist..."
            value={filters.searchText}
            onChange={(e) => handleFilterChange('searchText', e.target.value)}
          />
          
          <select 
            className="select"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Toate statusurile</option>
            <option value="noua">Nouă</option>
            <option value="deschisa">Deschisă</option>
            <option value="in-lucru">În lucru</option>
            <option value="finalizata">Finalizată</option>
          </select>

          <input 
            type="date" 
            className="input"
            placeholder="Data de la"
            value={filters.dataStart}
            onChange={(e) => handleFilterChange('dataStart', e.target.value)}
          />
          
          <input 
            type="date" 
            className="input"
            placeholder="Data până la"
            value={filters.dataEnd}
            onChange={(e) => handleFilterChange('dataEnd', e.target.value)}
          />

          <button className="btn btn-secondary" onClick={handleResetFilters}>
            Reset filtre
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-blue">📋</div>
          <div className="stat-content">
            <div className="stat-label">Total cercetări</div>
            <div className="stat-value">{statistici.total}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon stat-icon-gray">📄</div>
          <div className="stat-content">
            <div className="stat-label">Noi / Deschise</div>
            <div className="stat-value">{statistici.noi + statistici.deschise}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-yellow">⏳</div>
          <div className="stat-content">
            <div className="stat-label">În lucru</div>
            <div className="stat-value">{statistici.inLucru}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-green">✓</div>
          <div className="stat-content">
            <div className="stat-label">Finalizate</div>
            <div className="stat-value">{statistici.finalizate}</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid">
        
        {/* Lista cercetări - Partea stângă */}
        <div className="panel">
          <div className="panel-header">
            <h3>Lista cercetări</h3>
            <span className="badge">{cercetariFiltrate.length} rezultate</span>
          </div>

          <div className="table-container">
            {cercetariFiltrate.length === 0 ? (
              <div className="empty-state">
                <p>Nu există cercetări care să corespundă filtrelor selectate.</p>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Număr</th>
                    <th>Data</th>
                    <th>Polițist cercetat</th>
                    <th>Grad</th>
                    <th>Funcție</th>
                    <th>Unitate</th>
                    <th>Status</th>
                    <th>Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {cercetariFiltrate.map(cercetare => {
                    const status = getCercetareStatus(cercetare);
                    const statusBadge = getStatusBadge(status);
                    const politist = getPolitistCercetat(cercetare);
                    const isSelected = cercetare.id === selectedCercetareId;

                    return (
                      <tr 
                        key={cercetare.id} 
                        className={isSelected ? 'selected' : ''}
                        onClick={() => handleSelectCercetare(cercetare.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td><strong>#{cercetare.numar}</strong></td>
                        <td>{formatDate(cercetare.data)}</td>
                        <td>
                          {politist 
                            ? `${politist.nume} ${politist.prenume}` 
                            : <em>Nu este specificat</em>}
                        </td>
                        <td>{politist?.grad || '-'}</td>
                        <td>{politist?.functie || '-'}</td>
                        <td>{politist?.unitate || '-'}</td>
                        <td>
                          <span className={`status ${statusBadge.class}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn-icon" 
                            title="Vezi detalii"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectCercetare(cercetare.id);
                            }}
                          >
                            👁️
                          </button>
                          <button 
                            className="btn-icon" 
                            title="Editează"
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: Implementare editare
                            }}
                          >
                            ✏️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Detalii cercetare - Partea dreaptă */}
        {cercetareSelectata ? (
          <div className="panel">
            <div className="panel-header">
              <h3>Cercetare #{cercetareSelectata.numar}</h3>
              <span className={`status ${getStatusBadge(getCercetareStatus(cercetareSelectata)).class}`}>
                {getStatusBadge(getCercetareStatus(cercetareSelectata)).label}
              </span>
            </div>

            {/* Tabs Navigation */}
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'generale' ? 'active' : ''}`}
                onClick={() => setActiveTab('generale')}
              >
                Date generale
              </button>
              <button 
                className={`tab ${activeTab === 'politisti' ? 'active' : ''}`}
                onClick={() => setActiveTab('politisti')}
              >
                Polițiști
              </button>
              <button 
                className={`tab ${activeTab === 'fapta' ? 'active' : ''}`}
                onClick={() => setActiveTab('fapta')}
              >
                Faptă
              </button>
              <button 
                className={`tab ${activeTab === 'documente' ? 'active' : ''}`}
                onClick={() => setActiveTab('documente')}
              >
                Documente
              </button>
              <button 
                className={`tab ${activeTab === 'solutii' ? 'active' : ''}`}
                onClick={() => setActiveTab('solutii')}
              >
                Soluții
              </button>
            </div>

            {/* Tab Content */}
            <div className="tabpanes">
              
              {/* TAB: Date generale */}
              {activeTab === 'generale' && (
                <div className="pane active">
                  <div className="kv">
                    <div className="kv-label">Număr cercetare</div>
                    <div className="kv-value"><strong>{cercetareSelectata.numar}</strong></div>

                    <div className="kv-label">Data deschiderii</div>
                    <div className="kv-value">{formatDate(cercetareSelectata.data)}</div>

                    <div className="kv-label">Termen prescripție</div>
                    <div className="kv-value">
                      <span className="badge badge-warning">
                        {formatDate(cercetareSelectata.dataPrescriptie)}
                      </span>
                    </div>

                    <div className="kv-label">Termen decădere</div>
                    <div className="kv-value">
                      <span className="badge badge-danger">
                        {formatDate(cercetareSelectata.dataDecadere)}
                      </span>
                    </div>

                    {cercetareSelectata.dispozitie && (
                      <>
                        <div className="kv-label">Dispoziție desemnare</div>
                        <div className="kv-value">
                          Nr. <strong>{cercetareSelectata.dispozitie.numarDesemnare}</strong> din {formatDate(cercetareSelectata.dispozitie.dataDesemnare)}
                        </div>
                      </>
                    )}

                    {cercetareSelectata.acteSesizare && (
                      <>
                        <div className="kv-label">Act sesizare</div>
                        <div className="kv-value">
                          Nr. <strong>{cercetareSelectata.acteSesizare.numarAct}</strong> din {formatDate(cercetareSelectata.acteSesizare.dataAct)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* TAB: Polițiști */}
              {activeTab === 'politisti' && (
                <div className="pane active">
                  
                  {/* Polițist cercetat */}
                  {politistCercetat && (
                    <div className="subsection">
                      <h4 className="subsection-title">👤 Polițist cercetat</h4>
                      <div className="kv">
                        <div className="kv-label">Grad</div>
                        <div className="kv-value">{politistCercetat.grad}</div>

                        <div className="kv-label">Nume și prenume</div>
                        <div className="kv-value">
                          <strong>{politistCercetat.nume} {politistCercetat.prenume}</strong>
                        </div>

                        <div className="kv-label">Funcție</div>
                        <div className="kv-value">{politistCercetat.functie}</div>

                        <div className="kv-label">Corp</div>
                        <div className="kv-value">{politistCercetat.corp}</div>

                        <div className="kv-label">Domeniu</div>
                        <div className="kv-value">{politistCercetat.domeniu}</div>

                        <div className="kv-label">Unitate</div>
                        <div className="kv-value">{politistCercetat.unitate}</div>

                        {politistCercetat.avizJudiciar && (
                          <>
                            <div className="kv-label">Aviz judiciar</div>
                            <div className="kv-value">{politistCercetat.avizJudiciar}</div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Membri comisie */}
                  {membriComisie.length > 0 && (
                    <div className="subsection">
                      <h4 className="subsection-title">👥 Membri comisie de cercetare</h4>
                      <div className="membri-list">
                        {membriComisie.map((membru, index) => (
                          <div key={membru.id} className="membru-card">
                            <div className="membru-header">
                              <strong>{index + 1}. {membru.politist.grad} {membru.politist.nume} {membru.politist.prenume}</strong>
                            </div>
                            <div className="membru-details">
                              <span>📍 {membru.politist.unitate}</span>
                              <span>💼 {membru.politist.functie}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!politistCercetat && membriComisie.length === 0 && (
                    <div className="empty-state">
                      <p>Nu sunt polițiști asociați acestei cercetări.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: Faptă */}
              {activeTab === 'fapta' && (
                <div className="pane active">
                  {cercetareSelectata.fapta ? (
                    <div className="kv">
                      <div className="kv-label">Perioadă săvârșire</div>
                      <div className="kv-value">
                        {formatDate(cercetareSelectata.fapta.dataInceput)} → {formatDate(cercetareSelectata.fapta.dataSfarsit)}
                      </div>

                      <div className="kv-label">Abatere disciplinară (ID)</div>
                      <div className="kv-value">
                        <span className="badge badge-info">
                          ID: {cercetareSelectata.fapta.nAbatereDisciplinaraId}
                        </span>
                      </div>

                      <div className="kv-label">Conduită rutieră</div>
                      <div className="kv-value">
                        {cercetareSelectata.fapta.conduitaRutiera === 1 
                          ? <span className="badge badge-warning">DA</span>
                          : <span className="badge badge-secondary">NU</span>
                        }
                      </div>

                      <div className="kv-label">Descriere faptă</div>
                      <div className="kv-value">
                        <div className="descriere-box">
                          {cercetareSelectata.fapta.descriere || <em>Fără descriere</em>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>Nu există informații despre faptă pentru această cercetare.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: Documente */}
              {activeTab === 'documente' && (
                <div className="pane active">
                  <div className="documents-grid">
                    
                    {/* Raport cercetare */}
                    <div className="document-card">
                      <div className="document-icon">📄</div>
                      <div className="document-info">
                        <div className="document-title">Raport cercetare</div>
                        {cercetareSelectata.rapoarteCercetare ? (
                          <div className="document-details">
                            <div>Nr. <strong>{cercetareSelectata.rapoarteCercetare.numarRaport}</strong></div>
                            <div>Data: {formatDate(cercetareSelectata.rapoarteCercetare.dataRaport)}</div>
                          </div>
                        ) : (
                          <div className="document-missing">Nu există</div>
                        )}
                      </div>
                    </div>

                    {/* Hotărâre judecătorească */}
                    <div className="document-card">
                      <div className="document-icon">⚖️</div>
                      <div className="document-info">
                        <div className="document-title">Hotărâre judecătorească</div>
                        {cercetareSelectata.hotarareJudecatoreasca ? (
                          <div className="document-details">
                            <div>Nr. <strong>{cercetareSelectata.hotarareJudecatoreasca.numarHotarare}</strong></div>
                            <div>Data: {formatDate(cercetareSelectata.hotarareJudecatoreasca.dataHotarare)}</div>
                            {cercetareSelectata.hotarareJudecatoreasca.descriereHotarare && (
                              <div className="document-description">
                                {cercetareSelectata.hotarareJudecatoreasca.descriereHotarare}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="document-missing">Nu există</div>
                        )}
                      </div>
                    </div>

                    {/* Recompensă */}
                    <div className="document-card">
                      <div className="document-icon">🏆</div>
                      <div className="document-info">
                        <div className="document-title">Recompensă</div>
                        {cercetareSelectata.recompensa ? (
                          <div className="document-details">
                            <div>Nr. <strong>{cercetareSelectata.recompensa.numarRecompensa}</strong></div>
                            <div>Data: {formatDate(cercetareSelectata.recompensa.dataRecompensa)}</div>
                          </div>
                        ) : (
                          <div className="document-missing">Nu există</div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB: Soluții */}
              {activeTab === 'solutii' && (
                <div className="pane active">
                  <div className="solutii-flow">
                    
                    {/* Soluție raport */}
                    <div className="solutie-item">
                      <div className="solutie-number">1</div>
                      <div className="solutie-content">
                        <div className="solutie-title">Soluție raport cercetare</div>
                        <div className="solutie-value">
                          {cercetareSelectata.solutieRaportId 
                            ? <span className="badge badge-info">ID: {cercetareSelectata.solutieRaportId}</span>
                            : <span className="badge badge-secondary">Necompletată</span>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Soluție propusă */}
                    <div className="solutie-item">
                      <div className="solutie-number">2</div>
                      <div className="solutie-content">
                        <div className="solutie-title">Soluție propusă</div>
                        <div className="solutie-value">
                          {cercetareSelectata.solutiePropusaId 
                            ? <span className="badge badge-info">ID: {cercetareSelectata.solutiePropusaId}</span>
                            : <span className="badge badge-secondary">Necompletată</span>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Soluție consultare */}
                    <div className="solutie-item">
                      <div className="solutie-number">3</div>
                      <div className="solutie-content">
                        <div className="solutie-title">Soluție consultare</div>
                        <div className="solutie-value">
                          {cercetareSelectata.solutieConsultareId 
                            ? <span className="badge badge-info">ID: {cercetareSelectata.solutieConsultareId}</span>
                            : <span className="badge badge-secondary">Necompletată</span>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Soluție restituire */}
                    <div className="solutie-item">
                      <div className="solutie-number">4</div>
                      <div className="solutie-content">
                        <div className="solutie-title">Soluție restituire</div>
                        <div className="solutie-value">
                          {cercetareSelectata.solutieRestituireId 
                            ? <span className="badge badge-info">ID: {cercetareSelectata.solutieRestituireId}</span>
                            : <span className="badge badge-secondary">Necompletată</span>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Soluție șef (FINALĂ) */}
                    <div className="solutie-item solutie-final">
                      <div className="solutie-number">5</div>
                      <div className="solutie-content">
                        <div className="solutie-title">🎯 Soluție șef (FINALĂ)</div>
                        <div className="solutie-value">
                          {cercetareSelectata.solutieSefId 
                            ? <span className="badge badge-success">✓ Aprobată - ID: {cercetareSelectata.solutieSefId}</span>
                            : <span className="badge badge-warning">⏳ În așteptare</span>
                          }
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Panel Footer - Actions */}
            <div className="panel-footer">
              <button className="btn btn-secondary">
                Închide
              </button>
              <button className="btn btn-primary">
                Editează cercetare
              </button>
              <button className="btn btn-danger">
                Șterge cercetare
              </button>
            </div>

          </div>
        ) : (
          <div className="panel empty-selection">
            <div className="empty-state">
              <h3>Nicio cercetare selectată</h3>
              <p>Selectează o cercetare din lista din stânga pentru a vedea detaliile.</p>
            </div>
          </div>
        )}

      </div>

      {/* Modal adăugare cercetare */}
      {showModal && (
        <AdaugaCercetareModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Dashboard;