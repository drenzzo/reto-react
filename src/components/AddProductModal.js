import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onSubmit, onSubmitProduct }) => {

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [fechaLib, setFechaLib] = useState("");
  const [fechaRes, setFechaRes] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    // Verificar si todos los campos requeridos están completados
    const hasEmptyRequiredFields =
      id.trim() === "" ||
      nombre.trim() === "" ||
      descripcion.trim() === "" ||
      imagen.trim() === "" ||
      fechaLib === "" ||
      fechaRes === "";

    setIsSubmitDisabled(hasEmptyRequiredFields);
  }, [id, nombre, descripcion, imagen, fechaLib, fechaRes]);

  const validateId = (id) => {
    const isValidLength = id.length >= 3 && id.length <= 10;
    const isValidFormat = /^[a-zA-Z]{3}-[a-zA-Z]{1,6}$/.test(id);

    return isValidLength && isValidFormat;
  };

  const handleIdChange = (event) => {
    const newId = event.target.value;
    setId(newId);
    validateIdAsync(newId);
  };

  const validateIdAsync = async (id) => {
    if (id.trim() !== "") {
      // Simulación de llamada a un servicio para validar el ID
      const isValid = await fakeServiceValidateId(id);

      if (!isValid) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          id: "Id no válido!. El formato es incorrecto"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          id: ""
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        id: ""
      }));
    }
  };

  const fakeServiceValidateId = async (id) => {
    // Simulación de tiempo de espera para la respuesta del servicio
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulación de validación de ID
    return id === "trj-testpe"; // Cambia "existingId" por el ID que deseas utilizar para probar la validación
  };

  const handleFechaLibChange = (date) => {
    setFechaLib(date);
    setFechaRes(calculateFechaFin(date));
  };

  const calculateFechaFin = (fecha) => {
    const oneYearLater = new Date(fecha);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    return formatDate(oneYearLater);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const formatDateRequest = (date, res) => {
    const d = new Date(date);
    const year = res ? d.getFullYear() + 1 : d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleImagenChange = (event) => {
    // setImagen(event.target.value);
    setImagen("https://static.mercadonegro.pe/wp-content/uploads/2021/04/19163930/yape-1.jpg");
  };

  const handleCancel = () => {
    onClose();
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      id: id,
      name: nombre,
      description: descripcion,
      logo: imagen,
      date_release: formatDateRequest(fechaLib, false),
      date_revision: formatDateRequest(fechaLib, true)
    };

    // Validar campos requeridos
    const newErrors = {};
    if (!id) {
      newErrors.id = "Este campo es requerido!";
    } else if(!validateId(id)){
      newErrors.id = "Id no válido. El formato es incorrecto!";
    }
    if (!nombre) {
      newErrors.nombre = "Este campo es requerido!";
    }
    if (!descripcion) {
      newErrors.descripcion = "Este campo es requerido!";
    }
    if (!imagen) {
      newErrors.imagen = "Este campo es requerido!";
    }
    if (!fechaLib) {
      newErrors.fechaLib = "Este campo es requerido!";
    }
    if (!fechaRes) {
      newErrors.fechaRes = "Este campo es requerido!";
    }

    // Si hay errores, mostrar mensajes de alerta
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // onSubmit(nuevoProducto);
      createNewProduct(newProduct)
      setId("");
      setNombre("");
      setDescripcion("");
      setImagen("");
      setFechaLib("");
      setFechaRes("");
      setErrors({});
    }

    // Llamar a la función onAddProduct para agregar el nuevo producto
    onSubmitProduct(newProduct);

    onClose();
  };

  const createNewProduct = async (newProduct) => {
    const base_url = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";
    try {
      const response = await fetch(base_url + "/bp/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorId": "1"
        },
        body: JSON.stringify(newProduct)
      });
      const data = await response.json();
      console.log(data);
      onSubmit(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`modal ${isOpen ? "" : "hidden"}`}>
      <div className="modal-content">
        <h2>Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="form-container">

            <div className="form-container-left">
              <div className="form-fields-group">
                <label htmlFor="id">Id:</label>
                <input
                  type="text"
                  id="id"
                  value={id}
                  onChange={handleIdChange}
                  style={{ border: errors.id ? "2px solid red" : "" }}
                />
                {errors.id && <p className="error-msg" style={{ color: "red" }}>{errors.id}</p>}
              </div>

              <div className="form-fields-group">
                <label htmlFor="descripcion">Descripción:</label>
                <input
                  type="text"
                  id="descripcion"
                  value={descripcion}
                  onChange={handleDescripcionChange}
                  style={{ border: errors.descripcion ? "2px solid red" : "" }}
                />
                {errors.descripcion && (<p className="error-msg" style={{ color: "red" }}>{errors.descripcion}</p>)}
              </div>

              <div className="form-fields-group">
                <label htmlFor="fechaLib">Fecha Liberación:</label>
                <DatePicker
                  id="fechaLib"
                  selected={fechaLib}
                  onChange={handleFechaLibChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  style={{ border: errors.fechaLib ? "2px solid red" : "" }}
                  className="date-picker"
                />
                {errors.fechaLib && (<p className="error-msg" style={{ color: "red" }}>{errors.fechaLib}</p>)}
              </div>
            </div>

            <div className="form-container-right">
              <div className="form-fields-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={handleNombreChange}
                  style={{ border: errors.nombre ? "2px solid red" : "" }}
                />
                {errors.nombre && <p className="error-msg" style={{ color: "red" }}>{errors.nombre}</p>}
              </div>

              <div className="form-fields-group">
                <label htmlFor="imagen">Imagen:</label>
                <input
                  type="text"
                  id="imagen"
                  value={imagen}
                  onChange={handleImagenChange}
                  style={{ border: errors.imagen ? "2px solid red" : "" }}
                />
                {errors.imagen && <p className="error-msg" style={{ color: "red" }}>{errors.imagen}</p>}
              </div>

              <div className="form-fields-group">
                <label htmlFor="fechaRes">Fecha de reestructuración:</label>
                <input
                  type="text"
                  id="fechaRes"
                  value={fechaRes}
                  readOnly
                  disabled
                />
              </div>
            </div>

          </div>

          {/* Otros campos del formulario */}
          <div className="modal-buttons">
            <button
              type="button"
              onClick={handleCancel}>Cancelar</button>
            <button
              type="submit"
              disabled={isSubmitDisabled}>Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
