import React, { useState } from 'react';
import './ProductTable.css';
import products from '../data/products.json';
import ProductRow from './ProductRow';
import SearchInput from './SearchInput';
import AddProductModal from './AddProductModal';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddProduct = () => {
    setModalOpen(true);
  };

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProductCount = filteredProducts.length;

  return (
    <div className="product-table-container">
      <div>
        <SearchInput onChange={handleSearch} />
        <button className="add-button" onClick={handleAddProduct}>
          Agregar
        </button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre del producto</th>
            <th>Descripción</th>
            <th>Fecha de liberación</th>
            <th>Fecha de reestructuración</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <ProductRow key={index} product={product} />
          ))}
        </tbody>
      </table>
      <p>{filteredProductCount} Resultados</p>
      <AddProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ProductTable;