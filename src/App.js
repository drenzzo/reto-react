import React from 'react';
import './App.css';
import ProductTable from './components/ProductTable'

const App = () => {
  return (
    <div className="App">
      <h1>Lista de Productos</h1>
      <ProductTable />
    </div>
  )
}

export default App;
