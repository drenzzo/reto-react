import React from 'react';
import './App.css';
import ProductTable from './components/ProductTable'

const App = () => {
  return (
    <div className="App">

      <div className="app-header">
        <img src="/images/logo-bp.png" alt="Banco Pichincha" width={200} />
      </div>

      <div className="app-container">
        <ProductTable />
      </div>

    </div>
  )
}

export default App;
