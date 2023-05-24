import "./ProductActions.css";
import React, { useState } from "react";

const ProductActions = ({ productId, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const handleToggleActions = () => {
    setShowActions(!showActions);
  };

  const handleEditClick = () => {
    // const confirmed = window.confirm("¿Estás seguro que quieres eliminar este producto?");
    // if (confirmed) {
    //   // Llamar a un servicio fake de eliminación
    //   deleteProduct(productId);
    // }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm("¿Estás seguro que quieres eliminar este producto?");
    if (confirmed) {
      // Llamar a un servicio fake de eliminación
      deleteProduct(productId);
    }
  };

  const deleteProduct = async (productId) => {
    // Lógica para eliminar el producto (puede ser una llamada a una API, por ejemplo)
    const base_url = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";
    const url = `${base_url}/bp/products?id=${productId}`;
    try {
      const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorId": "1"
      }
    });
    const data = await response.json();
    console.log(data);
    } catch (error) {
      console.log(error);
    }
    // Aquí puedes actualizar la lista de productos para reflejar el cambio
    onDelete(productId);
  };

  return (
    <div className="product-actions">
      <div className={`dots ${showActions ? "active" : ""}`} onClick={handleToggleActions}>
        {showActions ? (
          <div className="actions">
            <button onClick={handleEditClick}>Editar</button>
            <button onClick={handleDeleteClick}>Eliminar</button>
          </div>
        ) : (
          <span>...</span>
        )}
      </div>
    </div>
  );
};

export default ProductActions;
