import React from 'react';

const ProductRow = ({ product }) => {
  return (
    <tr>
      <td>
        <img src={product.imagen} alt="Imagen del producto" />
      </td>
      <td>{product.nombre}</td>
      <td>{product.descripcion}</td>
      <td>{product.fechaLanzamiento}</td>
      <td>{product.fechaFinalizacion}</td>
    </tr>
  );
};

export default ProductRow;
