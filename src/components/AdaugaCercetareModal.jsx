import React, { useState, useEffect } from 'react';
import './AdaugaCercetareModal.css';
import { API_BASE_URL, apiClient } from "../apiClient";
import { useNavigate } from 'react-router-dom';

const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const AdaugaCercetareModal = () => {
  const navigate = useNavigate();
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
    
    // Raport cercetare
    numarRaport: '',
    dataRaport: '',
    
    // Hotărâre judecătorească
    numarHotarare: '',
    dataHotarare: '',
    
    // Recompensă
    numarRecompensa: '',
    dataRecompensa: '',
    
    // Soluții (acum ID-uri pentru nomenclatoare)
    solutieRaportId: '',
    solutiePropusaId: '',
    solutieSefId: '',
    solutieConsultareId: '',
    solutieRestituireId: ''
  });

 const [politistiCercetati, setPolitistiCercetati] = useState([{
  _id: Date.now(), // ID TEMPORAR PENTRU REACT (nu se trimite la backend)
  grad: '',
  nume: '',
  prenume: '',
  functie: '',
  corp: '',
  domeniu: '',
  unitate: '',
  avizJudiciar: '',
  cnp: '', // Păstrăm CNP pentru căutare
  rolId: '' // Păstrăm Rol pentru logică
}]);

const [politistiDesemnati, setPolitistiDesemnati] = useState([{
  _id: Date.now() + 1, // ID TEMPORAR UNIC
  grad: '',
  nume: '',
  prenume: '',
  functie: '',
  corp: '',
  domeniu: '',
  unitate: '',
  avizJudiciar: '',
  cnp: '',
  rolId: ''
}]);

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

  // Funcții pentru gestionarea polițiștilor cercetați
  const handleCercetatChange = (_id, field, value) => {
  setPolitistiCercetati(prev => 
    prev.map(p => p._id === _id ? { ...p, [field]: value } : p)
  );
};

const adaugaCercetat = () => {
  setPolitistiCercetati(prev => [{
    _id: Date.now(), // Generăm ID unic pe moment
    cnp: '', grad: '', nume: '', prenume: '', unitate: '', 
    functie: '', corp: '', domeniu: '', avizJudiciar: '', rolId: ''
  }, ...prev]); 
};

const stergeCercetat = (_id) => {
  if (politistiCercetati.length > 1) {
    setPolitistiCercetati(prev => prev.filter(p => p._id !== _id));
  } else {
    alert('Trebuie să existe cel puțin un polițist cercetat!');
  }
};

  // Funcții pentru gestionarea polițiștilor desemnați
  const handleDesemnatChange = (_id, field, value) => {
  setPolitistiDesemnati(prev => 
    prev.map(p => p._id === _id ? { ...p, [field]: value } : p)
  );
};

const adaugaDesemnat = () => {
  setPolitistiDesemnati(prev => [{
    _id: Date.now(), // Generăm ID unic pe moment
    cnp: '', grad: '', nume: '', prenume: '', unitate: '', 
    functie: '', corp: '', domeniu: '', avizJudiciar: '', rolId: ''
  }, ...prev]);
};

const stergeDesemnat = (_id) => {
  if (politistiDesemnati.length > 1) {
    setPolitistiDesemnati(prev => prev.filter(p => p._id !== _id));
  } else {
    alert('Trebuie să existe cel puțin un polițist desemnat!');
  }
};

  const cautaInDEPABD = async (tip, _id) => {
  const lista = tip === 'cercetat' ? politistiCercetati : politistiDesemnati;
  const politist = lista.find(p => p._id === _id);
  
  if (!politist?.cnp) {
    alert('Introduceți CNP-ul pentru căutare');
    return;
  }

  try {
    const response = await apiClient.get(`${API_BASE_URL}api/PolitistiCautare/${politist.cnp}`);
    
    if (!response.data) { // Atenție: verifică response.data, nu doar response
      alert('Nu s-au găsit date pentru acest CNP');
      return;
    }

    const data = response.data; // Presupunând că API-ul returnează direct obiectul cu nume, prenume etc.

    // Actualizăm folosind _id
    if (tip === 'cercetat') {
      setPolitistiCercetati(prev => prev.map(p => p._id === _id ? { ...p, ...data } : p));
    } else {
      setPolitistiDesemnati(prev => prev.map(p => p._id === _id ? { ...p, ...data } : p));
    }
  } catch (error) {
    console.error(error);
    alert('Eroare la interogarea bazei de date DEPABD');
  }
};

