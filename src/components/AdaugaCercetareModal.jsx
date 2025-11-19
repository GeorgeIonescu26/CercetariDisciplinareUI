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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
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

    try
    {
      const apiURL = "https://localhost:44381/api/CercetariDisciplinareIntegration/Adauga-Cercetare";
      const response = await fetch(apiURL, 
      { method : "POST",
        headers: { "Content-Type": "application/json" },

      })  
    if (!response.ok) {
      // Dacă serverul răspunde cu status 4xx sau 5xx (eroare)
      let errorMessage = `Eroare server (${response.status})`;
      
      // Încercăm să citim un mesaj de eroare din corpul răspunsulu
        const errorData = await response.json();
        if (errorData.title) {
          errorMessage += `: ${errorData.title}`; // Folosim titlul din payload-ul JSON
        }
    } 

}
catch (e) {
        // Ignorăm, dacă corpul nu e JSON valid
      
      
      throw new Error(errorMessage);
    }
    
    alert('Cercetare adăugată cu succes!');
    onClose();
  };

  const cautaInDEPABD = (tip) => {
    const cnp = tip === 'cercetat' ? formData.cercettatCNP : formData.desemnatCNP;
     debugger;
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
                  <option value="1">Cercetat</option>
                  <option value="2">Membru comisie</option>
                  <option value="3">Președinte comisie</option>
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
                  <option value="1">Cercetat</option>
                  <option value="2">Membru comisie</option>
                  <option value="3">Președinte comisie</option>
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

            <div className="form-group">
              <label>Concluzii raport</label>
              <textarea
                name="concluziiRaport"
                className="textarea"
                rows="4"
                value={formData.concluziiRaport}
                onChange={handleInputChange}
              />
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

            <div className="form-grid">
              <div className="form-group">
                <label>Tip recompensă</label>
                <input
                  type="text"
                  name="tipRecompensa"
                  className="input"
                  value={formData.tipRecompensa}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Detalii recompensă</label>
                <textarea
                  name="detaliiRecompensa"
                  className="textarea"
                  rows="3"
                  value={formData.detaliiRecompensa}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <h3 className="section-title">Soluții</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Soluție raport</label>
                <input
                  type="text"
                  name="solutieRaport"
                  className="input"
                  value={formData.solutieRaport}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Soluție propusă</label>
                <input
                  type="text"
                  name="solutiePropusa"
                  className="input"
                  value={formData.solutiePropusa}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Soluție șef</label>
                <input
                  type="text"
                  name="solutieSef"
                  className="input"
                  value={formData.solutieSef}
                  onChange={handleInputChange}
                />
              </div>
            </div>
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
}

export default AdaugaCercetareModal;