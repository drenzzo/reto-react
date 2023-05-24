import React, { useEffect, useState } from 'react';
import './ProductTable.css';
// import products from '../data/products.json';
import ProductRow from './ProductRow';
import SearchInput from './SearchInput';
import AddProductModal from './AddProductModal';

const ProductTable = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const base_url="https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";
    const url = `${base_url}/bp/products`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorId": "1"
      }
    })
      .then(response => response.json())
      .then((data) => {
        setProductsList(data)
      })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);


  const handleDeleteProduct = (productId) => {
    const newProductsList = productsList.filter((product) => product.id !== productId);
    setProductsList(newProductsList);
  };



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddProduct = () => {
    setModalOpen(true);
  };

  const filteredProducts = productsList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <ProductRow key={index} product={product} onDelete={handleDeleteProduct} />
          ))}
        </tbody>
      </table>
      <p className="filtered-count">{filteredProductCount} Resultados</p>
      <AddProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ProductTable;