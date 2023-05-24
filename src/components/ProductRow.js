import React from 'react';
import ProductActions from './ProductActions';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

const ProductRow = ({ product, onDelete }) => {
  return (
    <tr>
      <td>
        <img src={product.logo} alt="Imagen del producto" width={40} />
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{formatDate(new Date(product.date_release))}</td>
      <td>{formatDate(new Date(product.date_revision))}</td>
      <td><ProductActions productId={product.id} onDelete={onDelete} /></td>

    </tr>
  );
};

export default ProductRow;
