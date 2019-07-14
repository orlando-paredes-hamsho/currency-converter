import React from 'react';
import CurrencyField from './components/CurrencyField';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <CurrencyField id="From" />
      <CurrencyField id="To" />
    </div>
  );
}

export default App;
