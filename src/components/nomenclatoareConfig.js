// src/config/nomenclatoareConfig.js

export const nomenclatoareConfig = {
  abatereDisciplinara: {
    title: 'Abateri Disciplinare',
    apiEndpoint: '/api/NAbatereDisciplinara',
    fields: [
      { name: 'id', label: 'ID', type: 'number', readonly: true, hidden: true },
      { name: 'denumire', label: 'Denumire', type: 'text', required: true, placeholder: 'Introduceți denumirea' }
    ],
    displayField: 'denumire'
  },
  
  rolCercetare: {
    title: 'Roluri Cercetare',
    apiEndpoint: '/api/NRolCercetare',
    fields: [
      { name: 'id', label: 'ID', type: 'number', readonly: true, hidden: true },
      { name: 'denumire', label: 'Denumire', type: 'text', required: true },
      { name: 'descriere', label: 'Descriere', type: 'textarea', rows: 3 },
      { name: 'valid', label: 'Valid', type: 'number', min: 0, max: 1 }
    ],
    displayField: 'denumire'
  },
  
  solutiiConsultare: {
    title: 'Soluții Consultare',
    apiEndpoint: '/api/NSolutiiConsultare',
    fields: [
      { name: 'id', label: 'ID', type: 'number', readonly: true, hidden: true },
      { name: 'denumire', label: 'Denumire', type: 'text', required: true },
      { name: 'descriere', label: 'Descriere', type: 'textarea', rows: 3 },
      { name: 'valid', label: 'Valabil din', type: 'date' }
    ],
    displayField: 'denumire'
  },
  
  solutiiPropuse: {
    title: 'Soluții Propuse',
    apiEndpoint: '/api/NSolutiiPropuse',
    fields: [
      { name: 'id', label: 'ID', type: 'number', readonly: true, hidden: true },
      { name: 'denumire', label: 'Denumire', type: 'text', required: true },
      { name: 'descriere', label: 'Descriere', type: 'textarea', rows: 3 },
      { name: 'valid', label: 'Valabil din', type: 'date' }
    ],
    displayField: 'denumire'
  },
  
  solutiiRaport: {
    title: 'Soluții Raport',
    apiEndpoint: '/api/NSolutiiRaport',
    fields: [
      { name: 'id', label: 'ID', type: 'number', readonly: true, hidden: true },
      { name: 'denumire', label: 'Denumire', type: 'text', required: true },
      { name: 'descriere', label: 'Descriere', type: 'textarea', rows: 3 },
      { name: 'valid', label: 'Valabil din', type: 'date' }
    ],
    displayField: 'denumire'
  },
  
  solutiiRestituire: {
    title: 'Soluții Restituire',
    apiEndpoint: '/api/NSolutiiRestituire',
    fields: [
      { name: 'id', label: 'ID', type: 'number', readonly: true, hidden: true },
      { name: 'denumire', label: 'Denumire', type: 'text', required: true },
      { name: 'descriere', label: 'Descriere', type: 'textarea', rows: 3 },
      { name: 'valid', label: 'Valabil din', type: 'date' }
    ],
    displayField: 'denumire'
  },
  
  solutiiSef: {
    title: 'Soluții Șef',
    apiEndpoint: '/api/NSolutiiSef',
    fields: [
      { name: 'id', label: 'ID', type: 'number', readonly: true, hidden: true },
      { name: 'denumire', label: 'Denumire', type: 'text', required: true },
      { name: 'descriere', label: 'Descriere', type: 'textarea', rows: 3 },
      { name: 'valid', label: 'Valabil din', type: 'date' }
    ],
    displayField: 'denumire'
  }
};