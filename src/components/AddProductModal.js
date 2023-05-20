import React from 'react';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar las acciones necesarias para enviar el nuevo producto
    // a la lista de productos
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-content">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div>
            <label htmlFor="id">Id:</label>
            <input type="text" id="id" required />
          </div>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" required />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <input type="text" id="descripcion" required />
          </div>
          {/* Otros campos del formulario */}
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