const handleBack = () => {
    navigate('/cercetariDisciplinare');

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validare: cel puțin un polițist cercetat trebuie să fie completat
    const politistiCercetatiValizi = politistiCercetati.filter(p => p.nume && p.prenume && p.grad);
    if (politistiCercetatiValizi.length === 0) {
      alert('Trebuie să adăugați cel puțin un polițist cercetat complet (nume, prenume, grad)!');
      return;
    }

    // Validare: verifică dacă toți polițiștii cercetați completați au rolul setat
    const politistiCercetatiIncompleti = politistiCercetati.filter(p => {
      const areDate = p.nume || p.prenume || p.grad || p.unitate || p.functie || p.corp || p.domeniu;
      if (areDate) {
        // Dacă are cel puțin un câmp completat, atunci nume, prenume, grad și rol sunt obligatorii
        return !p.nume || !p.prenume || !p.grad || !p.rolId;
      }
      return false;
    });

    if (politistiCercetatiIncompleti.length > 0) {
      alert('Toți polițiștii cercetați parțial completați trebuie să aibă: Nume, Prenume, Grad și Rol!');
      return;
    }

    // Validare: verifică dacă polițiștii desemnați parțial completați au toate câmpurile obligatorii
    const politistiDesemnatiIncompleti = politistiDesemnati.filter(p => {
      const areDate = p.nume || p.prenume || p.grad || p.unitate || p.functie || p.corp || p.domeniu;
      if (areDate) {
        // Dacă are cel puțin un câmp completat, atunci nume și prenume sunt obligatorii
        return !p.nume || !p.prenume;
      }
      return false;
    });

    if (politistiDesemnatiIncompleti.length > 0) {
      alert('Toți polițiștii desemnați parțial completați trebuie să aibă cel puțin: Nume și Prenume!');
      return;
    }

    const toDateOnly = (dateString) => {
      return dateString || null;
    };
    
    // Construiește lista de polițiști pentru API
   const politistiPentruAPI = [
  // Polițiști cercetați
  ...politistiCercetatiValizi.map(p => ({
    // NU mai trimitem PolitistId sau _id
    Nume: p.nume,
    Prenume: p.prenume,
    Functie: p.functie || '',
    Grad: p.grad,
    Corp: p.corp || '',
    Domeniu: p.domeniu || '',
    Unitate: p.unitate || '',
    AvizJudiciar: p.avizJudiciar || '',
    cnp: p.cnp || '',// Adăugat conform cerinței
    NRolCercetareId: p.rolId ? parseInt(p.rolId) : 1
  })),
      // Polițiști desemnați (doar cei completați)
      ...politistiDesemnati
    .filter(p => p.nume && p.prenume)
    .map(p => ({
      Nume: p.nume,
      Prenume: p.prenume,
      Functie: p.functie || '',
      Grad: p.grad || '',
      Corp: p.corp || '',
      Domeniu: p.domeniu || '',
      Unitate: p.unitate || '',
      AvizJudiciar: p.avizJudiciar || '', 
      cnp: p.cnp || '',// Adăugat conform cerinței
      NRolCercetareId: p.rolId ? parseInt(p.rolId) : 2
    }))
];

    const cercetareData = {
      Numar: formData.numarCercetare,
      Data: toDateOnly(formData.dataCercetare),
      DataPrescriptie: toDateOnly(formData.termenPrescriptie),
      DataDecadere: toDateOnly(formData.termenDecadere),
      
      Dispozitie: formData.numarDispozitie || formData.dataDispozitie ? {
        NumarDesemnare: formData.numarDispozitie || null,
        DataDesemnare: toDateOnly(formData.dataDispozitie)
      } : null,
      
      ActeSesizare: formData.numarActSesizare || formData.dataActSesizare ? {
        NumarAct: formData.numarActSesizare || null,
        DataAct: toDateOnly(formData.dataActSesizare)
      } : null,
      
      Fapta: {
        NAbatereDisciplinaraId: formData.abatereDisciplinaraId ? parseInt(formData.abatereDisciplinaraId) : null,
        DataInceput: toDateOnly(formData.perioadaStart),
        DataSfarsit: toDateOnly(formData.perioadaSfarsit),
        Descriere: formData.descriereFapta || null,
        ConduitaRutiera: 0
      },
      
      HotarareJudecatoreasca: formData.numarHotarare || formData.dataHotarare ? {
        NumarHotarare: formData.numarHotarare || null,
        DataHotarare: toDateOnly(formData.dataHotarare),
        DescriereHotarare: null
      } : null,
      
      RapoarteCercetare: formData.numarRaport || formData.dataRaport ? {
        NumarRaport: formData.numarRaport || null,
        DataRaport: toDateOnly(formData.dataRaport)
      } : null,
      
      Recompensa: formData.numarRecompensa || formData.dataRecompensa ? {
        NumarRecompensa: formData.numarRecompensa || null,
        DataRecompensa: formData.dataRecompensa 
      } : null,
      
      SolutieRaportId: formData.solutieRaportId ? parseInt(formData.solutieRaportId) : null,
      SolutiePropusaId: formData.solutiePropusaId ? parseInt(formData.solutiePropusaId) : null,
      SolutieSefId: formData.solutieSefId ? parseInt(formData.solutieSefId) : null,
      SolutieConsultareId: formData.solutieConsultareId ? parseInt(formData.solutieConsultareId) : null,
      SolutieRestituireId: formData.solutieRestituireId ? parseInt(formData.solutieRestituireId) : null,
      
      Politisti: politistiPentruAPI
    };

    console.log('Date cercetare pentru salvare:', JSON.stringify(cercetareData, null, 2));
    
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}api/CercetariDisciplinareIntegration/Adauga-Cercetare`,
        cercetareData
      );
      alert('Cercetare adăugată cu succes!');
      navigate('/cercetariDisciplinare');

    } catch (error) {
      console.error('Eroare completă:', error);
      console.error('Response data:', error.response?.data);
      
      if (error.response?.data) {
        const errorDetails = error.response.data;
        
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

  return (
    <div className="page-container">
      {/* HEADER PAGINĂ */}
      <div className="page-header">
        <div className="header-title-group">
           {/* Buton opțional de ÎNAPOI */}
           <button className="btn-back" onClick={handleBack}>← Înapoi</button>
           <h2>Adaugă cercetare disciplinară nouă</h2>
        </div>
      </div>

      <div className="page-content">
        <form onSubmit={handleSubmit}>

          {/* SECȚIUNEA 1 – DATE CERCETARE */}
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

          {/* SECȚIUNEA 2 – FAPTA */}
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

          {/* SECȚIUNEA 3 – POLIȚIȘTI CERCETAȚI */}
          <div className="form-section">
            <div className="section-header-row">
              <h3 className="section-title" style={{ margin: 0 }}>Polițiști cercetați</h3>
              <button
                type="button"
                className="btn btn-primary"
                onClick={adaugaCercetat}
              >
                ➕ Adaugă polițist cercetat
              </button>
            </div>

            {politistiCercetati.map((politist, index) => (
              <div key={politist._id} className="card-person">
                <div className="card-person-header">
                  <h4>Polițist cercetat {index + 1}</h4>
                  {politistiCercetati.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger-outline"
                      onClick={() => stergeCercetat(politist._id)}
                    >
                      🗑️ Șterge
                    </button>
                  )}
                </div>

                <div className="depabd-search">
                  <div className="form-group">
                    <label>CNP</label>
                    <input
                      type="text"
                      className="input"
                      maxLength="13"
                      value={politist.cnp}
                      onChange={(e) => handleCercetatChange(politist._id, 'cnp', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => cautaInDEPABD('cercetat', politist._id)}
                  >
                    🔍 Caută
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Grad *</label>
                    <input
                      type="text"
                      className="input"
                      value={politist.grad}
                      onChange={(e) => handleCercetatChange(politist._id, 'grad', e.target.value)}
                      required
                    />
                  </div>
                  {/* ... Restul câmpurilor (Nume, Prenume, Unitate etc.) rămân identice ... */}
                   <div className="form-group">
                      <label>Nume *</label>
                      <input type="text" className="input" value={politist.nume} onChange={(e) => handleCercetatChange(politist._id, 'nume', e.target.value)} required />
                   </div>
                   <div className="form-group">
                      <label>Prenume *</label>
                      <input type="text" className="input" value={politist.prenume} onChange={(e) => handleCercetatChange(politist._id, 'prenume', e.target.value)} required />
                   </div>
                   <div className="form-group">
                      <label>Unitate *</label>
                      <input type="text" className="input" value={politist.unitate} onChange={(e) => handleCercetatChange(politist._id, 'unitate', e.target.value)} required />
                   </div>
                   <div className="form-group">
                      <label>Funcție *</label>
                      <input type="text" className="input" value={politist.functie} onChange={(e) => handleCercetatChange(politist._id, 'functie', e.target.value)} required />
                   </div>
                   <div className="form-group">
                      <label>Corp profesional *</label>
                      <input type="text" className="input" value={politist.corp} onChange={(e) => handleCercetatChange(politist._id, 'corp', e.target.value)} required />
                   </div>
                   <div className="form-group">
                      <label>Domeniu *</label>
                      <input type="text" className="input" value={politist.domeniu} onChange={(e) => handleCercetatChange(politist._id, 'domeniu', e.target.value)} required />
                   </div>
                   <div className="form-group">
                      <label>Aviz Judiciar</label>
                      <input type="text" className="input" value={politist.avizJudiciar} onChange={(e) => handleCercetatChange(politist._id, 'avizJudiciar', e.target.value)} />
                   </div>
                   <div className="form-group">
                      <label>Rol *</label>
                      <select className="select" value={politist.rolId} onChange={(e) => handleCercetatChange(politist._id, 'rolId', e.target.value)} required>
                         <option value="">Selectează</option>
                         {nomenclatoare.rolCercertare.map((rol) => (<option key={rol.id} value={rol.id}>{rol.nume || rol.denumire || rol.descriere}</option>))}
                      </select>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* SECȚIUNEA 4 – POLIȚIȘTI DESEMNAȚI */}
          <div className="form-section">
            <div className="section-header-row">
              <h3 className="section-title" style={{ margin: 0 }}>Polițiști desemnați</h3>
              <button
                type="button"
                className="btn btn-primary"
                onClick={adaugaDesemnat}
              >
                ➕ Adaugă polițist desemnat
              </button>
            </div>

            {politistiDesemnati.map((politist, index) => (
              <div key={politist._id} className="card-person">
                 <div className="card-person-header">
                    <h4>Polițist desemnat {index + 1}</h4>
                    {politistiDesemnati.length > 1 && (
                      <button type="button" className="btn btn-danger-outline" onClick={() => stergeDesemnat(politist._id)}>
                        🗑️ Șterge
                      </button>
                    )}
                 </div>
                 {/* Logică identică search DEPABD pt desemnați... */}
                 <div className="depabd-search">
                    <div className="form-group">
                       <label>CNP</label>
                       <input type="text" className="input" maxLength="13" value={politist.cnp} onChange={(e) => handleDesemnatChange(politist._id, 'cnp', e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={() => cautaInDEPABD('desemnat', politist._id)}>🔍 Caută</button>
                 </div>
                 {/* Grid câmpuri pt desemnați... (prescurtat pentru claritate, este identic cu logica anterioară) */}
                 <div className="form-grid">
                     <div className="form-group"><label>Grad *</label><input type="text" className="input" value={politist.grad} onChange={(e) => handleDesemnatChange(politist._id, 'grad', e.target.value)} required /></div>
                     <div className="form-group"><label>Nume *</label><input type="text" className="input" value={politist.nume} onChange={(e) => handleDesemnatChange(politist._id, 'nume', e.target.value)} required /></div>
                     <div className="form-group"><label>Prenume *</label><input type="text" className="input" value={politist.prenume} onChange={(e) => handleDesemnatChange(politist._id, 'prenume', e.target.value)} required /></div>
                     <div className="form-group"><label>Unitate *</label><input type="text" className="input" value={politist.unitate} onChange={(e) => handleDesemnatChange(politist._id, 'unitate', e.target.value)} required /></div>
                     <div className="form-group"><label>Funcție *</label><input type="text" className="input" value={politist.functie} onChange={(e) => handleDesemnatChange(politist._id, 'functie', e.target.value)} required /></div>
                     <div className="form-group"><label>Corp profesional *</label><input type="text" className="input" value={politist.corp} onChange={(e) => handleDesemnatChange(politist._id, 'corp', e.target.value)} required /></div>
                     <div className="form-group"><label>Domeniu *</label><input type="text" className="input" value={politist.domeniu} onChange={(e) => handleDesemnatChange(politist._id, 'domeniu', e.target.value)} required /></div>
                     <div className="form-group"><label>Aviz Judiciar</label><input type="text" className="input" value={politist.avizJudiciar} onChange={(e) => handleDesemnatChange(politist._id, 'avizJudiciar', e.target.value)} /></div>
                     <div className="form-group"><label>Rol *</label><select className="select" value={politist.rolId} onChange={(e) => handleDesemnatChange(politist._id, 'rolId', e.target.value)} required><option value="">Selectează</option>{nomenclatoare.rolCercertare.map((rol) => (<option key={rol.id} value={rol.id}>{rol.nume || rol.denumire || rol.descriere}</option>))}</select></div>
                 </div>
              </div>
            ))}
          </div>

          {/* SECȚIUNEA 5 – RAPORT & SOLUȚII */}
          <div className="form-section">
            <h3 className="section-title">Raport cercetare & Soluții</h3>
            <div className="form-grid">
               <div className="form-group"><label>Număr raport</label><input type="text" name="numarRaport" className="input" value={formData.numarRaport} onChange={handleInputChange} /></div>
               <div className="form-group"><label>Data raport</label><input type="date" name="dataRaport" className="input" value={formData.dataRaport} onChange={handleInputChange} /></div>
               <div className="form-group"><label>Număr hotărâre</label><input type="text" name="numarHotarare" className="input" value={formData.numarHotarare} onChange={handleInputChange} /></div>
               <div className="form-group"><label>Data hotărâre</label><input type="date" name="dataHotarare" className="input" value={formData.dataHotarare} onChange={handleInputChange} /></div>
               <div className="form-group"><label>Număr recompensă</label><input type="text" name="numarRecompensa" className="input" value={formData.numarRecompensa} onChange={handleInputChange} /></div>
               <div className="form-group"><label>Data recompensă</label><input type="date" name="dataRecompensa" className="input" value={formData.dataRecompensa} onChange={handleInputChange} /></div>
            </div>

            <h3 className="section-title" style={{marginTop: '20px'}}>Concluzii</h3>
             {loadingNomenclatoare ? (
               <p>Se încarcă listele de soluții...</p>
             ) : (
               <div className="form-grid">
                 <div className="form-group">
                   <label>Soluție raport</label>
                   <select name="solutieRaportId" className="select" value={formData.solutieRaportId} onChange={handleInputChange}>
                     <option value="">Selectează</option>
                     {nomenclatoare.solutiiRaport.map((s) => (<option key={s.id} value={s.id}>{s.nume || s.denumire || s.descriere}</option>))}
                   </select>
                 </div>
                 {/* ... Restul select-urilor pentru soluții (propusă, șef, consultare, restituire) rămân la fel */}
                 <div className="form-group"><label>Soluție propusă</label><select name="solutiePropusaId" className="select" value={formData.solutiePropusaId} onChange={handleInputChange}><option value="">Selectează</option>{nomenclatoare.solutiiPropuse.map((s) => (<option key={s.id} value={s.id}>{s.nume || s.denumire || s.descriere}</option>))}</select></div>
                 <div className="form-group"><label>Soluție șef</label><select name="solutieSefId" className="select" value={formData.solutieSefId} onChange={handleInputChange}><option value="">Selectează</option>{nomenclatoare.solutiiSef.map((s) => (<option key={s.id} value={s.id}>{s.nume || s.denumire || s.descriere}</option>))}</select></div>
                 <div className="form-group"><label>Soluție consultare</label><select name="solutieConsultareId" className="select" value={formData.solutieConsultareId} onChange={handleInputChange}><option value="">Selectează</option>{nomenclatoare.solutiiConsultare.map((s) => (<option key={s.id} value={s.id}>{s.nume || s.denumire || s.descriere}</option>))}</select></div>
                 <div className="form-group"><label>Soluție restituire</label><select name="solutieRestituireId" className="select" value={formData.solutieRestituireId} onChange={handleInputChange}><option value="">Selectează</option>{nomenclatoare.solutiiRestituire.map((s) => (<option key={s.id} value={s.id}>{s.nume || s.denumire || s.descriere}</option>))}</select></div>
               </div>
             )}
          </div>

          {/* PAGE FOOTER - BUTOANE ACȚIUNE */}
          <div className="page-footer-actions">
            <button type="button" className="btn btn-secondary btn-large" onClick={handleBack}>
              Anulează
            </button>
            <button type="submit" className="btn btn-primary btn-large">
              💾 Salvează cercetarea
            </button>
          </div>

        </form>
      </div>
    </div>
);
};
export default AdaugaCercetareModal;