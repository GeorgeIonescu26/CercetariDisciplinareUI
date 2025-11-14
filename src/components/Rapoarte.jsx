import React, { useState } from 'react';
import './Rapoarte.css';

const Rapoarte = () => {
  const [selectedRaport, setSelectedRaport] = useState('');
  const [raportData, setRaportData] = useState(null);

  const generateRaport = () => {
    if (selectedRaport === 'lunar') {
      setRaportData({
        type: 'lunar',
        data: [
          { luna: 'Ianuarie 2025', cercetari: 5 },
          { luna: 'Februarie 2025', cercetari: 8 },
          { luna: 'Martie 2025', cercetari: 6 },
          { luna: 'Aprilie 2025', cercetari: 12 },
          { luna: 'Mai 2025', cercetari: 10 },
          { luna: 'Iunie 2025', cercetari: 7 }
        ]
      });
    } else if (selectedRaport === 'abatere') {
      setRaportData({
        type: 'abatere',
        data: [
          { abatere: 'Conduită rutieră', procent: 40, numar: 18 },
          { abatere: 'Neîndeplinire atribuții', procent: 35, numar: 16 },
          { abatere: 'Abatere disciplinară', procent: 15, numar: 7 },
          { abatere: 'Altele', procent: 10, numar: 4 }
        ]
      });
    } else if (selectedRaport === 'status') {
      setRaportData({
        type: 'status',
        data: [
          { status: 'Soluționate', numar: 15, procent: 55.6 },
          { status: 'În lucru', numar: 8, procent: 29.6 },
          { status: 'Respinse', numar: 4, procent: 14.8 }
        ]
      });
    }
  };

  const handleSelectChange = (e) => {
    setSelectedRaport(e.target.value);
    setRaportData(null);
  };

  return (
    <div className="rapoarte">
      <div className="section-header">
        <h1>Rapoarte și Statistici</h1>
      </div>

      {/* Selectare raport */}
      <div className="panel">
        <div className="panel-header">
          <h3>Generare rapoarte</h3>
        </div>

        <div className="raport-selector">
          <div className="form-group">
            <label htmlFor="raportSelect">Selectează tipul de raport</label>
            <select
              id="raportSelect"
              className="select"
              value={selectedRaport}
              onChange={handleSelectChange}
            >
              <option value="">Alege un raport...</option>
              <option value="lunar">Număr cercetări pe lună</option>
              <option value="abatere">Distribuție pe tipuri de abateri</option>
              <option value="status">Distribuție pe status</option>
            </select>
          </div>

          <button
            className="btn btn-primary"
            onClick={generateRaport}
            disabled={!selectedRaport}
          >
            <span className="icon">📊</span>
            Generează raport
          </button>
        </div>
      </div>

      {/* Rezultate raport */}
      {raportData && (
        <div className="panel">
          <div className="panel-header">
            <h3>Rezultate raport</h3>
            <button className="btn btn-secondary">
              <span className="icon">📥</span>
              Export PDF
            </button>
          </div>

          {raportData.type === 'lunar' && (
            <div className="raport-content">
              <h4>Cercetări disciplinare pe lună (2025)</h4>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Lună</th>
                      <th>Număr cercetări</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raportData.data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.luna}</td>
                        <td><strong>{item.cercetari}</strong></td>
                        <td>
                          {index > 0 && (
                            <span className={`trend ${raportData.data[index - 1].cercetari < item.cercetari ? 'trend-up' : 'trend-down'}`}>
                              {raportData.data[index - 1].cercetari < item.cercetari ? '↑' : '↓'}
                              {' '}
                              {Math.abs(item.cercetari - raportData.data[index - 1].cercetari)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="raport-summary">
                <p><strong>Total cercetări:</strong> {raportData.data.reduce((acc, item) => acc + item.cercetari, 0)}</p>
                <p><strong>Medie lunară:</strong> {(raportData.data.reduce((acc, item) => acc + item.cercetari, 0) / raportData.data.length).toFixed(1)}</p>
              </div>
            </div>
          )}

          {raportData.type === 'abatere' && (
            <div className="raport-content">
              <h4>Distribuția cercetărilor pe tipuri de abateri</h4>
              <div className="chart-container">
                {raportData.data.map((item, index) => (
                  <div key={index} className="chart-bar">
                    <div className="chart-label">
                      <span>{item.abatere}</span>
                      <span><strong>{item.numar}</strong> ({item.procent}%)</span>
                    </div>
                    <div className="chart-bar-bg">
                      <div 
                        className="chart-bar-fill"
                        style={{ width: `${item.procent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {raportData.type === 'status' && (
            <div className="raport-content">
              <h4>Distribuția cercetărilor pe status</h4>
              <div className="status-grid">
                {raportData.data.map((item, index) => (
                  <div key={index} className="status-card">
                    <div className="status-card-header">{item.status}</div>
                    <div className="status-card-number">{item.numar}</div>
                    <div className="status-card-percent">{item.procent.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rapoarte rapide */}
      <div className="panel">
        <div className="panel-header">
          <h3>Rapoarte rapide</h3>
        </div>

        <div className="quick-reports">
          <div className="quick-report-card">
            <div className="quick-report-icon">📊</div>
            <div className="quick-report-content">
              <h4>Rezumat săptămânal</h4>
              <p>Cercetări din ultima săptămână</p>
            </div>
            <button className="btn btn-sm btn-secondary">Vezi</button>
          </div>

          <div className="quick-report-card">
            <div className="quick-report-icon">📈</div>
            <div className="quick-report-content">
              <h4>Termene apropiate</h4>
              <p>Cercetări cu termene în 30 de zile</p>
            </div>
            <button className="btn btn-sm btn-secondary">Vezi</button>
          </div>

          <div className="quick-report-card">
            <div className="quick-report-icon">👮</div>
            <div className="quick-report-content">
              <h4>Top polițiști</h4>
              <p>Cei mai implicați în cercetări</p>
            </div>
            <button className="btn btn-sm btn-secondary">Vezi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rapoarte;