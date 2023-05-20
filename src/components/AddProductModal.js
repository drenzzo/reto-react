import React, { useState } from 'react';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [fechaLib, setFechaLib] = useState("");
  const [fechaRes, setFechaRes] = useState("");
  const [errors, setErrors] = useState({});

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleImagenChange = (event) => {
    setImagen(event.target.value);
  };

  const handleFechaLibChange = (event) => {
    setFechaLib(event.target.value);
  };

  const handleFechaResChange = (event) => {
    setFechaRes(event.target.value);
  };

  const handleCancel = () => {
    onClose();
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevoProducto = {
      id,
      nombre,
      descripcion,
      imagen,
      fechaLib,
      fechaRes
    };

    // Validar campos requeridos
    const newErrors = {};
    if (!id) {
      newErrors.id = "Este campo es requerido";
    }
    if (!nombre) {
      newErrors.nombre = "Este campo es requerido";
    }
    if (!descripcion) {
      newErrors.descripcion = "Este campo es requerido";
    }
    if (!imagen) {
      newErrors.imagen = "Este campo es requerido";
    }
    if (!fechaLib) {
      newErrors.fechaLib = "Este campo es requerido";
    }
    if (!fechaRes) {
      newErrors.fechaRes = "Este campo es requerido";
    }

    // Si hay errores, mostrar mensajes de alerta
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit(nuevoProducto);
      setId("");
      setNombre("");
      setDescripcion("");
      setImagen("");
      setFechaLib("");
      setFechaRes("");
      setErrors({});
    }
    // onClose();
  };

  return (
    <div className={`modal ${isOpen ? "" : "hidden"}`}>
      <div className="modal-content">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div>
            <label htmlFor="id">Id:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={handleIdChange}
              style={{ border: errors.id ? "2px solid red" : "" }}
            />
            {errors.id && <p style={{ color: "red" }}>{errors.id}</p>}
          </div>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={handleNombreChange}
              style={{ border: errors.nombre ? "2px solid red" : "" }}
            />
            {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
          </div>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange}
              style={{ border: errors.descripcion ? "2px solid red" : "" }}
            />
            {errors.descripcion && (<p style={{ color: "red" }}>{errors.descripcion}</p>)}
          </div>
          <div>
            <label htmlFor="imagen">Imagen:</label>
            <input
              type="text"
              id="imagen"
              value={imagen}
              onChange={handleImagenChange}
              style={{ border: errors.imagen ? "2px solid red" : "" }}
            />
            {errors.imagen && <p style={{ color: "red" }}>{errors.imagen}</p>}
          </div>
          <div>
            <label htmlFor="fechaLib">Fecha de liberación:</label>
            <input
              type="text"
              id="fechaLib"
              value={fechaLib}
              onChange={handleFechaLibChange}
              style={{ border: errors.fechaLib ? "2px solid red" : "" }}
            />
            {errors.fechaLib && (<p style={{ color: "red" }}>{errors.fechaLib}</p>)}
          </div>
          <div>
            <label htmlFor="fechaRes">Fecha de reestructuración:</label>
            <input
              type="text"
              id="fechaRes"
              value={fechaRes}
              onChange={handleFechaResChange}
              style={{ border: errors.fechaRes ? "2px solid red" : "" }}
            />
            {errors.fechaRes && <p style={{ color: "red" }}>{errors.fechaRes}</p>}
          </div>

          {/* Otros campos del formulario */}
          <div className="modal-buttons">
            <button type="button" onClick={handleCancel}>Cancelar</button>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
