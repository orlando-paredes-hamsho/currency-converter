import React from 'react';
import './index.css';

function CurrencyField(props) {
  return (
    <fieldset>
      <label htmlFor={props.id}>
        <select>
          <option>USD</option>
          <option>MXN</option>
          <option>EUR</option>
          <option>CAN</option>
        </select>
      </label>
      <input id={props.id} type="number" className="currency_field"/>
    </fieldset>
  );
}

export default CurrencyField;
