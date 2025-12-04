import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from '../apiClient';
import './NomenclatoareCRUD.css';

const NomenclatorCRUD = ({ config }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchItems(config);
  }, [config.apiEndpoint]);

  const fetchItems = async (config) => {
  setLoading(true);
  setError(null);
  try {
    const response = await apiClient.get(config.apiEndpoint); // aici folosim endpoint relativ
    setItems(response.data);
  } catch (err) {
    setError('Eroare la încărcarea datelor: ' + err.message);
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const handleAdd = () => {
    const initialData = {};
    config.fields.forEach(field => {
      if (!field.hidden && !field.readonly) {
        initialData[field.name] = field.type === 'number' ? 1 : '';
      }
    });
    setFormData(initialData);
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    const editData = {};
    config.fields.forEach(field => {
      editData[field.name] = item[field.name] || '';
    });
    setFormData(editData);
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sigur doriți să ștergeți acest element?')) return;
    
    try {
      await apiClient.delete(`${config.apiEndpoint}/${id}`);
      fetchItems(config);
    } catch (err) {
      alert('Eroare la ștergere: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingItem) {
        await apiClient.put(`${config.apiEndpoint}/${editingItem.id}`, formData);
      } else {
        await apiClient.post(config.apiEndpoint, formData);
      }
      setShowModal(false);
      fetchItems(config);
    } catch (err) {
      alert('Eroare la salvare: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            rows={field.rows || 3}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            required={field.required}
            readOnly={field.readonly}
          />
        );
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            readOnly={field.readonly}
          />
        );
    }
  };

  if (loading && items.length === 0) return <div className="loading">Se încarcă...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="nomenclator-crud">
      <div className="nomenclator-header">
        <h2>{config.title}</h2>
        <button className="btn-add" onClick={handleAdd}>
          ➕ Adaugă
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {config.fields
                .filter(f => !f.hidden)
                .map(field => (
                  <th key={field.name}>{field.label}</th>
                ))}
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={config.fields.filter(f => !f.hidden).length + 1}>
                  Nu există date
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id}>
                  {config.fields
                    .filter(f => !f.hidden)
                    .map(field => (
                      <td key={field.name}>
                        {field.type === 'date' && item[field.name]
                          ? new Date(item[field.name]).toLocaleDateString('ro-RO')
                          : item[field.name] || '-'}
                      </td>
                    ))}
                  <td>
                    <button 
                      className="btn-edit" 
                      onClick={() => handleEdit(item)}
                      title="Editează"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(item.id)}
                      title="Șterge"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Editare' : 'Adăugare'} {config.title}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {config.fields
                .filter(f => !f.hidden)
                .map(field => (
                  <div key={field.name} className="form-group">
                    <label>
                      {field.label}
                      {field.required && <span className="required">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={() => setShowModal(false)}
                >
                  Anulează
                </button>
                <button 
                  type="submit" 
                  className="btn-save"
                  disabled={loading}
                >
                  {loading ? 'Se salvează...' : 'Salvează'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NomenclatorCRUD;