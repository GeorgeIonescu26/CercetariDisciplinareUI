import React, { useState } from 'react';
import './AdaugaCercetareModal.css';

const AdaugaCercetareModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    // Date cercetare
    numarCercetare: '',
    dataCercetare: '',
    termenPrescriptie: '',
    termenDecadere: '',
    
    // Dispoziție
    numarDispozitie: '',
    dataDispozitie: '',
    
    // Act sesizare
    numarActSesizare: '',
    dataActSesizare: '',
    
    // Faptă
    descriereFapta: '',
    perioadaStart: '',
    perioadaSfarsit: '',
    
    // Polițist cercetat
    cercettatPolitistId: '',
    cercettatCNP: '',
    cercettatGrad: '',
    cercettatNume: '',
    cercettatPrenume: '',
    cercettatUnitate: '',
    cercettatFunctie: '',
    cercettatCorp: '',
    cercettatDomeniu: '',
    cercettatRolId: '',
    
    // Polițist desemnat
    desemnatPolitistId: '',
    desemnatCNP: '',
    desemnatGrad: '',
    desemnatNume: '',
    desemnatPrenume: '',
    desemnatUnitate: '',
    desemnatFunctie: '',
    desemnatCorp: '',
    desemnatDomeniu: '',
    desemnatRolId: '',
    
    // Raport cercetare
    numarRaport: '',
    dataRaport: '',
    concluziiRaport: '',
    
    // Hotărâre judecătorească
    numarHotarare: '',
    dataHotarare: '',
    
    // Recompensă
    tipRecompensa: '',
    detaliiRecompensa: '',
    
    // Soluție
    solutieRaport: '',
    solutiePropusa: '',
    solutieSef: ''
  });

  const [activeSection, setActiveSection] = useState('date-cercetare');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construiește obiectul pentru API bazat pe CercetariPolitistiRequestCreate
    const cercetareData = {
      // Date cercetare de bază
      numarCercetare: formData.numarCercetare,
      dataCercetare: formData.dataCercetare,
      termenPrescriptie: formData.termenPrescriptie,
      termenDecadere: formData.termenDecadere,
      
      // Dispoziție
      numarDispozitie: formData.numarDispozitie,
      dataDispozitie: formData.dataDispozitie,
      
      // Act sesizare
      numarActSesizare: formData.numarActSesizare,
      dataActSesizare: formData.dataActSesizare,
      
      // Faptă
      descriereFapta: formData.descriereFapta,
      perioadaStart: formData.perioadaStart,
      perioadaSfarsit: formData.perioadaSfarsit,
      
      // Array de polițiști implicați în cercetare
      politisti: [
        // Polițist cercetat
        {
          PolitistId: formData.cercettatPolitistId ? parseInt(formData.cercettatPolitistId) : null,
          Nume: formData.cercettatNume,
          Prenume: formData.cercettatPrenume,
          Functie: formData.cercettatFunctie,
          Grad: formData.cercettatGrad,
          Corp: formData.cercettatCorp,
          Domeniu: formData.cercettatDomeniu,
          Unitate: formData.cercettatUnitate,
          NRolCercetareId: parseInt(formData.cercettatRolId) || 1 // Default: Cercetat
        },
        // Polițist desemnat
        {
          PolitistId: formData.desemnatPolitistId ? parseInt(formData.desemnatPolitistId) : null,
          Nume: formData.desemnatNume,
          Prenume: formData.desemnatPrenume,
          Functie: formData.desemnatFunctie,
          Grad: formData.desemnatGrad,
          Corp: formData.desemnatCorp,
          Domeniu: formData.desemnatDomeniu,
          Unitate: formData.desemnatUnitate,
          NRolCercetareId: parseInt(formData.desemnatRolId) || 2 // Default: Membru comisie
        }
      ],
      
      // Raport
      numarRaport: formData.numarRaport,
      dataRaport: formData.dataRaport,
      concluziiRaport: formData.concluziiRaport,
      
      // Hotărâre
      numarHotarare: formData.numarHotarare,
      dataHotarare: formData.dataHotarare,
      
      // Recompensă
      tipRecompensa: formData.tipRecompensa,
      detaliiRecompensa: formData.detaliiRecompensa,
      
      // Soluții
      solutieRaport: formData.solutieRaport,
      solutiePropusa: formData.solutiePropusa,
      solutieSef: formData.solutieSef
    };

    console.log('Date cercetare pentru salvare:', cercetareData);
    
    // Aici vei face call-ul API
    // await createCercetare(cercetareData);
    
    alert('Cercetare adăugată cu succes!');
    onClose();
  };

  const cautaInDEPABD = (tip) => {
    const cnp = tip === 'cercetat' ? formData.cercettatCNP : formData.desemnatCNP;
    
    if (!cnp) {
      alert('Introduceți CNP-ul pentru căutare');
      return;
    }

    // Simulare căutare în DEPABD
    alert(`Căutare polițist cu CNP: ${cnp} în baza de date DEPABD...`);
    
    // Mock data - în producție aici vei face call API
    const mockData = {
      politistId: 123,
      grad: 'Agent',
      nume: 'Popescu',
      prenume: 'Ion',
      unitate: 'București Sector 1',
      functie: 'Agent de poliție',
      corp: 'Agenți',
      domeniu: 'Ordine publică'
    };

    if (tip === 'cercetat') {
      setFormData(prev => ({
        ...prev,
        cercettatPolitistId: mockData.politistId,
        cercettatGrad: mockData.grad,
        cercettatNume: mockData.nume,
        cercettatPrenume: mockData.prenume,
        cercettatUnitate: mockData.unitate,
        cercettatFunctie: mockData.functie,
        cercettatCorp: mockData.corp,
        cercettatDomeniu: mockData.domeniu
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        desemnatPolitistId: mockData.politistId,
        desemnatGrad: mockData.grad,
        desemnatNume: mockData.nume,
        desemnatPrenume: mockData.prenume,
        desemnatUnitate: mockData.unitate,
        desemnatFunctie: mockData.functie,
        desemnatCorp: mockData.corp,
        desemnatDomeniu: mockData.domeniu
      }));
    }
  };

  const sections = [
    { id: 'date-cercetare', label: 'Date cercetare', icon: '📋' },
    { id: 'fapta', label: 'Faptă', icon: '⚠️' },
    { id: 'politist-cercetat', label: 'Polițist cercetat', icon: '👤' },
    { id: 'politist-desemnat', label: 'Polițist desemnat', icon: '👮' },
    { id: 'raport', label: 'Raport & Soluție', icon: '📄' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Adaugă cercetare disciplinară nouă</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Navigation tabs */}
        <div className="modal-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`modal-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              type="button"
            >
              <span className="icon">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            {/* DATE CERCETARE */}
            {activeSection === 'date-cercetare' && (
              <div className="form-section">
                <h3 className="section-title">Date generale cercetare</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="numarCercetare">
                      Număr cercetare <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="numarCercetare"
                      name="numarCercetare"
                      className="input"
                      placeholder="Ex: 27"
                      value={formData.numarCercetare}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataCercetare">
                      Data cercetare <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      id="dataCercetare"
                      name="dataCercetare"
                      className="input"
                      value={formData.dataCercetare}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="termenPrescriptie">Termen prescripție</label>
                    <input
                      type="date"
                      id="termenPrescriptie"
                      name="termenPrescriptie"
                      className="input"
                      value={formData.termenPrescriptie}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="termenDecadere">Termen decădere</label>
                    <input
                      type="date"
                      id="termenDecadere"
                      name="termenDecadere"
                      className="input"
                      value={formData.termenDecadere}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h3 className="section-title">Dispoziție</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="numarDispozitie">Număr dispoziție</label>
                    <input
                      type="text"
                      id="numarDispozitie"
                      name="numarDispozitie"
                      className="input"
                      placeholder="Ex: #12"
                      value={formData.numarDispozitie}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataDispozitie">Data dispoziție</label>
                    <input
                      type="date"
                      id="dataDispozitie"
                      name="dataDispozitie"
                      className="input"
                      value={formData.dataDispozitie}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h3 className="section-title">Act sesizare</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="numarActSesizare">Număr act sesizare</label>
                    <input
                      type="text"
                      id="numarActSesizare"
                      name="numarActSesizare"
                      className="input"
                      placeholder="Ex: #7"
                      value={formData.numarActSesizare}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataActSesizare">Data act sesizare</label>
                    <input
                      type="date"
                      id="dataActSesizare"
                      name="dataActSesizare"
                      className="input"
                      value={formData.dataActSesizare}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FAPTĂ */}
            {activeSection === 'fapta' && (
              <div className="form-section">
                <h3 className="section-title">Descrierea faptei</h3>
                
                <div className="form-group">
                  <label htmlFor="descriereFapta">
                    Descriere faptă <span className="required">*</span>
                  </label>
                  <textarea
                    id="descriereFapta"
                    name="descriereFapta"
                    className="textarea"
                    placeholder="Descrieți faptă care face obiectul cercetării disciplinare..."
                    rows="5"
                    value={formData.descriereFapta}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <h3 className="section-title">Perioada faptei</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="perioadaStart">Data început</label>
                    <input
                      type="date"
                      id="perioadaStart"
                      name="perioadaStart"
                      className="input"
                      value={formData.perioadaStart}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="perioadaSfarsit">Data sfârșit</label>
                    <input
                      type="date"
                      id="perioadaSfarsit"
                      name="perioadaSfarsit"
                      className="input"
                      value={formData.perioadaSfarsit}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* POLIȚIST CERCETAT */}
            {activeSection === 'politist-cercetat' && (
              <div className="form-section">
                <h3 className="section-title">Polițist cercetat</h3>
                
                <div className="depabd-search">
                  <div className="form-group">
                    <label htmlFor="cercettatCNP">CNP</label>
                    <input
                      type="text"
                      id="cercettatCNP"
                      name="cercettatCNP"
                      className="input"
                      placeholder="Introduceți CNP"
                      value={formData.cercettatCNP}
                      onChange={handleInputChange}
                      maxLength="13"
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => cautaInDEPABD('cercetat')}
                  >
                    🔍 Caută în DEPABD
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="cercettatGrad">
                      Grad <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="cercettatGrad"
                      name="cercettatGrad"
                      className="input"
                      placeholder="Ex: Agent, Comisar..."
                      value={formData.cercettatGrad}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cercettatNume">
                      Nume <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="cercettatNume"
                      name="cercettatNume"
                      className="input"
                      placeholder="Nume"
                      value={formData.cercettatNume}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cercettatPrenume">
                      Prenume <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="cercettatPrenume"
                      name="cercettatPrenume"
                      className="input"
                      placeholder="Prenume"
                      value={formData.cercettatPrenume}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cercettatUnitate">Unitate</label>
                    <input
                      type="text"
                      id="cercettatUnitate"
                      name="cercettatUnitate"
                      className="input"
                      placeholder="Ex: București Sector 1"
                      value={formData.cercettatUnitate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cercettatFunctie">Funcție</label>
                    <input
                      type="text"
                      id="cercettatFunctie"
                      name="cercettatFunctie"
                      className="input"
                      placeholder="Ex: Agent de poliție"
                      value={formData.cercettatFunctie}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cercettatCorp">Corp profesional</label>
                    <input
                      type="text"
                      id="cercettatCorp"
                      name="cercettatCorp"
                      className="input"
                      placeholder="Ex: Agenți"
                      value={formData.cercettatCorp}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cercettatDomeniu">Domeniu activitate</label>
                    <input
                      type="text"
                      id="cercettatDomeniu"
                      name="cercettatDomeniu"
                      className="input"
                      placeholder="Ex: Ordine publică"
                      value={formData.cercettatDomeniu}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cercettatRolId">
                      Rol în cercetare <span className="required">*</span>
                    </label>
                    <select
                      id="cercettatRolId"
                      name="cercettatRolId"
                      className="select"
                      value={formData.cercettatRolId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selectează rol</option>
                      <option value="1">Cercetat</option>
                      <option value="2">Membru comisie</option>
                      <option value="3">Președinte comisie</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* POLIȚIST DESEMNAT */}
            {activeSection === 'politist-desemnat' && (
              <div className="form-section">
                <h3 className="section-title">Polițist desemnat / Membru comisie</h3>
                
                <div className="depabd-search">
                  <div className="form-group">
                    <label htmlFor="desemnatCNP">CNP</label>
                    <input
                      type="text"
                      id="desemnatCNP"
                      name="desemnatCNP"
                      className="input"
                      placeholder="Introduceți CNP"
                      value={formData.desemnatCNP}
                      onChange={handleInputChange}
                      maxLength="13"
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => cautaInDEPABD('desemnat')}
                  >
                    🔍 Caută în DEPABD
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="desemnatGrad">Grad</label>
                    <input
                      type="text"
                      id="desemnatGrad"
                      name="desemnatGrad"
                      className="input"
                      placeholder="Ex: Agent, Comisar..."
                      value={formData.desemnatGrad}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desemnatNume">Nume</label>
                    <input
                      type="text"
                      id="desemnatNume"
                      name="desemnatNume"
                      className="input"
                      placeholder="Nume"
                      value={formData.desemnatNume}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desemnatPrenume">Prenume</label>
                    <input
                      type="text"
                      id="desemnatPrenume"
                      name="desemnatPrenume"
                      className="input"
                      placeholder="Prenume"
                      value={formData.desemnatPrenume}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desemnatUnitate">Unitate</label>
                    <input
                      type="text"
                      id="desemnatUnitate"
                      name="desemnatUnitate"
                      className="input"
                      placeholder="Ex: București Sector 1"
                      value={formData.desemnatUnitate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desemnatFunctie">Funcție</label>
                    <input
                      type="text"
                      id="desemnatFunctie"
                      name="desemnatFunctie"
                      className="input"
                      placeholder="Ex: Agent de poliție"
                      value={formData.desemnatFunctie}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desemnatCorp">Corp profesional</label>
                    <input
                      type="text"
                      id="desemnatCorp"
                      name="desemnatCorp"
                      className="input"
                      placeholder="Ex: Agenți"
                      value={formData.desemnatCorp}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desemnatDomeniu">Domeniu activitate</label>
                    <input
                      type="text"
                      id="desemnatDomeniu"
                      name="desemnatDomeniu"
                      className="input"
                      placeholder="Ex: Ordine publică"
                      value={formData.desemnatDomeniu}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desemnatRolId">Rol în cercetare</label>
                    <select
                      id="desemnatRolId"
                      name="desemnatRolId"
                      className="select"
                      value={formData.desemnatRolId}
                      onChange={handleInputChange}
                    >
                      <option value="">Selectează rol</option>
                      <option value="1">Cercetat</option>
                      <option value="2">Membru comisie</option>
                      <option value="3">Președinte comisie</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* RAPORT & SOLUȚIE */}
            {activeSection === 'raport' && (
              <div className="form-section">
                <h3 className="section-title">Raport cercetare</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="numarRaport">Număr raport</label>
                    <input
                      type="text"
                      id="numarRaport"
                      name="numarRaport"
                      className="input"
                      placeholder="Ex: #RC-112"
                      value={formData.numarRaport}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataRaport">Data raport</label>
                    <input
                      type="date"
                      id="dataRaport"
                      name="dataRaport"
                      className="input"
                      value={formData.dataRaport}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="concluziiRaport">Concluzii raport</label>
                  <textarea
                    id="concluziiRaport"
                    name="concluziiRaport"
                    className="textarea"
                    placeholder="Concluziile raportului de cercetare..."
                    rows="4"
                    value={formData.concluziiRaport}
                    onChange={handleInputChange}
                  />
                </div>

                <h3 className="section-title">Hotărâre judecătorească</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="numarHotarare">Număr hotărâre</label>
                    <input
                      type="text"
                      id="numarHotarare"
                      name="numarHotarare"
                      className="input"
                      placeholder="Ex: #HJ-22"
                      value={formData.numarHotarare}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dataHotarare">Data hotărâre</label>
                    <input
                      type="date"
                      id="dataHotarare"
                      name="dataHotarare"
                      className="input"
                      value={formData.dataHotarare}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h3 className="section-title">Recompensă</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="tipRecompensa">Tip recompensă</label>
                    <input
                      type="text"
                      id="tipRecompensa"
                      name="tipRecompensa"
                      className="input"
                      placeholder="Ex: Diplomă de merit"
                      value={formData.tipRecompensa}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="detaliiRecompensa">Detalii recompensă</label>
                    <textarea
                      id="detaliiRecompensa"
                      name="detaliiRecompensa"
                      className="textarea"
                      placeholder="Detalii despre recompensă..."
                      rows="3"
                      value={formData.detaliiRecompensa}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h3 className="section-title">Soluții</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="solutieRaport">Soluție raport</label>
                    <input
                      type="text"
                      id="solutieRaport"
                      name="solutieRaport"
                      className="input"
                      placeholder="Ex: Avertisment scris"
                      value={formData.solutieRaport}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="solutiePropusa">Soluție propusă</label>
                    <input
                      type="text"
                      id="solutiePropusa"
                      name="solutiePropusa"
                      className="input"
                      placeholder="Ex: Mustrare"
                      value={formData.solutiePropusa}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="solutieSef">Soluție șef</label>

                      <input
                      type="text"
                      id="solutieSef"
                      name="solutieSef"
                      className="input"
                      placeholder="Ex: Aprobată"
                      value={formData.solutieSef}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Anulează
            </button>
            <button type="submit" className="btn btn-primary">
              <span className="icon">💾</span>
              Salvează cercetarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdaugaCercetareModal;