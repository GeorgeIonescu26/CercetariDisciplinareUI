import React, { useState, useEffect } from 'react';
import './AdaugaCercetareModal.css';
import axios from 'axios';
import { API_BASE_URL, apiClient } from "../apiClient";

const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const AdaugaCercetareModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    // Date cercetare
    numarCercetare: '',
    dataCercetare: formatDate(new Date()),
    termenPrescriptie: formatDate(new Date()),
    termenDecadere: formatDate(new Date()),
    
    // Dispoziție
    numarDispozitie: '',
    dataDispozitie: formatDate(new Date()),
    
    // Act sesizare
    numarActSesizare: '',
    dataActSesizare: formatDate(new Date()),
    
    // Faptă
    descriereFapta: '',
    perioadaStart: formatDate(new Date()),
    perioadaSfarsit: formatDate(new Date()),
    abatereDisciplinaraId:'',
    conduitaRutiera: 0,
    
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
    dataRaport: formatDate(new Date()),
    
    // Hotărâre judecătorească
    numarHotarare: '',
    dataHotarare: formatDate(new Date()),
    
    // Recompensă
    numarRecompensa: '',
    dataRecompensa: formatDate(new Date()),
    
    // Soluții (acum ID-uri pentru nomenclatoare)
    solutieRaportId: '',
    solutiePropusaId: '',
    solutieSefId: '',
    solutieConsultareId: '',
    solutieRestituireId: ''
  });

  // State pentru nomenclatoare
  const [nomenclatoare, setNomenclatoare] = useState({
    solutiiRaport: [],
    solutiiPropuse: [],
    solutiiSef: [],
    solutiiConsultare: [],
    solutiiRestituire: [],
    abatereDisciplinara: [],
    rolCercertare: [] 
  });

  const [loadingNomenclatoare, setLoadingNomenclatoare] = useState(true);

  // Încarcă nomenclatoarele la mount
  useEffect(() => {
    incarcaNomenclatoare();
  }, []);

  const incarcaNomenclatoare = async () => {
    try {
      setLoadingNomenclatoare(true);
      
      // Aici faci call-urile pentru a încărca nomenclatoarele
      // Adaptează endpoint-urile în funcție de API-ul tău
      const [
        solutiiRaportRes,
        solutiiPropuseRes,
        solutiiSefRes,
        solutiiConsultareRes,
        solutiiRestituireRes,
        abatereDisciplinaraRes,
        rolCercertareRes
      ] = await Promise.all([
        apiClient.get(`${API_BASE_URL}api/NSolutiiRaport`),
        apiClient.get(`${API_BASE_URL}api/NSolutiiPropuse`),
        apiClient.get(`${API_BASE_URL}api/NSolutiiSef`),
        apiClient.get(`${API_BASE_URL}api/NSolutiiConsultare`),
        apiClient.get(`${API_BASE_URL}api/NSolutiiRestituire`),
        apiClient.get(`${API_BASE_URL}api/NAbatereDisciplinara`),
        apiClient.get(`${API_BASE_URL}api/NRolCercetare`)
      ]);

      setNomenclatoare({
        solutiiRaport: solutiiRaportRes.data,
        solutiiPropuse: solutiiPropuseRes.data,
        solutiiSef: solutiiSefRes.data,
        solutiiConsultare: solutiiConsultareRes.data,
        solutiiRestituire: solutiiRestituireRes.data,
        abatereDisciplinara: abatereDisciplinaraRes.data,
        rolCercertare: rolCercertareRes.data
      });
    } catch (error) {
      console.error('Eroare la încărcarea nomenclatoarelor:', error);
      alert('Eroare la încărcarea listelor de soluții. Verificați conexiunea.');
    } finally {
      setLoadingNomenclatoare(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Helper pentru DateOnly (C# așteaptă format YYYY-MM-DD simplu)
  const toDateOnly = (dateString) => {
    return dateString || null;
  };
  
  // Construiește obiectul exact cum îl așteaptă C#
  const cercetareData = {
    // Proprietăți principale (PascalCase!)
    Numar: formData.numarCercetare,
    Data: toDateOnly(formData.dataCercetare),
    DataPrescriptie: toDateOnly(formData.termenPrescriptie),
    DataDecadere: toDateOnly(formData.termenDecadere),
    
    // Dispoziție - obiect nested
    Dispozitie: formData.numarDispozitie || formData.dataDispozitie ? {
      NumarDesemnare: formData.numarDispozitie || null,
      DataDesemnare: toDateOnly(formData.dataDispozitie)
    } : null,
    
    // Act sesizare - obiect nested (ActeSesizare, nu ActSesizare!)
    ActeSesizare: formData.numarActSesizare || formData.dataActSesizare ? {
      NumarAct: formData.numarActSesizare || null,
      DataAct: toDateOnly(formData.dataActSesizare)
    } : null,
    
    // Fapta - obiect nested cu ConduitaRutiera OBLIGATORIU
    Fapta: {
      NAbatereDisciplinaraId: formData.abatereDisciplinaraId ? parseInt(formData.abatereDisciplinaraId) : null,
      DataInceput: toDateOnly(formData.perioadaStart),
      DataSfarsit: toDateOnly(formData.perioadaSfarsit),
      Descriere: formData.descriereFapta || null,
      ConduitaRutiera: 0 // !! IMPORTANT - Lipsea complet! Default 0
    },
    
    // Hotărâre judecătorească - obiect nested
    HotarareJudecatoreasca: formData.numarHotarare || formData.dataHotarare ? {
      NumarHotarare: formData.numarHotarare || null,
      DataHotarare: toDateOnly(formData.dataHotarare),
      DescriereHotarare: null // Nu există în frontend
    } : null,
    
    RapoarteCercetare: formData.numarRaport || formData.dataRaport ? {
      NumarRaport: formData.numarRaport || null,
      DataRaport: toDateOnly(formData.dataRaport)
    } : null,
    
    // Recompensă 
    Recompensa: formData.numarRecompensa || formData.dataRecompensa ? {
      NumarRecompensa: formData.numarRecompensa || null,
      DataRecompensa: formData.dataRecompensa 
    } : null,
    
    // Soluții 
    SolutieRaportId: formData.solutieRaportId ? parseInt(formData.solutieRaportId) : null,
    SolutiePropusaId: formData.solutiePropusaId ? parseInt(formData.solutiePropusaId) : null,
    SolutieSefId: formData.solutieSefId ? parseInt(formData.solutieSefId) : null,
    SolutieConsultareId: formData.solutieConsultareId ? parseInt(formData.solutieConsultareId) : null,
    SolutieRestituireId: formData.solutieRestituireId ? parseInt(formData.solutieRestituireId) : null,
    
    // Polițiști - PascalCase pentru NRolCercetareId
    Politisti: [
      {
        PolitistId: formData.cercettatPolitistId ? parseInt(formData.cercettatPolitistId) : null,
        Nume: formData.cercettatNume,
        Prenume: formData.cercettatPrenume,
        Functie: formData.cercettatFunctie || null,
        Grad: formData.cercettatGrad,
        Corp: formData.cercettatCorp || null,
        Domeniu: formData.cercettatDomeniu || null,
        Unitate: formData.cercettatUnitate || null,
        NRolCercetareId: formData.cercettatRolId || 1 
      },
      ...(formData.desemnatNume && formData.desemnatPrenume ? [{
        PolitistId: formData.desemnatPolitistId ? parseInt(formData.desemnatPolitistId) : null,
        Nume: formData.desemnatNume,
        Prenume: formData.desemnatPrenume,
        Functie: formData.desemnatFunctie || null,
        Grad: formData.desemnatGrad || null,
        Corp: formData.desemnatCorp || null,
        Domeniu: formData.desemnatDomeniu || null,
        Unitate: formData.desemnatUnitate || null,
        NRolCercetareId: formData.desemnatRolId || 2
      }] : [])
    ]
  };

  console.log('Date cercetare pentru salvare:', JSON.stringify(cercetareData, null, 2));
  
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}api/CercetariDisciplinareIntegration/Adauga-Cercetare`,
      cercetareData
    );

    alert('Cercetare adăugată cu succes!');
    onClose();

  } catch (error) {
    console.error('Eroare completă:', error);
    console.error('Response data:', error.response?.data);
    
    if (error.response?.data) {
      const errorDetails = error.response.data;
      
      // ASP.NET returnează erori de validare în errors property
      if (errorDetails.errors) {
        const errorsText = Object.entries(errorDetails.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('\n');
        alert(`Erori de validare:\n${errorsText}`);
      } else {
        const msg = errorDetails?.title || errorDetails?.message || JSON.stringify(errorDetails);
        alert(`Eroare: ${msg}`);
      }
    } else {
      alert(`Eroare: ${error.message}`);
    }
  }
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="modal-header">
          <h2>Adaugă cercetare disciplinară nouă</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* BODY SCROLLABIL */}
          <div className="modal-body">

            {/* SECTION 1 – DATE CERCETARE */}
            <div className="form-section">
              <h3 className="section-title">Date generale cercetare</h3>

              <div className="form-grid">
                <div className="form-group">
                  <label>Număr cercetare *</label>
                  <input
                    type="text"
                    name="numarCercetare"
                    className="input"
                    value={formData.numarCercetare}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Data cercetare *</label>
                  <input
                    type="date"
                    name="dataCercetare"
                    className="input"
                    value={formData.dataCercetare}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Termen prescripție</label>
                  <input
                    type="date"
                    name="termenPrescriptie"
                    className="input"
                    value={formData.termenPrescriptie}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Termen decădere</label>
                  <input
                    type="date"
                    name="termenDecadere"
                    className="input"
                    value={formData.termenDecadere}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* DISPOZITIE */}
              <h3 className="section-title">Dispoziție</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Număr dispoziție</label>
                  <input
                    type="text"
                    name="numarDispozitie"
                    className="input"
                    value={formData.numarDispozitie}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Data dispoziție</label>
                  <input
                    type="date"
                    name="dataDispozitie"
                    className="input"
                    value={formData.dataDispozitie}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* ACT SESIZARE */}
              <h3 className="section-title">Act sesizare</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Număr act sesizare</label>
                  <input
                    type="text"
                    name="numarActSesizare"
                    className="input"
                    value={formData.numarActSesizare}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Data act sesizare</label>
                  <input
                    type="date"
                    name="dataActSesizare"
                    className="input"
                    value={formData.dataActSesizare}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2 – FAPTA */}
            <div className="form-section">
              <h3 className="section-title">Descrierea faptei</h3>

              <div className="form-group">
                <label>Descriere faptă *</label>
                <textarea
                  name="descriereFapta"
                  className="textarea"
                  rows="5"
                  value={formData.descriereFapta}
                  onChange={handleInputChange}
                  required
                />
              </div>

            {/* ADĂUGAT - Dropdown pentru Abatere Disciplinară */}
              {loadingNomenclatoare ? (
                <p>Se încarcă...</p>
              ) : (
                <div className="form-group">
                  <label>Abatere disciplinară</label>
                  <select
                    name="abatereDisciplinaraId"
                    className="select"
                    value={formData.abatereDisciplinaraId}
                    onChange={handleInputChange}
                  >
                    <option value="">Selectează</option>
                    {nomenclatoare.abatereDisciplinara.map((abatere) => (
                      <option key={abatere.id} value={abatere.id}>
                        {abatere.nume || abatere.denumire || abatere.descriere}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <h3 className="section-title">Perioada faptei</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Data început</label>
                  <input
                    type="date"
                    name="perioadaStart"
                    className="input"
                    value={formData.perioadaStart}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Data sfârșit</label>
                  <input
                    type="date"
                    name="perioadaSfarsit"
                    className="input"
                    value={formData.perioadaSfarsit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3 – POLIȚIST CERCETAT */}
            <div className="form-section">
              <h3 className="section-title">Polițist cercetat</h3>

              <div className="depabd-search">
                <div className="form-group">
                  <label>CNP</label>
                  <input
                    type="text"
                    name="cercettatCNP"
                    className="input"
                    maxLength="13"
                    value={formData.cercettatCNP}
                    onChange={handleInputChange}
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
                  <label>Grad *</label>
                  <input
                    type="text"
                    name="cercettatGrad"
                    className="input"
                    value={formData.cercettatGrad}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nume *</label>
                  <input
                    type="text"
                    name="cercettatNume"
                    className="input"
                    value={formData.cercettatNume}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Prenume *</label>
                  <input
                    type="text"
                    name="cercettatPrenume"
                    className="input"
                    value={formData.cercettatPrenume}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Unitate</label>
                  <input
                    type="text"
                    name="cercettatUnitate"
                    className="input"
                    value={formData.cercettatUnitate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Funcție</label>
                  <input
                    type="text"
                    name="cercettatFunctie"
                    className="input"
                    value={formData.cercettatFunctie}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Corp profesional</label>
                  <input
                    type="text"
                    name="cercettatCorp"
                    className="input"
                    value={formData.cercettatCorp}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Domeniu</label>
                  <input
                    type="text"
                    name="cercettatDomeniu"
                    className="input"
                    value={formData.cercettatDomeniu}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Rol *</label>
                  <select
                    name="cercettatRolId"
                    className="select"
                    value={formData.cercettatRolId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selectează</option>
                  {nomenclatoare.rolCercertare.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                          {rol.nume || rol.denumire || rol.descriere}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 4 – POLIȚIST DESEMNAT */}
            <div className="form-section">
              <h3 className="section-title">Polițist desemnat</h3>

              <div className="depabd-search">
                <div className="form-group">
                  <label>CNP</label>
                  <input
                    type="text"
                    name="desemnatCNP"
                    className="input"
                    maxLength="13"
                    value={formData.desemnatCNP}
                    onChange={handleInputChange}
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
                  <label>Grad</label>
                  <input
                    type="text"
                    name="desemnatGrad"
                    className="input"
                    value={formData.desemnatGrad}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Nume</label>
                  <input
                    type="text"
                    name="desemnatNume"
                    className="input"
                    value={formData.desemnatNume}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Prenume</label>
                  <input
                    type="text"
                    name="desemnatPrenume"
                    className="input"
                    value={formData.desemnatPrenume}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Unitate</label>
                  <input
                    type="text"
                    name="desemnatUnitate"
                    className="input"
                    value={formData.desemnatUnitate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Funcție</label>
                  <input
                    type="text"
                    name="desemnatFunctie"
                    className="input"
                    value={formData.desemnatFunctie}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Corp profesional</label>
                  <input
                    type="text"
                    name="desemnatCorp"
                    className="input"
                    value={formData.desemnatCorp}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Domeniu</label>
                  <input
                    type="text"
                    name="desemnatDomeniu"
                    className="input"
                    value={formData.desemnatDomeniu}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Rol</label>
                  <select
                    name="desemnatRolId"
                    className="select"
                    value={formData.desemnatRolId}
                    onChange={handleInputChange}
                  >
                    <option value="">Selectează</option>
                  {nomenclatoare.rolCercertare.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                          {rol.nume || rol.denumire || rol.descriere}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 5 – RAPORT & SOLUȚII */}
            <div className="form-section">
              <h3 className="section-title">Raport cercetare</h3>

              <div className="form-grid">
                <div className="form-group">
                  <label>Număr raport</label>
                  <input
                    type="text"
                    name="numarRaport"
                    className="input"
                    value={formData.numarRaport}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Data raport</label>
                  <input
                    type="date"
                    name="dataRaport"
                    className="input"
                    value={formData.dataRaport}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <h3 className="section-title">Hotărâre judecătorească</h3>

              <div className="form-grid">
                <div className="form-group">
                  <label>Număr hotărâre</label>
                  <input
                    type="text"
                    name="numarHotarare"
                    className="input"
                    value={formData.numarHotarare}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Data hotărâre</label>
                  <input
                    type="date"
                    name="dataHotarare"
                    className="input"
                    value={formData.dataHotarare}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <h3 className="section-title">Recompensă</h3>

                  <div className="form-group">
                    <label>Număr recompensă</label>
                    <input
                      type="text"
                      name="numarRecompensa"
                      className="input"
                      value={formData.numarRecompensa}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Data recompensă</label>
                    <input
                      type="date"
                      name="dataRecompensa"
                      className="input"
                      value={formData.dataRecompensa}
                      onChange={handleInputChange}
                    />
                  </div>

              <h3 className="section-title">Soluții</h3>

              {loadingNomenclatoare ? (
                <p>Se încarcă listele de soluții...</p>
              ) : (
                <div className="form-grid">
                  <div className="form-group">
                    <label>Soluție raport</label>
                    <select
                      name="solutieRaportId"
                      className="select"
                      value={formData.solutieRaportId}
                      onChange={handleInputChange}
                    >
                      <option value="">Selectează</option>
                      {nomenclatoare.solutiiRaport.map((solutie) => (
                        <option key={solutie.id} value={solutie.id}>
                          {solutie.nume || solutie.denumire || solutie.descriere}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Soluție propusă</label>
                    <select
                      name="solutiePropusaId"
                      className="select"
                      value={formData.solutiePropusaId}
                      onChange={handleInputChange}
                    >
                      <option value="">Selectează</option>
                      {nomenclatoare.solutiiPropuse.map((solutie) => (
                        <option key={solutie.id} value={solutie.id}>
                          {solutie.nume || solutie.denumire || solutie.descriere}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Soluție șef</label>
                    <select
                      name="solutieSefId"
                      className="select"
                      value={formData.solutieSefId}
                      onChange={handleInputChange}
                    >
                      <option value="">Selectează</option>
                      {nomenclatoare.solutiiSef.map((solutie) => (
                        <option key={solutie.id} value={solutie.id}>
                          {solutie.nume || solutie.denumire || solutie.descriere}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Soluție consultare</label>
                    <select
                      name="solutieConsultareId"
                      className="select"
                      value={formData.solutieConsultareId}
                      onChange={handleInputChange}
                    >
                      <option value="">Selectează</option>
                      {nomenclatoare.solutiiConsultare.map((solutie) => (
                        <option key={solutie.id} value={solutie.id}>
                          {solutie.nume || solutie.denumire || solutie.descriere}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Soluție restituire</label>
                    <select
                      name="solutieRestituireId"
                      className="select"
                      value={formData.solutieRestituireId}
                      onChange={handleInputChange}
                      >
                      <option value="">Selectează</option>
                      {nomenclatoare.solutiiRestituire.map((solutie) => (
                        <option key={solutie.id} value={solutie.id}>
                          {solutie.nume || solutie.denumire || solutie.descriere}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Anulează
            </button>
            <button type="submit" className="btn btn-primary">
              💾 Salvează cercetarea
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AdaugaCercetareModal;